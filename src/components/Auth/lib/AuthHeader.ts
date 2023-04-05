import { Cookie } from '~/utils/global';

export const getHeaders = () => {
    const token = Cookie.getCookie('accessToken');

    if (token) {
        const parsedTokens = JSON.parse(token);

        return { Authorization: `Bearer ${parsedTokens}` };
    }

    return undefined;
};
