//Import API <--> Backened
import ApiService from "../services/ApiService";
import axios from 'axios';

//Design
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

//Import Connecting Comopnents, Can Redirect to Their File
import AddComponent from "./AddComponent";
import EditComponent from "./EditComponent";

//Import React
const React = require('react');

//Component
class ListComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            alerts: [],
            message: "Listed Alerts"
        };
        this.deleteAlert = this.deleteCar.bind(this);
        this.editCar = this.editCar.bind(this);
        this.addCar = this.addCar.bind(this);
        this.reloadCarList = this.reloadCarList.bind(this);
        this.addComponent = React.createRef();
        this.editComponent = React.createRef();
    }

    //Retrieves All Alerts
    componentDidMount() {
        ApiService.fetchAlerts()
            .then(res => {
                const alerts = res.data;
                this.setState({ alerts: alerts });
            })
    }


    // editCar(id) {
    //     window.localStorage.setItem("alertId", id); //{Key, Value} : This is how we pass values to other Components
    //     this.editComponent.current.open();
    // }

    render() {
        return (
            <div>
                <h1 className="text-center" style={style}>React Car Application</h1>
                <h2 className="text-center">Car Details</h2>
                <Button variant="primary" onClick={() => this.addAlert()}> Create File</Button>
                {/*<AddComponent reloadCarList={this.reloadCarList} ref={this.addComponent}/>
                <EditComponent reloadCarList={this.reloadCarList} ref={this.editComponent}/>*/}
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
                    {
                        this.state.alerts.map( //alert??
                            car =>
                                <tr key={alert.id}>
                                    <td>{alert.id}</td>
                                    <td>{alert.make}</td>
                                    <td>{alert.model}</td>
                                    <td>{alert.year}</td>
                                    <td>
                                        <Button variant="dark" onClick={() => this.deleteAlert(alert.id)}> Delete</Button>
                                        {' '}
                                        <Button variant="primary" onClick={() => this.editAlert(alert.id)}> Edit</Button>
                                    </td>
                                </tr>)
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default ListComponent;