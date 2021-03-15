import React, {useState} from 'react';
import {Navbar, Nav} from "react-bootstrap";
import Image from 'react-bootstrap/Image'

class NavigationBar extends React.Component{
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/"> File System </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#" style={{marginLeft:"120px", marginRight: "120px"}}>Home</Nav.Link>
                        <Nav.Link href="#" style={{marginRight: "120px"}}>Unacknowledged Alerts</Nav.Link>
                        <Nav.Link href="#" style={{marginRight: "120px"}}>Acknowledged Alerts</Nav.Link>
                        <Nav.Link href="#" style={{marginRight: "120px"}}>Red Alerts (+2 Days Old)</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBar;