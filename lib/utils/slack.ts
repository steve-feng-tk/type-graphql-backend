import { IncomingWebhook } from '@slack/webhook';
const webhookClient = new IncomingWebhook(process.env.SLACK_WEBHOOK ?? '');

export default {
    async send(
        channel: string,
        text: string,
    ): Promise<boolean> {
        try {
            await webhookClient.send({
                channel,
                text,
                icon_emoji: ':makeitrain:',
                unfurl_links: true,
                unfurl_media: false,
                link_names: true,
            });
        } catch (e) {}

        return true;
    },
};
