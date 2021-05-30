import axios from 'axios';
import { AuthService } from './AuthService';
import { UrlProvider } from '../Providers/UrlProvider';

export const OfferService = {

    async findByType(type) {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getOfferURL() + "/type/" +type, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data).catch(error => {return error.response.status})
        })
    },
    
    async findMyOffers() {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getOfferURL() + "/myOffers", {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data).catch(error => {return error.response.status})
        })
    },

    async findById(offerId) {
        return AuthService.getToken().then(token => {
            return axios.get(UrlProvider.getOfferURL() + "/" + offerId, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data).catch(error => {return error.response.status})
        })
    },

    async addOffer(offer) {
        return AuthService.getToken().then(token => {
            return axios.post(UrlProvider.getOfferURL() + "/add", offer, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).catch(error => { return error })
        })
    },

    async deleteOffer(offerId) {
        return AuthService.getToken().then(token => {
            return axios.delete(UrlProvider.getOfferURL().concat(`/delete/${offerId}`), {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            }).then(res => res.data)
        })
    },
}