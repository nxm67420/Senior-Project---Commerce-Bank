import React from 'react';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import {Nav, Navbar} from "react-bootstrap";
import AdminList from "./AdminList";


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
            role: []
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

    async userRole() {
        const res = await axios.get("http://localhost:8080/users/username/request");
        return await axios.get(`http://localhost:8080/users/${res.data}`);
    }

    componentDidMount() {
        this.userRole().then(res => {
           const role = res.data.role;
           console.log(role);
           this.setState({
               role: role
           })
        });
            this.getData().then(res => {
                const alerts = res.data;
                const unchecked = res.data.filter(alert => alert.checked === false);
                const checked = res.data.filter(alert => alert.checked === true);
                this.setState({
                    alerts: alerts,
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



    render() {
        if(this.state.role === 'ADMIN'){
            return <AdminList/>
        }
        else {
            return (
                <div>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="/"> File System </Navbar.Brand>
                        <Navbar.Toggle/>
                        <Nav className="mr-auto">
                            <Nav.Link href="#unacknowledge" onSelect={this.unchecked.bind(this)}
                                      style={{marginRight: "120px"}}>Unacknowledged Alerts</Nav.Link>
                            <Nav.Link href="#acknowledge" onSelect={this.checked.bind(this)}
                                      style={{marginRight: "120px"}}>Acknowledged Alerts</Nav.Link>
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
                                        </tr>)
                        }
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}

export default UserList;