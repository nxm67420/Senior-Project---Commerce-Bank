import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {useState} from "react";
import ApiService from '../services/ApiService';
import TextField from '@material-ui/core/TextField';


function PopUp(props) {

    const [show, setShow] = useState(false);

    // valueKnown -> known
    // valueMalicious -> malicious
    // valueChangeNumber -> Ticket Number
    const [valueKnown,setValueKnown]=useState(null);
    const [valueMalicious,setValueMalicious]=useState(null);
    const [valueChangeNumber, setValueChangeNumber]=useState("");

    //Style for selection
    const selectionStyle = {
        paddingBottom: "20px"
    };

    //Generates Input Box when Known is selected
    let changeNumber = null;


    // Assigns valueKnown to a Boolean
    const handleSelectOne=(e)=>{
        // console.log(e);
        if(e==='1'){
            setValueKnown(true);
        }
        else if(e==='2'){
            setValueKnown(false);
        }
    };

    // Assigns valueMalicious to a Boolean
    const handleSelectTwo=(e)=>{
        // console.log(e);
        if(e==='1'){
            setValueMalicious(true);
        }
        else if(e==='2'){
            setValueMalicious(false);
        }
    };

    //Closes Modal
    //If there was a selected value, clear it
    const handleClose = () => {
        setValueKnown(null);
        setValueMalicious( null);
        setShow(false);
        props.showingAlertCancel();
    };

    //Saves update
    const handleSave = ()=>{

        //Sets control_number to either the state value or to N/A
        //Value will be stored in the database
        let control_number;
        if(valueKnown===true){
            control_number=valueChangeNumber
        }
        else{
            control_number="N/A"
        }

        //Create new alert object to send PUT request with
        let alert = {
            id: props.alert.id,
            file: props.alert.file,
            hostname: props.alert.hostname,
            application_id: props.alert.application_id,
            change_agent: props.alert.change_agent,
            change_process: props.alert.change_process,
            timestamp: props.alert.timestamp,
            known: valueKnown,
            malicious: valueMalicious,
            control_number: control_number
        };
        console.log(alert);
        //Send PUT request
        ApiService.acknowledge(alert)
            .then(() =>
                //Fetches updated list of alerts
                ApiService.getData())
            .then(res => {
                //Reloads alert list with updated data
                props.reloadAlerts(res.data);
            });

        //Modal doesnt show anymore
        setShow(false);

        //Calls method to show that the alert has been acknowledged
        props.showingAlert();
    };

    const handleShow = () => setShow(true);

    //Prints the selection
    const know = () => {
        if(valueKnown===true){
            changeNumber =
                <TextField id="outlined-basic" label="Change/Ticket Number" variant="outlined" required={true} size="small" style={selectionStyle} onChange={(e) => {
                    setValueChangeNumber(e.target.value)
                }}/>;
                console.log(valueChangeNumber);
            return "known";
        }
        else if(valueKnown===false){
            changeNumber = null;
            return "unknown";
        }
    };

    //Prints the selection
    const malicious = () => {
        if(valueMalicious===true){
            return "malicious";
        }
        else if(valueMalicious===false){
            return "not malicious";
        }
    };

    const buttonDisabled = () => {
        if(valueKnown === null || valueMalicious === null)
            return true;
        else{
            if(valueKnown===true){
                return valueChangeNumber.trim() === "";
            }
            else
                return false;
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow} style={{color: "white", background: "#009688", border: "none"}}>
                Acknowledge Alert
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Acknowledgement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <DropdownButton id="dropdown-item-button" title="Known Change?" onSelect={handleSelectOne} style ={{borderColor:"red"}}>
                            <Dropdown.Item eventKey="1">Known</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Unknown</Dropdown.Item>
                        </DropdownButton>
                        <b><div style={selectionStyle}>Selected: {know()}</div></b>
                        {changeNumber}
                    </div>
                    <div>
                        <DropdownButton id="dropdown-item-button" title="Malicious?" onSelect={handleSelectTwo}>
                            <Dropdown.Item eventKey="1">Malicious</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Not Malicious</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <b><div style={selectionStyle}>Selected: {malicious()}</div></b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave} disabled={buttonDisabled()} style={{color: "white", background: "#009688", border: "none"}}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopUp;