import React from 'react'
import Checkbox from '../common/Checkbox'

function TopPanel({toggle, upLoader}) {
    return (
        <toppanel className="container">
            <div className="d-flex flex-row justify-content-end" >
                <div className="col-4">
                <Checkbox toggle={toggle} upLoader={upLoader}/>
                </div>
            </div>
        </toppanel>
    )
}

export default TopPanel