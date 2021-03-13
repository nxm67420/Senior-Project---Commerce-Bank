import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from 'react-bootstrap/Button';
import PopUp from './PopUp';
import ApiService from "./services/ApiService";




class UserList extends React.Component {

    constructor (props){
        super(props);
        // three different states
        // alerts -> all the alerts relevant to user
        // filteredAlerts -> alerts older than two days, relevant to user
        //currentAlerts -> current alert list being rendered, will either be alerts or filteredAlerts
        this.state = {
            alerts: [],
            filteredAlerts: [],
            currentAlerts: [],
            checked: false,
            userId: []
        };
        this.reloadAlerts = this.reloadAlerts.bind(this);
    }

    //Gets the user's alerts
    async getData() {
        // const response =
        //     await axios.get("http://localhost:8080/users/username/request");
        // console.log(response.data);
        // const res =
        //     await axios.get(`http://localhost:8080/users/${response.data}`);
        // console.log(res);
        // this.setState({userId: res.data.id});
        // const alerts =
        //     await axios.get(`http://localhost:8080/alerts/${res.data.id}`);
        // console.log(alerts);
        // return alerts;
    }

    componentDidMount() {
            ApiService.fetchAlerts().then(res => {
                const alerts = res.data;
                const filterAlerts = res.data.filter(alert => Date.now() - Date.parse(alert.timestamp) > 172800000);
                this.setState({
                    alerts: alerts,
                    filteredAlerts: filterAlerts,
                    currentAlerts: alerts
                });
            });

            ApiService.getUser().then(res => {
                this.setState({
                    userId: res.data.id
                })

            });
            console.log(this.state.userId);
    }

    //Reloads alerts when an alert is acknowledged
    reloadAlerts(alerts){
        const filterAlerts = alerts.filter(alert => Date.now() - Date.parse(alert.timestamp) > 172800000);
        if(this.state.checked) {
            this.setState({
                alerts: alerts,
                filteredAlerts: filterAlerts,
                currentAlerts: filterAlerts
            });
        }
        else{
            this.setState({
                alerts: alerts,
                filteredAlerts: filterAlerts,
                currentAlerts: alerts
            });
        }
        console.log(alerts);
    }

    //Changes the checked state when button is clicked, as well as filters table
    setChecked(){
        if (this.state.checked === true){
            this.setState({
                checked: false,
                currentAlerts: this.state.alerts
            });

        }
        else {
            this.setState({
                checked: true,
                currentAlerts: this.state.filteredAlerts
            });
        }
        console.log(this.state.checked)
    }

    render() {
        return (
            <div>
                <ButtonGroup toggle className="mb-2">
                    <ToggleButton
                        type="checkbox"
                        variant="primary"
                        checked={this.state.checked}
                        value="1"
                        onChange={this.setChecked.bind(this)}
                    >
                        Two Days
                    </ToggleButton>
                </ButtonGroup>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th colSpan="7">
                            Not Checked
                        </th>
                    </tr>
                    <tr>
                        <th>File</th>
                        <th>Hostname</th>
                        <th>Application ID</th>
                        <th>Change Agent</th>
                        <th>Change Process</th>
                        <th>Timestamp</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.currentAlerts.filter(alert => alert.checked === false)
                            .sort((a, b) => a.timestamp < b.timestamp ? 1 : -1)
                            .map(
                            alert =>
                                <tr key={alert.id}>
                                    <td>{alert.file}</td>
                                    <td>{alert.hostname}</td>
                                    <td>{alert.application_id}</td>
                                    <td>{alert.change_agent}</td>
                                    <td>{alert.change_process}</td>
                                    <td>{alert.timestamp}</td>
                                    <td>
                                        <PopUp user={this.state.userId} id={alert.id} alert={alert} reloadAlerts={this.reloadAlerts} />
                                    </td>
                                </tr> )
                    }
                    </tbody>
                </Table>

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th colSpan="6">
                            Checked
                        </th>
                    </tr>
                    <tr>
                        <th>File</th>
                        <th>Hostname</th>
                        <th>Application ID</th>
                        <th>Change Agent</th>
                        <th>Change Process</th>
                        <th>Timestamp</th>
                        <th>Known Change</th>
                        <th>Malicious Change</th>
                        <th>Acknowledged User</th>
                        <th>Acknowledged Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.alerts.filter(alert => alert.checked === true).sort((a, b) => a.timestamp < b.timestamp ? 1 : -1).map(
                            alert =>
                                <tr key={alert.id}>
                                    <td>{alert.file}</td>
                                    <td>{alert.hostname}</td>
                                    <td>{alert.application_id}</td>
                                    <td>{alert.change_agent}</td>
                                    <td>{alert.change_process}</td>
                                    <td>{alert.timestamp}</td>
                                    <td>{alert.known.toString()}</td>
                                    <td>{alert.malicious.toString()}</td>
                                    <td>{alert.acknowledge_user}</td>
                                    <td>{alert.acknowledge_time}</td>
                                </tr> )
                    }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default UserList;