import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import AdminList from "./AdminList";
import Checked from "./Checked";
import UnChecked from "./UnChecked";
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
            role: [],
            userId: []
        };
        this.reloadAlerts = this.reloadAlerts.bind(this);
    }


    reloadAlerts(alerts){
        const unchecked = alerts.filter(alert => alert.checked === false);
        const checked = alerts.filter(alert => alert.checked === true);
        if(this.state.checked){
        this.setState({
            alerts: alerts,
            checkedAlerts: checked,
            uncheckedAlerts: unchecked,
            currentAlerts: checked
        });
        }
        else{
            this.setState({
                alerts: alerts,
                checkedAlerts: checked,
                uncheckedAlerts: unchecked,
                currentAlerts: unchecked
            });
        }
        console.log(alerts);
    }

    componentDidMount() {
        ApiService.getRole().then(res => {
           const role = res.data.role;
           const id = res.data.id;
           console.log(role);
           this.setState({
               role: role,
               userId: id
           })
        });
            ApiService.getData().then(res => {
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
            currentAlerts: this.state.checkedAlerts,
            checked: true
        })
    }

    unchecked() {
        this.setState({
            currentAlerts: this.state.uncheckedAlerts,
            checked: false
        })
    }



    render() {
        if(this.state.role === 'ADMIN'){
            return <AdminList/>
        }
         else {
             let table;
            // Used to conditionally render items that are on the difference between acknowledged and unacknowledgd
            if(this.state.checked){
                table =  <Checked currentAlerts={this.state.checkedAlerts}/>
            }
            else {
                console.log(this.state.currentAlerts);
                console.log(this.state.uncheckedAlerts);
                table = <UnChecked currentAlerts={this.state.currentAlerts} reloadAlerts={this.reloadAlerts} userId={this.state.userId}/>
            }
                console.log(this.state.checked);
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
                        {/*<Table striped bordered hover>*/}
                        {/*    <thead>*/}
                        {/*    <tr>*/}
                        {/*        <th>File</th>*/}
                        {/*        <th>Hostname</th>*/}
                        {/*        <th>Application ID</th>*/}
                        {/*        <th>Change Agent</th>*/}
                        {/*        <th>Change Process</th>*/}
                        {/*        <th>Timestamp</th>*/}
                        {/*    </tr>*/}
                        {/*    </thead>*/}
                        {/*    <tbody>*/}
                        {/*    {*/}
                        {/*        this.state.currentAlerts.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1)*/}
                        {/*            .map(*/}
                        {/*                alert =>*/}
                        {/*                    <tr key={alert.id}>*/}
                        {/*                        <td>{alert.file}</td>*/}
                        {/*                        <td>{alert.hostname}</td>*/}
                        {/*                        <td>{alert.application_id}</td>*/}
                        {/*                        <td>{alert.change_agent}</td>*/}
                        {/*                        <td>{alert.change_process}</td>*/}
                        {/*                        <td>{alert.timestamp}</td>*/}
                        {/*                        <td>*/}
                        {/*                            <PopUp user={this.state.userId} id={alert.id} alert={alert} reloadAlerts={this.reloadAlerts} />*/}
                        {/*                        </td>*/}
                        {/*                    </tr>)*/}
                        {/*    }*/}
                        {/*    </tbody>*/}
                        {/*</Table>*/}
                        {table}
                    </div>
                );
            }
        }

}

export default UserList;