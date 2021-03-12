const React = require('react');
const ReactDOM = require('react-dom');
import UserList from "./UserList";

function App() {
    return (
        <div>
            <UserList />
        </div>
    );
}

export default App;

ReactDOM.render(
    <App />,
    document.getElementById('react')
);