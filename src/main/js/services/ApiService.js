import axios from 'axios';

//Access To Alerts
const ALERT_API_BASE_URL = 'http://localhost:8080/alerts';

//Access To Users
const User_API_BASE_URL = 'http://localhost:8080/users';


//For Javascript API Services
class ApiService{

    async getRole() {
        const response =
           await axios.get("http://localhost:8080/users/username/request");
        const res =
           await axios.get(`http://localhost:8080/users/${response.data}`);
        console.log(res);
        return res;
    }

    //Retrieve Role
    fetchByRole(role){
        return axios.get(User_API_BASE_URL + '/' + "username" + '/' + axios.request(role));
    }

    //Retrieve ....
    fetchAlerts(){
        return axios.get(ALERT_API_BASE_URL)
    }

    //Retrieve +1
    fetchAlertById(id){
        return axios.get(ALERT_API_BASE_URL + '/' + id);
    }

    fetchAlertByChecked(checked){
        return axios.get(ALERT_API_BASE_URL + '/' + 'checked' + '/' + axios.request(checked));
    }

    //Delete
    deleteAlertById(id){
        return axios.delete(ALERT_API_BASE_URL + '/' + id);
    }

    //Update
    editAlertById(id){
        return axios.put(ALERT_API_BASE_URL + '/' + alert.id, alert);
    }

}

export default new ApiService();