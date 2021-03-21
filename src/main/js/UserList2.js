import React from 'react';
import ApiService from "./services/ApiService";
import AdminList from "./AdminList";
import Table from "react-bootstrap/Table";
import {ButtonGroup, Button} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';

class UserList2 extends React.Component{

    //Constructor
    constructor(props) {
        super(props);
        this.state = {
            alerts : [],
            checkedAlerts : [],
            uncheckedAlerts : [],
            checked : false,
            role : "",
            userId : "",
            alert : "",
        }
    }

    //Lifecycle Method()
    componentDidMount() {
        this.fetchAlerts();
        this.fetchCheckedAlerts();
        this.userRole();
        console.log(this.state.role)
    }

    // reloadAlerts(alerts){
    //     const unchecked = alerts.filter(alert => alert.checked === false);
    //     const checked = alerts.filter(alert => alert.checked === true);
    //     if(this.state.checked){
    //         this.setState({
    //             alerts: alerts,
    //             checkedAlerts: checked,
    //             uncheckedAlerts: unchecked,
    //             currentAlerts: checked
    //         });
    //     }
    //     else{
    //         this.setState({
    //             alerts: alerts,
    //             checkedAlerts: checked,
    //             uncheckedAlerts: unchecked,
    //             currentAlerts: unchecked
    //         });
    //     }
    //     console.log(alerts);
    // }

    //Fetches Role of User
    userRole (){
        ApiService.fetchByRole()
            .then(res=>{
                const role = res.data;
                this.setState({role: role})
            })
    };

    //Fetches All Alerts
    fetchAlerts(){
        ApiService.fetchAlerts()
            .then(res=>{
                const allAlerts = res.data;
                this.setState({alerts: allAlerts});
            })
    };

    //Fetches +1 Alert
    fetchAlert(){
        ApiService.fetchAlertById(id)
            .then(res =>{
                const Alert = res.data;
                this.setState({alert : Alert});
            })
    };

    //Fetches Checked Alerts
    fetchCheckedAlerts(){
        ApiService.fetchAlertByChecked()
            .then(res =>{
                if(res.data === true){
                    this.setState({checkedAlerts: res.data}),
                    this.setState({checked : true})
                }
                else{
                    this.setState({uncheckedAlerts : res.data}),
                    this.setState({checked : false})
                }
            })
    };

    render() {
        const currentRole = "";
        if(this.state.role === 'ADMIN'){
            <h1>Hello,  {this.state.role} </h1>;
            return <AdminList/>
        }
        else{
            <h1>Greetings, {this.state.role}</h1>
        }
        return(
            <div>
                <h1 className="text-center"> Nicks Table Demo</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Change_Agent</th>
                            <th>Change_Process</th>
                            <th>File</th>
                            <th>Hostname</th>
                            <th>Timestamp</th>
                            <th>Checked</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.alerts.map(
                            alert =>
                        <tr key={alert.id}>
                            <td>{alert.change_agent}</td>
                            <td>{alert.change_process}</td>
                            <td>{alert.file}</td>
                            <td>{alert.hostname}</td>
                            <td>{alert.timestamp}</td>
                            <td>{alert.checked}</td>
                            <td>
                            <ButtonGroup>
                                <Button size={"md"} variant={"outline-primary"}> <FontAwesomeIcon icon={faEdit} /> </Button>
                                {''} <Button size={"md"} variant={"outline-danger"}> <FontAwesomeIcon icon={faTrash} /> </Button>
                            </ButtonGroup>
                            </td>
                        </tr>
                        )
                    }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={12}></td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        );
    }

}

export default UserList2;