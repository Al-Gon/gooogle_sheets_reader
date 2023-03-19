import './App.css';
import {Fragment} from "react";
import Header from "../header/Header";
import Home from "../home/Home";

function App() {
    return (
        <Fragment>
            <Header/>
            <Home/>
        </Fragment>
    );
}

export default App;