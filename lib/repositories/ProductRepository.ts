import Product from '../models/product';
import BaseRepository from './BaseRepository';


class ProductRepository extends BaseRepository {
    async load(): Promise<Product[]> {
        let products = await this.db('products');
        return products;
    }
}

export default ProductRepository;
