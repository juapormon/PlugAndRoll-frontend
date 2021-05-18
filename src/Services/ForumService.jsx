import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../Providers/UrlProvider';

export const ForumService = {

    async findById(forumId) {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getForumURL() + "/" +forumId, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data).catch(error => {return error.response.status})
        })
    },
    async getForumsAuth() {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getForumURL() + "/findByRole", {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data).catch(error => {return error.response.status})
        })
    },
    async getForumsNoAuth() {
        return axios.get(UrlProvider.getForumURL() + "/findForums", {
        }).then(res => res.data).catch(error => {return error.response.status})
    }
}