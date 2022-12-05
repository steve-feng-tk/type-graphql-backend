declare namespace NodeJS {
    export interface ProcessEnv {
        JWT_SECRET_KEY: string;
        APP_KEY: string;
        APP_URL: string;
        MYSQL_HOST: string;
        MYSQL_PORT: number;
        MYSQL_DATABASE: string;
        MYSQL_USERNAME: string;
        MYSQL_PASSWORD: string;
        REDIS_HOST: string;
        REDIS_PORT: number;
        REDIS_DATABASE: number;
        ELASTICSEARCH_HOST: string;
        AWS_ACCESS_KEY_ID: string;
        AWS_SECRET_ACCESS_KEY: string;
        AWS_BUCKET: string;
        BACKEND_API_ENDPOINT: string;
        STAGE: string;
        STRIPE_PRIVATE_KEY: string;
        STRIPE_PRIVATE_KEY_EU: string;
        CMS_API_ENDPOINT: string;
        SENDGRID_KEY: string;
        RECAPTCHA_SECRET: string;
        SLACK_WEBHOOK: string;
    }
}
