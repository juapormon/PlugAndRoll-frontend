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
    },

    async findById(threadId) {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getThreadURL() + "/" + threadId, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data).catch(error => {return error.response.status})
        })
    },

    async findByForumNoAuth(forumId) {
        return axios.get(UrlProvider.getThreadURL() + "/findByForumNoAuth/" + forumId, {
        }).then(res => res.data).catch(error => {return error.response.status})
    },

    async addThread(thread) {
        return AuthService.getToken().then(token => {
            return axios.post(UrlProvider.getThreadURL() + "/add", thread, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).catch(error => { return error })
        })
    },

    async deleteThread(threadId) {
        return AuthService.getToken().then(token => {
            return axios.delete(UrlProvider.getThreadURL().concat(`/delete/${threadId}`), {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
        })
    },

    async deletePublicationsByThreadId(threadId) {
        return AuthService.getToken().then(token => {
            return axios.delete(UrlProvider.getPublicationURL().concat(`/deleteAll/${threadId}`), {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
        })
    },

    async updateThread(id, thread) {
        return AuthService.getToken().then(token => {
            return axios.put(UrlProvider.getThreadURL() + "/edit/" + id, thread, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
                .catch(error => { return error })
        });
    },

    async closeThread(id, thread) {
        return AuthService.getToken().then(token => {
            return axios.put(UrlProvider.getThreadURL() + "/close/" + id, thread, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
                .catch(error => { return error })
        });
    },

}