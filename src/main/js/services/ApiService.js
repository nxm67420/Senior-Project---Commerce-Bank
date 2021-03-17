import axios from 'axios';

const ALERT_API_BASE_URL = 'http://localhost:8080/alerts';


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
        return axios.get(ALERT_API_BASE_URL)
    }
}

export default new ApiService();