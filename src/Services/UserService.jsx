import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../Providers/UrlProvider';

export const UserService = {

    async login(username, password) {
        return axios.post(UrlProvider.getUserURL() + '/login?username='+ username +'&password=' + password)
        .then(res => res.data)
        .catch(error => { return error.response.status })
    },

    async getAll() {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getUserURL(), {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data).catch(error => {return error.response.status})
        })
    }
}