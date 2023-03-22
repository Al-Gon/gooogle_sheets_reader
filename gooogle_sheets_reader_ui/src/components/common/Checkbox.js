import React from 'react'

function Checkbox ({toggle, upLoader}) {
    return (
        <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="switch"
            onClick={upLoader}/>
            { toggle ? (
            <label className="form-check-label fw-bold" htmlFor="switch">
                Остановить загрузку.
            </label>
            ) : (
            <label className="form-check-label fw-bold" htmlFor="switch">
                Запустить загрузку.
            </label>
            )
            }
        </div>
    )
}

export default Checkbox