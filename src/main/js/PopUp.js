import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from "react-bootstrap";
import {useState} from "react";
import ApiService from './services/ApiService';

function PopUp(props) {
    const [show, setShow] = useState(false);

    // valueOne -> known
    // valueTwo -> malicious
    const [valueOne,setValueOne]=useState(null);
    const [valueTwo,setValueTwo]=useState(null);


    // Assigns valueOne to a Boolean
    const handleSelectOne=(e)=>{
        // console.log(e);
        if(e==='1'){
            setValueOne(true);
        }
        else if(e==='2'){
            setValueOne(false);
        }
    };

    // Assigns valueTwo to a Boolean
    const handleSelectTwo=(e)=>{
        // console.log(e);
        if(e==='1'){
            setValueTwo(true);
        }
        else if(e ==='2'){
            setValueTwo(false);
        }
    };

    //Closes Modal
    //If there was a selected value, clear it
    const handleClose = () => {
        setValueOne('');
        setValueTwo('');
        setShow(false);
        //Alert Timer
        setTimeout(function() { alert("Alert Edit Canceled"); }, 500);
    };


    //Saves update
    const handleSave = ()=>{
        console.log(valueOne);
        //Create new alert object to send PUT request with
        let alert = {
            id: props.alert.id,
            file: props.alert.file,
            hostname: props.alert.hostname,
            application_id: props.alert.application_id,
            change_agent: props.alert.change_agent,
            change_process: props.alert.change_process,
            timestamp: props.alert.timestamp,
            known: valueOne,
            malicious: valueTwo
        };


        console.log(alert);
        //Send PUT request
        axios.put('http://localhost:8080/alerts/' + alert.id, alert)
            .then(() =>
                //Fetches updated list of alerts
                axios.get(`http://localhost:8080/alerts/${props.user}`
                ))
            .then(res => {
                //Reloads alert list with updated data
                props.reloadAlerts(res.data);
            });
        setShow(false);
    };

    const handleShow = () => setShow(true);

    //Prints the selection
    const know = () => {
        if(valueOne===true){
            return "known";
        }
        else if(valueOne===false){
            return "unknown";
        }
    };

    //Prints the selection
    const malicious = () => {
        if(valueTwo===true){
            return "malicious";
        }
        else if(valueTwo===false){
            return "not malicious";
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Acknowledge Alert
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Acknowledgement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DropdownButton id="dropdown-item-button" title="Known Change?" onSelect={handleSelectOne}>
                        <Dropdown.Item eventKey="1">Known</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Unknown</Dropdown.Item>
                    </DropdownButton>
                    <b><span>Selected: {know()}</span></b>
                    <DropdownButton id="dropdown-item-button" title="Malicious?" onSelect={handleSelectTwo}>
                        <Dropdown.Item eventKey="1">Malicious</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Not Malicious</Dropdown.Item>
                    </DropdownButton>
                    <b><span>Selected: {malicious()}</span></b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave} disabled={valueOne===null || valueTwo===null}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopUp;