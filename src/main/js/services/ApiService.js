import axios from 'axios';

const ALERT_API_BASE_URL = window.location.hostname;

class ApiService{

    async getRole() {
        console.log(window.location.hostname);
        const response =
           await axios.get("/users/username/request");
        const res =
           await axios.get(`/users/${response.data}`);
        console.log(res);
        return res;
    }

    async getData() {
        const response =
            await axios.get("/users/username/request");
        console.log(response.data);
        const res =
            await axios.get(`/users/${response.data}`);
        console.log(res);
        const alerts =
            await axios.get(`/alerts/${res.data.id}`);
        console.log(alerts);
        return alerts;
    }

    async fetchAlerts(){
         return await axios.get("/alerts");
    }

    acknowledge(alert){
        return axios.put("/alerts" + "/" + alert.id, alert);
    }
}

export default new ApiService();