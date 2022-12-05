import s3 from './amazon';
import path from 'path';
import { readFileSync } from 'fs';

export default {
    async get(template: string): Promise<string | undefined> {
        // Load from local filesystem
        if(process.env.STAGE == "local") {
            return readFileSync(path.join(__dirname, `../templates/${template}`), 'utf-8');
        }

        const object = await s3
            .getObject({
                Bucket: process.env.AWS_BUCKET ?? 'snobswap2',
                Key: `templates/${template}`,
            })
            .promise();
        return object.Body?.toString('utf-8');
    },
};
