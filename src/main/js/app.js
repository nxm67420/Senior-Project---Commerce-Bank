const React = require('react');
const ReactDOM = require('react-dom');
import UserList from "./UserList";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

function App() {
    return (
        <div>
            {/*<NavigationBar/>*/}
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