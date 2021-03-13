import axios from 'axios';

const ALERT_API_BASE_URL = 'http://localhost:8080/alerts';

const CSRF_TOKEN = document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1];
const instance = axios.create({
    headers: { "X-XSRF-TOKEN": CSRF_TOKEN }
});

class ApiService{
    async fetchAlerts() {
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

    async getUser() {
        const response =
            await axios.get("http://localhost:8080/users/username/request");
        console.log(response.data);
        const res =
            await axios.get(`http://localhost:8080/users/${response.data}`);
        console.log(res);
        return res;
    }
    editAlert(alert) {
        return instance.put(ALERT_API_BASE_URL + '/' + alert.id, alert);
    }
}

export default new ApiService();