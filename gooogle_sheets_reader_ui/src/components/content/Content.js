import {Container} from "reactstrap";
import SheetTable from "../sheettable/SheetTable";

const Content = ({toggle}) => {
    return (
        toggle ? (
            <Container style={{marginTop: "20px"}}>
                <SheetTable/>
            </Container>
            ) : (
             <Container style={{marginTop: "20px"}}>
               <div className="d-flex justify-content-center">
                    <span className="fw-bold">Загрузка данных отключена.</span>
               </div>
            </Container>
        )
    )
}

export default Content;