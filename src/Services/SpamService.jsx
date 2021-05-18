import axios from 'axios';
import { UrlProvider } from '../Providers/UrlProvider';

export const SpamService = {

    async checkThread(threadDTO) {
        return axios.post(UrlProvider.getSpamURL() + "/thread", threadDTO)
            .then(res => res.data).catch(error => { return error })
    }

}