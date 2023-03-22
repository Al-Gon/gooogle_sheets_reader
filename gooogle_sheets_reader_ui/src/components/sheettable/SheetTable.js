import {Row, Col} from "reactstrap";
import SheetRows from "../sheetrows/SheetRows";
import axios from "axios";
import {useEffect, useState} from "react";
import {API_URL} from "../../index";

const SheetTable = () => {
    const [sheet_rows, setSheetRows] = useState([])
    const [value, setValue] = useState(1)

    setTimeout( () => {
       setValue(value? 0: 1)}, 3000)

    useEffect(()=>{
        getSheetRows()
    },[value])

    const getSheetRows = ()=>{
        axios.get(API_URL).then(data => setSheetRows(data.data))
    }

    return (

        <Row>
            <Col>
                <SheetRows sheet_rows={sheet_rows} />
            </Col>
        </Row>

    )
}

export default SheetTable;