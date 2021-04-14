const React = require('react');
const ReactDOM = require('react-dom');
import UserList from "./components/UserList";
import Footer from "./Footer";

function App() {
    return (
        <div>
            <UserList />
            <div>
                <Footer/>
            </div>
        </div>
    );
}

export default App;

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);