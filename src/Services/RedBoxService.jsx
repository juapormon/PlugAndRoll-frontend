import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../Providers/UrlProvider';

export const RedBoxService = {

    async findAll() {
        return axios.get(UrlProvider.getRedBoxURL() + "/findAll")
        .then(res => res.data).catch(error => {return error.response.status})
    },

    async findById(redBoxId) {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getRedBoxURL() + "/" + redBoxId, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data).catch(error => {return error.response.status})
        })
    },

    async add(redBox) {
        return AuthService.getToken().then(token => {
            return axios.post(UrlProvider.getRedBoxURL() + "/add", redBox, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data).catch(error => {return error.response.status})
        })
    },

    async update(id, redBox) {
        return AuthService.getToken().then(token => {
            return axios.put(UrlProvider.getRedBoxURL() + "/update/" + id, redBox, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data).catch(error => {return error.response.status})
        })
    },

    async delete(id) {
        return AuthService.getToken().then(token => {
            return axios.delete(UrlProvider.getRedBoxURL() + "/delete/" + id, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data).catch(error => {return error.response.status})
        })
    }

}