const baseUrl = "http://localhost:8080"
const pruebaUrl = "/prueba"
const userUrl = "/users"
const meUrl = '/me'

export const UrlProvider = {
    
    getPruebaURL(){
        return baseUrl+pruebaUrl;
    },
    getUserURL(){
        return baseUrl + userUrl;
    },
    getMeURL(){
        return baseUrl + userUrl + meUrl;
    }
}