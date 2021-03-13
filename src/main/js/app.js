const React = require('react');
const ReactDOM = require('react-dom');
import UserList from "./UserList";
import ListComponent from "./components/ListComponent";

function App() {
    return (
        <div>
            <UserList />,
            <ListComponent/>
        </div>
    );
}

export default App;

ReactDOM.render(
    <App />,
    document.getElementById('react')
);