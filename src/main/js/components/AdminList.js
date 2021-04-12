import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import ApiService from "../services/ApiService";
import Checked from "./Checked";
import UnCheckedAdmin from "./UnCheckedAdmin";
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
        this.reloadAlerts = this.reloadAlerts.bind(this);
    }

    componentDidMount() {
        ApiService.fetchAlerts().then(res => {
            const alerts = res.data;
            const filterAlerts = res.data.filter(alert => alert.checked === false).filter(alert => Date.now() - Date.parse(alert.timestamp) > 172800000);
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

    filtered(){
        this.setState({
            currentAlerts: this.state.filteredAlerts,
            checked: false
        })
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


    render() {
        let table;
        // Used to conditionally render items that are on the difference between acknowledged and unacknowledged
        if(this.state.checked){
            table =  <Checked currentAlerts={this.state.currentAlerts}/>
        }
        else{
            console.log(this.state.currentAlerts);
            console.log(this.state.uncheckedAlerts);
            table = <UnCheckedAdmin currentAlerts={this.state.currentAlerts} />
        }
        return (
            <div>
                <Navbar bg="dark" variant="dark" >
                    <Navbar.Brand href="/"> File System </Navbar.Brand>
                    <Navbar.Toggle />
                    <Nav className="mr-auto">
                        <Nav.Link href="#unacknowledge" onSelect={this.unchecked.bind(this)} style={{marginRight: "60px"}}>Unacknowledged Alerts</Nav.Link>
                        <Nav.Link href="#acknowledge" onSelect={this.checked.bind(this)} style={{marginRight: "60px"}}>Acknowledged Alerts</Nav.Link>
                        <Nav.Link href="#filter" onSelect={this.filtered.bind(this)} style={{marginRight: "60px"}}>Red Alerts (+2 Days Old)</Nav.Link>
                    </Nav>
                </Navbar>
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
                {/*                    </tr> )*/}
                {/*    }*/}
                {/*    </tbody>*/}
                {/*</Table>*/}
                {table}
            </div>
        );
    }
}

export default AdminList;