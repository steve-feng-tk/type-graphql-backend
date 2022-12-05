import { ObjectType, Field, ClassType, Int, InputType } from 'type-graphql';
import * as Relay from 'graphql-relay';
import { ApolloError } from 'apollo-server-core';
import { Max, Min } from 'class-validator';

@InputType()
export class StandardConnectionArgs {
    @Field(() => Int, {
        defaultValue: 1,
        description: 'Current page number',
    })
    page: number = 1;

    @Field(() => Int, {
        defaultValue: 25,
        description: 'Number of records requested per page',
    })
    perPage: number = 25;
}

@InputType()
export class CursorConnectionArgs implements Relay.ConnectionArguments {
    @Field(() => String, {
        nullable: true,
        description: 'Paginate before opaque cursor',
    })
    before?: Relay.ConnectionCursor;

    @Field(() => String, {
        nullable: true,
        description: 'Paginate after opaque cursor',
    })
    after?: Relay.ConnectionCursor;

    @Field(() => Int, { nullable: true, description: 'Paginate first' })
    @Min(1)
    @Max(100)
    first: number;

    @Field(() => Int, { nullable: true, description: 'Paginate last' })
    @Min(1)
    @Max(100)
    last?: number;
}

@ObjectType()
class CursorPageInfo implements Relay.PageInfo {
    @Field(() => Boolean)
    hasNextPage: boolean = false;

    @Field(() => Boolean)
    hasPreviousPage: boolean = false;

    @Field(() => String, { nullable: true })
    startCursor: Relay.ConnectionCursor;

    @Field(() => String, { nullable: true })
    endCursor: Relay.ConnectionCursor;
}

@ObjectType()
class StandardPageInfo {
    @Field(() => Int, { defaultValue: 1 })
    current: number;

    @Field(() => Int, { defaultValue: 1 })
    last_page: number;

    @Field(() => Boolean, { defaultValue: true })
    first_page: boolean;

    @Field(() => Int, { defaultValue: 0 })
    first_item: number;

    @Field(() => Int, { nullable: true, defaultValue: 0 })
    last_item: number | null;

    @Field(() => Boolean, { defaultValue: true })
    has_more: boolean = true;

    @Field(() => Int, { nullable: true, defaultValue: 0 })
    total: number;
}

export function EdgeType<NodeType>(
    nodeName: string,
    nodeType: ClassType<NodeType>,
) {
    @ObjectType(`${nodeName}Edge`, { isAbstract: true })
    abstract class Edge implements Relay.Edge<NodeType> {
        @Field(() => nodeType)
        node: NodeType;

        @Field(() => String, {
            description: 'Used in `before` and `after` args',
        })
        cursor: Relay.ConnectionCursor;
    }

    return Edge;
}

type ExtractNodeType<EdgeType> = EdgeType extends Relay.Edge<infer NodeType>
    ? NodeType
    : never;

export function CursorConnectionType<
    EdgeType extends Relay.Edge<NodeType>,
    NodeType = ExtractNodeType<EdgeType>,
>(nodeName: string, edgeClass: ClassType<EdgeType>) {
    @ObjectType(`${nodeName}CursorConnection`, { isAbstract: true })
    abstract class Connection implements Relay.Connection<NodeType> {
        @Field(() => Int, { defaultValue: 0 })
        totalCount: number = 0;

        @Field(() => CursorPageInfo)
        pageInfo: CursorPageInfo;

        @Field(() => [edgeClass])
        edges: EdgeType[];
    }

    return Connection;
}

export function StandardConnectionType<
    EdgeType extends Relay.Edge<NodeType>,
    NodeType = ExtractNodeType<EdgeType>,
>(nodeName: string, edgeClass: ClassType<EdgeType>) {
    @ObjectType(`${nodeName}StandardConnection`, { isAbstract: true })
    abstract class Connection {
        @Field(() => Int, { defaultValue: 0 })
        totalCount: number = 0;

        @Field(() => StandardPageInfo)
        pageInfo: StandardPageInfo;

        @Field(() => [edgeClass])
        edges: EdgeType[];
    }

    return Connection;
}

interface Sort {
    column: string;
    order: 'asc' | 'desc';
}

