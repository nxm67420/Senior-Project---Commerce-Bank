import React from 'react';
import Table from 'react-bootstrap/Table';


class UnCheckedAdmin extends React.Component {

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
                    <th>File</th>
                    <th className={"pcView"}><p className={"tableFont"}>Hostname</p></th>
                    <th className={"pcView"}><p className={"tableFont"}>Application ID</p></th>
                    <th><p className={"tableFont"}>Change Agent</p></th>
                    <th><p className={"tableFont"}>Change Process</p></th>
                    <th className={"pcView"}><p className={"tableFont"}>Timestamp</p></th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.currentAlerts.sort((a, b) => a.timestamp < b.timestamp ? 1 : -1)
                        .map(
                            alert =>
                                <tr key={alert.id}>
                                    <td><p className={"tableFont"}>{alert.file}</p></td>
                                    <td className={"pcView"}><p className={"tableFont"}>{alert.hostname}</p></td>
                                    <td className={"pcView"}><p className={"tableFont"}>{alert.application_id}</p></td>
                                    <td><p className={"tableFont"}>{alert.change_agent}</p></td>
                                    <td><p className={"tableFont"}>{alert.change_process}</p></td>
                                    <td className={"pcView"}><p className={"tableFont"}>{alert.timestamp}</p></td>
                                </tr>)
                }
                </tbody>
            </Table>
        );
    }

}

export default UnCheckedAdmin;