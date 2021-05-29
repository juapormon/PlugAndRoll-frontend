import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../Providers/UrlProvider';

export const ApplicationService = {

    async applyToOffer(offerId, application) {
        return AuthService.getToken().then(token => {
            return axios.post(UrlProvider.getBaseURL() + "/offers/" + offerId + "/applications/add", application, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data).catch(error => {return error.response.status})
        })
    },

    async deleteApplication(applicationId) {
        return AuthService.getToken().then(token => {
            return axios.delete(UrlProvider.getApplicationURL().concat(`/${applicationId}/delete`), {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
        })
    },

    async findMyApplicationsByType(type) {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getApplicationURL() + "/" + type + "/myApplications", {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data).catch(error => {return error.response.status})
        })
    }
}