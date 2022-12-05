import bcrypt from 'bcrypt';
import crypto from 'crypto';

export default {
    async check(password_hash: string, password: string): Promise<boolean> {
        let hash = password_hash.replace(/^\$2y(.+)$/i, '$2a$1');
        return await new Promise((resolve, reject): void => {
            bcrypt.compare(password, hash, (error: any, matches): void => {
                if (!!error) {
                    reject(error);
                }
                resolve(matches);
            });
        });
    },
    async create(password: string): Promise<string> {
        return await new Promise((resolve, reject): void => {
            bcrypt.hash(password, 10, (error: any, encrypted): void => {
                if (!!error) {
                    reject(error);
                }
                resolve(encrypted);
            });
        });
    },
    hmac256(): string {
        let hmac = crypto.createHmac('sha256', process.env.APP_KEY as string);
        return hmac.update(Buffer.from(this.randomString(), 'utf-8')).digest('hex');
    },
    randomString(length: number = 40): string {
        let result = '';
        let characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength),
            );
        }
        return result;
    },
};
