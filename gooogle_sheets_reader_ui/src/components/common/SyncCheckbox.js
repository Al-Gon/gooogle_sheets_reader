import React from 'react'


function SyncCheckbox ({sync_toggle, upSync}) {
    return (
        <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="switch_1"
            onClick={upSync}/>
            { sync_toggle === "start" ? (
            <label className="form-check-label fw-bold" htmlFor="switch_1">
                Отключить синхронизацию БД с таблицей GOOGLE.
            </label>
            ) : (
            <label className="form-check-label fw-bold" htmlFor="switch_1">
                Включить синхронизацию БД с таблицей GOOGLE.
            </label>
            )
            }
        </div>
    )
}

export default SyncCheckbox