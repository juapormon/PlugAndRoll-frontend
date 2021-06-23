const baseUrl = "https://plugandroll-backend.herokuapp.com"
const userUrl = "/users"
const meUrl = '/me'
const redBoxURL = '/redbox'
const forums = '/forums'
const threads = '/threads'
const publications = '/publications'
const spam = '/spam'
const offer = '/offers'
const application = '/applications'


export const UrlProvider = {
    
    getBaseURL(){
        return baseUrl;
    },
    getUserURL(){
        return baseUrl + userUrl;
    },

    getMeURL(){
        return baseUrl + userUrl + meUrl;
    },

    getRedBoxURL(){
        return baseUrl + redBoxURL;
    },
    getForumURL(){
        return baseUrl + forums;
    },
    getThreadURL(){
        return baseUrl + threads;
    },
    getPublicationURL(){
        return baseUrl + publications;
    },
    getSpamURL(){
        return baseUrl + spam;
    },
    getOfferURL(){
        return baseUrl + offer;
    },
    getApplicationURL(){
        return baseUrl + application;
    }
}