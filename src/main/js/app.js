const React = require('react');
const ReactDOM = require('react-dom');
import UserList from "./UserList";
import UserList2 from "./UserList2";
import Footer from "./Footer";

function App() {
    return (
        <div>
            <UserList2 />
            <br/>
            <br/>
            <h1 className={"text-center"} style={style}>System File Management </h1>
            <UserList />
            <div>
                <Footer/>
            </div>
        </div>
    );
}

const style = {
    color: '#228b22'
}

export default App;

ReactDOM.render(
    <App/>,
    document.getElementById('react')
);