const baseUrl = "http://localhost:8080"
const pruebaUrl = "/prueba"

export const UrlProvider = {
    getPruebaURL(){
        return baseUrl+pruebaUrl;
    }
}