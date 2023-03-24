import {Container} from "reactstrap";
import SheetTable from "../sheettable/SheetTable";

const Content = ({toggle, reply}) => {
    return (
        <Container style={{marginTop: "20px"}}>
            <div className="d-flex justify-content-center">
                <span className="fw-bold">{reply}</span>
            </div>
            <div style={{marginTop: "20px"}}>
            {
            toggle ? (
                <SheetTable/>
            ) : (
               <div className="d-flex justify-content-center">
                    <span className="fw-bold">Загрузка данных отключена.</span>
               </div>
            )
            }
            </div>

        </Container>
    )
}

export default Content;