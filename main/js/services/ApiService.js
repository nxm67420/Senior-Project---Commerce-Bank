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

    async getData() {
        const response =
            await axios.get("http://localhost:8080/users/username/request");
        console.log(response.data);
        const res =
            await axios.get(`http://localhost:8080/users/${response.data}`);
        console.log(res);
        const alerts =
            await axios.get(`http://localhost:8080/alerts/${res.data.id}`);
        console.log(alerts);
        return alerts;
    }

    async fetchAlerts(){
         return await axios.get(ALERT_API_BASE_URL)
    }

    acknowledge(alert){
        return axios.put(ALERT_API_BASE_URL + "/" + alert.id, alert);
    }
}

export default new ApiService();