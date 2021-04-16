import React from 'react';
import {Nav, Navbar, Spinner} from "react-bootstrap";
import AdminList from "./AdminList";
import Checked from "./Checked";
import UnChecked from "./UnChecked";
import ApiService from "../services/ApiService";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

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
            userId: [],
            loading : true
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
            currentAlerts: checked,
            loading : false
        });
        }
        else{
            this.setState({
                alerts: alerts,
                checkedAlerts: checked,
                uncheckedAlerts: unchecked,
                currentAlerts: unchecked,
                loading : false
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
                    currentAlerts: unchecked,
                    loading : false
                });
            });
            console.log(this.state.currentAlerts);
    }

    checked() {
        this.setState({
            currentAlerts: this.state.checkedAlerts,
            checked: true,
            loading : false
        })
    }

    unchecked() {
        this.setState({
            currentAlerts: this.state.uncheckedAlerts,
            checked: false,
            loading : false
        })
    }



    render() {
        //Spinner Design
        const useStyles = makeStyles((theme) => ({
            backdrop: {
                zIndex: theme.zIndex.drawer + 1,
                color: '#fff',
            },
        }));
        //If Collecting Data, Display Loading Page
        if (this.state.loading) {
            return (
                <Backdrop style={useStyles} open>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            )
        }
        //If Done Collecting Data, Show Results
        else {
            //IF Admin
            if (this.state.role === 'ADMIN') {
                return <AdminList/>
            }
            //IF User
            else {
                let table;
                // Used to conditionally render items that are on the difference between acknowledged and unacknowledged
                if (this.state.checked) {
                    table = <Checked currentAlerts={this.state.checkedAlerts}/>
                } else {
                    console.log(this.state.currentAlerts);
                    console.log(this.state.uncheckedAlerts);
                    table = <UnChecked currentAlerts={this.state.currentAlerts} reloadAlerts={this.reloadAlerts}
                                       userId={this.state.userId}/>
                }
                console.log(this.state.checked);
                return (
                    <div>
                        <Navbar bg="dark" variant="dark">
                            <Navbar.Brand href="/" style={{marginRight: "60px"}}> File System </Navbar.Brand>
                            <Navbar.Toggle/>
                            <Nav className="mr-auto">
                                <Nav.Link href="#unacknowledge" onSelect={this.unchecked.bind(this)}
                                          style={{marginLeft : "200px" ,marginRight: "200px"}}>Unacknowledged Alerts</Nav.Link>
                                <Nav.Link href="#acknowledge" onSelect={this.checked.bind(this)}
                                          style={{marginLeft : "200px" ,marginRight: "200px"}}>Acknowledged Alerts</Nav.Link>
                            </Nav>
                        </Navbar>
                        {table}
                    </div>
                );
            }
        }
    }
}

export default UserList;