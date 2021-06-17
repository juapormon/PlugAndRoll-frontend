const baseUrl = "http://localhost:8080"
const userUrl = "/users"
const meUrl = '/me'
const redBoxURL = '/redbox'

export const UrlProvider = {
    
    getUserURL(){
        return baseUrl + userUrl;
    },

    getMeURL(){
        return baseUrl + userUrl + meUrl;
    },

    getRedBoxURL(){
        return baseUrl + redBoxURL;
    }
    
}