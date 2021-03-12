import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Table from "react-bootstrap/Table";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {useState} from "react";
import ApiService from './services/ApiService';
import UserList from "./UserList";

function PopUp(props) {
    const [show, setShow] = useState(false);

    const [valueOne,setValueOne]=useState(null);
    const [valueTwo,setValueTwo]=useState(null);


    const handleSelectOne=(e)=>{
        // console.log(e);
        if(e==='1'){
            setValueOne(true);
        }
        else if(e==='2'){
            setValueOne(false);
        }
    };

    const handleSelectTwo=(e)=>{
        // console.log(e);
        if(e==='1'){
            setValueTwo(true);
        }
        else if(e==='2'){
            setValueTwo(false);
        }
    };

    const handleClose = () => {
        setValueOne('');
        setValueTwo('');
        setShow(false);
    };
    const handleSave = ()=>{
        console.log(valueOne);
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
        axios.put('http://localhost:8080/alerts/' + alert.id, alert)
            .then(() =>
                    axios.get(`http://localhost:8080/alerts/${props.user}`
            ))
            .then(res => {
                props.reloadAlerts(res.data);
            });
        setShow(false);
    };

    const handleShow = () => setShow(true);

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

                    <DropdownButton id="dropdown-item-button" title="Malicious?" onSelect={handleSelectTwo}>
                        <Dropdown.Item eventKey="1">Malicious</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Not Malicious</Dropdown.Item>
                    </DropdownButton>
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