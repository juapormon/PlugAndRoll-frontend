import axios from 'axios';
import { UrlProvider } from '../Providers/UrlProvider';

export const PruebaService = {
    async findAll(){
        return axios.get(UrlProvider.getPruebaURL() + "/findAll")
    }
}