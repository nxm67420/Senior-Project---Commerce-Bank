import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from "react-bootstrap/ButtonGroup";




class UserList extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            alerts: []
        };
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

    componentDidMount() {
        this.getData().then(res => {
            const alerts = res.data;
            this.setState({ alerts: alerts});
        });
    }

    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th colSpan="6">
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
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.alerts.filter(alert => alert.checked === false)
                            .filter(alert => Date.now() - Date.parse(alert.timestamp) > 172800000)
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
                                </tr> )
                    }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default UserList;