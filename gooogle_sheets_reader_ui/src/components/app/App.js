import './App.css';
import {Fragment, useEffect, useState} from "react";
import Header from "../header/Header";
import TopPanel from "../toppanel/TopPanel";
import Content from "../content/Content";
import axios from "axios";
import {API_URL_2} from "../../index";


function App() {
    const [toggle, setToggle] = useState(false)
    const [sync_toggle, setSync_toggle] = useState("stop")
    const [reply, setReply] = useState("Синхронизация выключена.")

    const up_loader = () => {
        setToggle(prevValue => !prevValue)
    }
    const up_sync = () => {
        setSync_toggle( sync_toggle === "stop" ? "start" : "stop")
    }

    useEffect(()=>{
        const getReply = async (data) => {
            const response = await axios.post(API_URL_2, data)
            const new_reply = await response.data.reply
            setReply(new_reply)
        }

        getReply({"sync_toggle": sync_toggle}).catch(console.error)
    },[sync_toggle])

    return (
        <Fragment>
            <Header/>
            <TopPanel toggle={toggle} upLoader={up_loader} sync_toggle={sync_toggle} upSync={up_sync}/>
            <Content toggle={toggle} reply={reply}/>
        </Fragment>
    );
}

export default App;