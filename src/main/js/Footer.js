import React from "react";
import {Navbar, Container, Col} from "react-bootstrap";



class Footer extends React.Component{
    render() {
        let yearOf = new Date().getFullYear();

        return (
            <Navbar fixed={'bottom'} bg="dark" variant="dark">
                <Container>
                    <Col lg={12} className={"text-center text-muted"}>
                        <div>
                            {yearOf} - {yearOf + 1}   All Rights Reserved by (Hunter, Jake, Nick)
                        </div>
                    </Col>
                </Container>

            </Navbar>
        );
    }

}

export default Footer;