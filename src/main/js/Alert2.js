import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';

export default class Message extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:false
        }
    }
    componentDidMount(){
        this.setState({show:this.props.show})
    }

    handleClose=()=>{
        this.setState({
            show:false
        })
    };


    render(){
        if(this.props.msg.length<4){
            return (<p></p>);
        }

        return(
            <div>
                <Alert variant='danger' show={this.state.show} onClose={this.handleClose} dismissible>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        {this.props.msg}
                    </p>
                </Alert>
            </div>
        )
    }
}
