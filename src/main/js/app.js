import React from 'react';
const ReactDOM = require('react-dom');
import UserList from "./UserList";
import ListComponent from "./components/ListComponent";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//Not Working Nick Moore...

//Returns JSX
function App() {
    return (
        <div>
            <Router>
                <div className={"col-mid-6"}>
                    <h1 className="text-center">Nothing Works</h1>
                    <Switch>
                        <Route path="/" exact component={ListComponent}/>
                        <Route path="/itachi" component={ListComponent}/>
                        <Route path="/index" exact component={UserList}/>
                    </Switch>
                </div>
            </Router>
            <UserList/>,
            <ListComponent/>
        </div>
    );
}

export default App;

ReactDOM.render(<App/>,
    document.getElementById('react'));