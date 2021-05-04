import axios from 'axios';
import { UrlProvider } from '../Providers/UrlProvider';
import { AuthService } from './AuthService';

export const PruebaService = {
    async findAll(){
        return AuthService.getToken().then( token => {
            return axios.get(UrlProvider.getPruebaURL() + "/findAll", {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': '*/*'
                }
            })
        })
    }
}