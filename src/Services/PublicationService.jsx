import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../Providers/UrlProvider';

export const PublicationService = {

    async findByThread(threadId) {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getPublicationURL() + "/findByThread/" + threadId, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data).catch(error => {return error.response.status})
        })
    },
    async findById(publicationId) {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getPublicationURL() + "/" + publicationId, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data).catch(error => {return error.response.status})
        })
    },

    async findByThreadNoAuth(threadId) {
        return axios.get(UrlProvider.getPublicationURL() + "/findByThreadNoAuth/" + threadId, {
        }).then(res => res.data).catch(error => {return error.response.status})
    },

    async addPublication(publication) {
        return AuthService.getToken().then(token => {
            return axios.post(UrlProvider.getPublicationURL() + "/add", publication, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).catch(error => { return error })
        })
    },

    async deletePublication(publicationId) {
        return AuthService.getToken().then(token => {
            return axios.delete(UrlProvider.getPublicationURL().concat(`/delete/${publicationId}`), {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
        })
    },

    async updatePublication(id, publication) {
        return AuthService.getToken().then(token => {
            return axios.put(UrlProvider.getPublicationURL() + "/edit/" + id, publication, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
                .catch(error => { return error })
        });
    }
}