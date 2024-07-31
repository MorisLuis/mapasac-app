import { api } from "../api/api";

interface postLoginInterface {
    usr: string,
    pas: string
}

const postLogin = async ({ usr, pas }: postLoginInterface) => {
    try {
        const { data } = await api.post('/api/auth/login', { usr, pas });
        return data;
    } catch (error: any) {
        throw error?.response?.data || new Error('Unknown error');
    }
}



interface renewLoginInterface {
    token: string | null
}

const renewLogin = async ({ token }: renewLoginInterface) => {

    try {
        const resp = await api.get('/api/auth/renew', {
            headers: {
                'Content-type': 'application/json',
                'x-token': token || ''
            }
        });

        return resp
    } catch (error: any) {
        throw error?.response?.data || new Error('Unknown error');
    }
}

export {
    postLogin,
    renewLogin
}
