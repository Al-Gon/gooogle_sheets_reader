import {Container, Row, Col} from "reactstrap";
import SheetRows from "../sheetrows/SheetRows";
import axios from "axios";
import {useEffect, useState} from "react";
import {API_URL} from "../../index";

const Home = () => {
    const [sheetrows, setSheetRows] = useState([])
    const [value, setValue] = useState(1)

    setTimeout( () => {
       setValue(value? 0: 1)}, 3000)

    useEffect(()=>{
        getSheetRows()
    },[value])

    const getSheetRows = (data)=>{
        axios.get(API_URL).then(data => setSheetRows(data.data))
    }

    return (
        <Container style={{marginTop: "20px"}}>
            <Row>
                <Col>
                    <SheetRows sheetrows={sheetrows} />
                </Col>
            </Row>

        </Container>
    )
}

export default Home;