import axios from 'axios';

const ALERT_API_BASE_URL = 'http://localhost:8080/alerts';

const CSRF_TOKEN = document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1];
const instance = axios.create({
    headers: { "X-XSRF-TOKEN": CSRF_TOKEN }
});

class ApiService{
    fetchAlerts(){
        return instance.get(ALERT_API_BASE_URL)
    }
    editAlert(alert) {
        return instance.put(ALERT_API_BASE_URL + '/' + alert.id, alert);
    }
}