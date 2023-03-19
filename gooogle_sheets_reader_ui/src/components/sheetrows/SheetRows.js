import {Table} from "reactstrap";

const SheetRows = (props) => {
    const {sheetrows} = props
    return (
        <Table light>
            <thead>
            <tr>
                <th>Номер</th>
                <th>Заказ №</th>
                <th>Стоимость, $</th>
                <th>Стоимость, руб.</th>
                <th>Срок поставки</th>
            </tr>
            </thead>
            <tbody>
            {!sheetrows || sheetrows.length <= 0 ? (
                <tr>
                    <td colSpan="6" align="center">
                        <b>Пока ничего нет</b>
                    </td>
                </tr>
            ) : sheetrows.map(sheetrow => (
                        <tr key={sheetrow.pk}>
                            <td>{sheetrow.pos_index}</td>
                            <td>{sheetrow.order}</td>
                            <td>{sheetrow.price_usd}</td>
                            <td>{sheetrow.price_rub}</td>
                            <td>{sheetrow.format_delivery_date}</td>
                        </tr>
                )
            )}
            </tbody>
        </Table>
    )
}

export default SheetRows