//Import React && Libraries
import React from 'react';
import {BrowserRouter as Router, Route, Swicth} from "react-router-dom";

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
                    <h1 className={} style={style}> File Management</h1>
                    <Switch>
                        <!--Insert Components-->
                        <Route path={"/"} exact component={}/>
                        <Route path={""} component={}></Route>
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
)
