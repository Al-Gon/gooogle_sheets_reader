import React from 'react'
import Checkbox from '../common/Checkbox'
import SyncCheckbox  from '../common/SyncCheckbox'

function TopPanel({toggle, upLoader, sync_toggle, upSync}) {
    return (
        <toppanel className="container-fluid">
            <div className="d-flex flex-row justify-content-around" >

                <SyncCheckbox sync_toggle={sync_toggle} upSync={upSync}/>
                <Checkbox toggle={toggle} upLoader={upLoader}/>

            </div>
        </toppanel>
    )
}

export default TopPanel