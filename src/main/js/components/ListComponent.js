//Import API <--> Backened
import ApiService from "../services/ApiService";
//Bootstrap
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
//Import Connecting Components, Can Redirect to Their File
import SortedAlertsComponent from "./SortedAlertsComponent";
import EditComponent from "./EditComponent";
//Import React
const React = require('react');
import React from 'react';

//Class Component
export default class ListComponent extends React.Component {

    //Constructor Method
    constructor(props) {
        super(props);
        this.state = {
            alerts: [],
            checked: false,
        };
    }

    //Called After Render() //Retrieves info using API
    // componentDidMount() {
    //    // ApiService.fetchAlerts()
    //     fetch("http://localhost:8080/alerts")
    //         .then(res => {
    //             const alerts = res.data.json();
    //             this.setState({
    //                 alerts: alerts,
    //                 checked: true,
    //             });
    //         })
    // }

    //Loads After Page
    componentDidMount() {
        // ApiService.fetchAlerts()
        fetch('http://localhost:8080/alerts')
            .then(res => res.json())
            .then(json =>{
                this.setState({
                    alerts : json,
                    checked : true,
                })
            });
    }


    // editCar(id) {
    //     window.localStorage.setItem("alertId", id); //{Key, Value} : This is how we pass values to other Components
    //     this.editComponent.current.open();
    // }

    //HTML && Javascript
    render() {
        //Access Constructor Variables
        const {checked, alerts} = this.state;

        if (!checked) {
            return <div>Loading...</div>;
        }
        else {
            return (
                <div>
                    <h1 className="text-center" style={{color: aqua}}>React File Management</h1>
                    <h2 className="text-center">File Details</h2>
                    <Button variant="primary" onClick={() => this.addAlert()}> Create File</Button>
                    <AddComponent reloadCarList={this.reloadCarList} ref={this.addComponent}/>
                    <EditComponent reloadCarList={this.reloadCarList} ref={this.editComponent}/>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Hostname</th>
                            <th>Application_ID</th>
                            <th>File_Name</th>
                            <th>Change Agent</th>
                            <th>Change Component</th>
                        </tr>
                        </thead>
                        <tbody>
                        <ul>
                            <!--For Each Object in Array-->
                            {alerts.map(alert =>(
                                <li key={alert.id}>
                                    Name : {alert.hostname}
                                </li>
                            ))};
                        </ul>
                        {/*{*/}
                        {/*    this.state.alert.map(*/}
                        {/*        alerts =>*/}
                        {/*            <tr key={alert.id}>*/}
                        {/*                <td>{alert.id}</td>*/}
                        {/*                <td>{alert.name}</td>*/}
                        {/*                /!*<td>{alert.}</td>*!/*/}
                        {/*                <td>*/}
                        {/*                    <Button variant="dark"*/}
                        {/*                            onClick={() => this.deleteAlert(alert.id)}> Delete</Button>*/}
                        {/*                    {' '}*/}
                        {/*                    <Button variant="primary"*/}
                        {/*                            onClick={() => this.editAlert(alert.id)}> Edit</Button>*/}
                        {/*                </td>*/}
                        {/*            </tr>)*/}
                        {/*}*/}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
};