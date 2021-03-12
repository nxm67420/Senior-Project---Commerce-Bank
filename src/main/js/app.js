//Import React && Libraries
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

//Import Component Files Below
import ListComponent from "./components/ListComponent";
import ApiService from "./services/ApiService";

//Import React && DOM
const React = require('react');
const ReactDOM = require('react-dom');

function App(){
    return (
        <div className="container">
            <Router>
                <div className="col-md-6">
                    <h1 className="text-center" style={{color: red}}> File Management System</h1>
                    <Switch>
                        <!--Insert Components-->
                        <Route path={"/"} exact component={ListComponent}/>
                        <Route path={"/list"} component={ListComponent}/><!--Take us to ListComponent.HTML located in app.js-->
                        <ListComponent/>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;

ReactDOM.render(
    <App />,
    document.getElementById("react")
);
