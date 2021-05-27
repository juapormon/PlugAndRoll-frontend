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
}