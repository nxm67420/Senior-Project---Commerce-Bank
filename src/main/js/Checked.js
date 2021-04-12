import React from 'react';
import Table from 'react-bootstrap/Table';

class Checked extends React.Component {

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
    }

    componentDidMount() {
        console.log(this.props.currentAlerts);
    }

    render() {
        return(
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th><p className={"tableFont"}>File</p></th>
                            <th class={"pcView"}><p className={"tableFont"}>Hostname</p></th>
                            <th class={"pcView"}><p className={"tableFont"}>Application ID</p></th>
                            <th><p className={"tableFont"}>Change Agent</p></th>
                            <th><p className={"tableFont"}>Change Process</p></th>
                            <th class={"pcView"}><p className={"tableFont"}>Timestamp</p></th>
                            <th class={"pcView"}><p className={"tableFont"}>Known Change</p></th>
                            <th><p className={"tableFont"}>Malicious Change</p></th>
                            <th class={"pcView"}><p className={"tableFont"}>Acknowledged User</p></th>
                            <th class={"pcView"}><p className={"tableFont"}>Acknowledged Time</p></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.currentAlerts.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1)
                                .map(
                                    alert =>
                                        <tr key={alert.id}>
                                            <td><p className={"tableFont"}>{alert.file}</p></td>
                                            <td class={"pcView"}><p className={"tableFont"}>{alert.hostname}</p></td>
                                            <td class={"pcView"}><p className={"tableFont"}>{alert.application_id}</p></td>
                                            <td><p className={"tableFont"}>{alert.change_agent}</p></td>
                                            <td><p className={"tableFont"}>{alert.change_process}</p></td>
                                            <td class={"pcView"}><p className={"tableFont"}>{alert.timestamp}</p></td>
                                            <td class={"pcView"}><p className={"tableFont"}>{alert.known.toString()}</p></td>
                                            <td><p className={"tableFont"}>{alert.malicious.toString()}</p></td>
                                            <td class={"pcView"}><p className={"tableFont"}>{alert.acknowledge_user}</p></td>
                                            <td class={"pcView"}><p class={"tableFont"}>{alert.acknowledge_time}</p></td>
                                        </tr>)
                        }
                        </tbody>
                    </Table>
            );
        }

}

export default Checked;