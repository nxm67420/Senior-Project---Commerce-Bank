import axios from 'axios';

const CAR_API_BASE_URL = 'http://localhost:8080/alerts';

const CSRF_TOKEN = document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1];
const instance = axios.create({
    headers: { "X-XSRF-TOKEN": CSRF_TOKEN }
});

class ApiService{

    async getRole() {
        const response =
           await axios.get("http://localhost:8080/users/username/request");
        const res =
           await axios.get(`http://localhost:8080/users/${response.data}`);
        console.log(res);
        return res;
    }
    fetchAlerts(){
        return instance.get(CAR_API_BASE_URL)
    }
}

export default new ApiService();