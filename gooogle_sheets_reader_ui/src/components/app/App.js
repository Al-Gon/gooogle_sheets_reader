import './App.css';
import {Fragment, useState} from "react";
import Header from "../header/Header";
import TopPanel from "../toppanel/TopPanel";
import Content from "../content/Content";


function App() {
    const [toggle, setToggle] = useState(false)
    const uploader = () => {
        setToggle(!toggle)
    }
    return (
        <Fragment>
            <Header/>
            <TopPanel toggle={toggle} upLoader={uploader}/>
            <Content toggle={toggle}/>
        </Fragment>
    );
}

export default App;