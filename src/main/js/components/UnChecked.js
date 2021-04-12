import React from 'react';
import Table from 'react-bootstrap/Table';
import PopUp from "./PopUp";
import Alert from "react-bootstrap/Alert";


//Class to render a table of unchecked alerts for users
class UnChecked extends React.Component {

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
            showAlert: false
        };
        this.showingAlert = this.showingAlert.bind(this);

    }

    //Used to show a popup alert that an alert has been acknowledged
    showingAlert() {
        this.setState({showAlert: true});
    }

    componentDidMount() {
        console.log(this.props.currentAlerts);
    }

    render() {

        //Alert component assigned to a variable
        const alertPopUp =
            <Alert show={this.state.showAlert} variant="success"
                   onClose={() => this.setState({showAlert: false})}
                   dismissible>
                <Alert.Heading>Alert has been acknowledged!</Alert.Heading>
            </Alert>;

        return(
            <div>
                {alertPopUp}
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
                        this.props.currentAlerts.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1)
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
                                            <PopUp user={this.props.userId} id={alert.id} alert={alert} reloadAlerts={this.props.reloadAlerts} showingAlert={this.showingAlert} />
                                        </td>
                                    </tr>)
                    }
                    </tbody>
                </Table>
            </div>
        );
    }

}

export default UnChecked;