export const handleStandardPagination = async (
    pagination: StandardConnectionArgs,
    query: any,
    key: string,
) => {
    const { page, perPage } = pagination;

    let [{ count: totalCount }] = await query.clone().count(`${key} as count`);

    let offset = (page - 1) * perPage;

    let results: any[] = await query
        .orderBy(key, 'desc')
        .limit(perPage)
        .offset(offset);

    let columnName = key.split('.').pop() as string;
    let edges = results.map((node) => ({
        node,
        cursor: node[columnName],
    }));

    let current = page;
    let first_page = page === 1;
    let first_item = (page - 1) * perPage + 1;
    let last_page = Math.ceil(totalCount / perPage);
    let last_item = results.length > 0 ? first_item + results.length - 1 : null;
    let has_more = page < last_page;

    return {
        totalCount,
        edges,
        pageInfo: {
            current,
            last_page,
            first_page,
            first_item,
            last_item,
            has_more,
            total: totalCount,
        },
    };
};

export const handleCursorPagination = async (
    pagination: CursorConnectionArgs,
    query: any,
    key: string,
    sort: Array<Sort> | null = null,
) => {
    const { first, after, last, before } = pagination;

    // const primaryKey = AppDataSource.getMetadata(target).primaryColumns[0].databaseName;
    // const parsedResolveInfo = parseResolveInfo(info);
    // console.log(Object.keys(parsedResolveInfo?.fieldsByTypeName.ItemConnection.edges.fieldsByTypeName.ItemEdge.node.fieldsByTypeName.Item));

    /*
        Start from the greedy query: SELECT * FROM table
        If the after argument is provided, add id > parsed_cursor to the WHERE clause
        If the before argument is provided, add id < parsed_cursor to the WHERE clause
        If the first argument is provided, add ORDER BY id DESC LIMIT first+1 to the query
        If the last argument is provided, add ORDER BY id ASC LIMIT last+1 to the query
        If the last argument is provided, I reverse the order of the results

        If the first argument is provided then I set hasPreviousPage: false (see spec for a description of this behavior).
        If no less than first+1 results are returned, I set hasNextPage: true, otherwise I set it to false.

        If the last argument is provided then I set hasNextPage: false (see spec for a description of this behavior).
        If no less last+1 results are returned, I set hasPreviousPage: true, otherwise I set it to false.
        
        Using this "algorithm", only the needed data is fetched. While after and before can be both set, I make sure first and last args are treated as mutually exclusive to avoid making a mess. The spec itself discourage making requests with both the arguments set.
        */

    // query.andWhere(`${joinColumn} = :id`, { id });

    let [{ count: totalCount }] = await query.clone().count(`${key} as count`);
    let hasPreviousPage = false;
    let hasNextPage = false;
    let results: any[] = [];

    if (!!first && !!last)
        throw new ApolloError(
            'Ambiguous query: first and last should not be used together',
        );
    if (!first && !last)
        throw new ApolloError('Missing first or last argument');

    if (!!first) {
        if (!!after) {
            query.andWhereRaw(`${key} < :id`, {
                id: after,
            });
        }

        // Default sort to key column, asc
        if (!sort) {
            sort = [{ column: key, order: 'desc' }];
        }

        query.orderBy(sort);
        query.limit(first + 1);

        results = await query;

        if (results.length > first) {
            hasNextPage = true;
            results = results.slice(0, first);
        }
    } else if (!!last) {
        if (!!before) {
            query.andWhereRaw(`${key} > :id`, {
                id: before,
            });
        }

        // Default sort to key column, asc
        if (!sort) {
            sort = [{ column: key, order: 'asc' }];
        }

        query.orderBy(sort);
        query.limit(last + 1);

        results = await query;

        if (results.length > last) {
            hasPreviousPage = true;
            results = results.slice(0, last);
        }
        results.reverse();
    }

    let columnName = key.split('.').pop() as string;

    let startCursor = null,
        endCursor = null;
    if (results.length > 0) {
        startCursor = results[0][columnName];
        endCursor = results[results.length - 1][columnName];
    }

    let edges = results.map((node) => ({
        node,
        cursor: node[columnName],
    }));

    return {
        totalCount,
        edges,
        pageInfo: {
            hasNextPage,
            hasPreviousPage,
            startCursor,
            endCursor,
        },
    };
};
