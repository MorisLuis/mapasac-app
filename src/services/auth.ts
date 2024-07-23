import { api } from "../api/api";

interface postLoginInterface {
    usr: string,
    pas: string
}

const postLogin = async ({ usr, pas }: postLoginInterface) => {

    let modules;
    try {
        const { data } = await api.post('/api/auth/login', { usr, pas });
        return data
    } catch (error: any) {
        console.log({ errorTP: error })
    }

    return modules

}


interface renewLoginInterface {
    token: string | null
}

const renewLogin = async ({ token }: renewLoginInterface) => {

    let modules;
    try {
        const resp = await api.get('/api/auth/renew', {
            headers: {
                'Content-type': 'application/json',
                'x-token': token || ''
            }
        });

        return resp
    } catch (error: any) {
        console.log({ errorTP: error })
    }

    return modules

}

export {
    postLogin,
    renewLogin
}
