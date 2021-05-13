const baseUrl = "http://localhost:8080"
const userUrl = "/users"
const meUrl = '/me'
const forums = '/forums'

export const UrlProvider = {
    
    getUserURL(){
        return baseUrl + userUrl;
    },
    getMeURL(){
        return baseUrl + userUrl + meUrl;
    },
    getForumURL(){
        return baseUrl + forums;
    }
    
}