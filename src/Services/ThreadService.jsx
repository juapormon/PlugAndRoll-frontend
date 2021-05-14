import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../Providers/UrlProvider';

export const ThreadService = {

    async findByForum(forumId) {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getThreadURL() + "/findByForum/" + forumId, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data).catch(error => {return error.response.status})
        })
    }
}