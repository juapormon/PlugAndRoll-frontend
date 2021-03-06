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
    },

    
    async findApplicationsAcceptedByOfferId(offerId) {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getOfferURL() + "/" + offerId + "/applications/accepted", {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data).catch(error => {return error.response.status})
        })
    },

    async findApplicationsPendingByOfferId(offerId) {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getOfferURL() + "/" + offerId + "/applications/pending", {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data).catch(error => {return error.response.status})
        })
    },

    async acceptApplication(offerId, applicationId) {
        return AuthService.getToken().then(token => {
            return axios.put(UrlProvider.getOfferURL().concat(`/${offerId}/applications/${applicationId}/accept`), {}, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
        })
    },

    async rejectApplication(offerId, applicationId) {
        return AuthService.getToken().then(token => {
            return axios.delete(UrlProvider.getOfferURL().concat(`/${offerId}/applications/${applicationId}/reject`), {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
        })
    },
}