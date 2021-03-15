import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from "react-bootstrap/ButtonGroup";
import NavigationBar from "./NavigationBar";
import {Nav, Navbar} from "react-bootstrap";




class AdminList extends React.Component {

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
            checked: false
        };
    }

    //Gets the user's alerts
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
            const filterAlerts = res.data.filter(alert => Date.now() - Date.parse(alert.timestamp) > 172800000);
            const unchecked = res.data.filter(alert => alert.checked === false);
            const checked = res.data.filter(alert => alert.checked === true);
            this.setState({
                alerts: alerts,
                filteredAlerts: filterAlerts,
                checkedAlerts: checked,
                uncheckedAlerts: unchecked,
                currentAlerts: unchecked
            });
        });
        console.log(this.state.currentAlerts);
    }

    checked() {
        this.setState({
            currentAlerts: this.state.checkedAlerts
        })
    }

    unchecked() {
        this.setState({
            currentAlerts: this.state.uncheckedAlerts
        })
    }

    filtered(){
        this.setState({
            currentAlerts: this.state.filteredAlerts
        })
    }


    render() {
        return (
            <div>
                Admin
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/"> File System </Navbar.Brand>
                    <Navbar.Toggle />
                    <Nav className="mr-auto">
                        <Nav.Link href="#unacknowledge" onSelect={this.unchecked.bind(this)} style={{marginRight: "120px"}}>Unacknowledged Alerts</Nav.Link>
                        <Nav.Link href="#acknowledge" onSelect={this.checked.bind(this)} style={{marginRight: "120px"}}>Acknowledged Alerts</Nav.Link>
                        <Nav.Link href="#filter" onSelect={this.filtered.bind(this)} style={{marginRight: "120px"}}>Red Alerts (+2 Days Old)</Nav.Link>
                    </Nav>
                </Navbar>
                {/*<ButtonGroup toggle className="mb-2">*/}
                {/*    <ToggleButton*/}
                {/*        type="checkbox"*/}
                {/*        variant="primary"*/}
                {/*        checked={this.state.checked}*/}
                {/*        value="1"*/}
                {/*        onChange={this.setChecked.bind(this)}*/}
                {/*    >*/}
                {/*        Two Days*/}
                {/*    </ToggleButton>*/}
                {/*</ButtonGroup>*/}
                <Table striped bordered hover>
                    <thead>
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
                        this.state.currentAlerts.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1)
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
            </div>
        );
    }
}

export default AdminList;