//'Axios' Handles our GET/POST/DELETE Request through API
//Connect To our Dao Controllers
import axios from 'axios';

//Base URL Link to Retrieve Data
const ALERT_API_BASE_URL = 'http://localhost:8080/alerts';

const CSRF_TOKEN = document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1];
const instance = axios.create({
    headers: { "X-XSRF-TOKEN": CSRF_TOKEN }
});

class ApiService{
    /* Methods GET/POST/ DELETE etc... */

    //Fetches ALL Alerts
    fetchAlerts(){
        return  instance.get(ALERT_API_BASE_URL)
    }

    //Fetches Alerts according to Specific ID
    fetchAlertById(alertId){
        return instance.get(ALERT_API_BASE_URL + '/' + alertId);
    }

    //Deletes Alert according to Specific ID
    deleteAlert(alertId){
        return instance.delete(ALERT_API_BASE_URL + '/' + alertId);
    }

    //Add File /* Not essential just yet*/
    //Will only be accessible through Admin, Higher Privilege
    //Will Assign File to specific users
    addAlert(alert){
        return instance.post("" + ALERT_API_BASE_URL, alert)
    }


    //Edit Specific File according to Specific ID || Application ID
    editAlert(alert){
        return instance.put(ALERT_API_BASE_URL + '/' + alert.id, alert);
    }
}

export default new ApiService();