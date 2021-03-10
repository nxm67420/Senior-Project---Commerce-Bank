//Import React && Libraries
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

//Import React && DOM
const React = require('react');
const ReactDOM = require('react-dom');

//Import Component Files Below
import ListComponent from "./components/ListComponent";


function App() {
    return (
        <div className={}>
            <Router>
                <div>
                    <h1 className={} style={style}> File Management System</h1>
                    <Switch>
                        <!--Insert Components-->
                        <Route path={"/"} exact component={}/>
                        <Route path={"/list"} component={ListComponent}/><!--Take us to ListComponent.HTML located in app.js-->
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

const style = {
    color:aqua
};

export default App;

ReactDOM.render(
    <App />,
    document.getElementById('react')
);
