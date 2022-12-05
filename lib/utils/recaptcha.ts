import axios from 'axios';

export default {
    async verify(token: string): Promise<boolean> {
        let {
            data: { success },
        } = await axios.get(`https://www.google.com/recaptcha/api/siteverify`, {
            params: {
                secret: process.env.RECAPTCHA_SECRET,
                response: token,
            },
        });

        return success == true;
    },
};
