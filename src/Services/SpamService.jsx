import axios from 'axios';
import { UrlProvider } from '../Providers/UrlProvider';

export const SpamService = {

    async checkThread(threadDTO) {
        return axios.post(UrlProvider.getSpamURL() + "/thread", threadDTO)
            .then(res => res.data).catch(error => { return error })
    },

    async checkPublication(publicationDTO) {
        return axios.post(UrlProvider.getSpamURL() + "/publication", publicationDTO)
            .then(res => res.data).catch(error => { return error })
    },

    async checkOffer(offer) {
        return axios.post(UrlProvider.getSpamURL() + "/offer", offer)
            .then(res => res.data).catch(error => { return error })
    }

}