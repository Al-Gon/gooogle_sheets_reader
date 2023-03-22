import {Table} from "reactstrap";

const SheetRows = (props) => {
    const {sheet_rows} = props
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
            {!sheet_rows || sheet_rows.length <= 0 ? (
                <tr>
                    <td colSpan="6" align="center">
                        <b>Пока в таблице ничего нет</b>
                    </td>
                </tr>
            ) : sheet_rows.map(sheet_row => (
                        <tr key={sheet_row.pk}>
                            <td>{sheet_row.pos_index}</td>
                            <td>{sheet_row.order}</td>
                            <td>{sheet_row.price_usd}</td>
                            <td>{sheet_row.price_rub}</td>
                            <td>{sheet_row.format_delivery_date}</td>
                        </tr>
                )
            )}
            </tbody>
        </Table>
    )
}

export default SheetRows