import React from 'react'

function Checkbox ({toggle, upLoader}) {
    return (
        <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="switch_2"
            onClick={upLoader}/>
            { toggle ? (
            <label className="form-check-label fw-bold" htmlFor="switch_2">
                Остановить загрузку из Базы Данных.
            </label>
            ) : (
            <label className="form-check-label fw-bold" htmlFor="switch_2">
                Запустить загрузку из Базы Данных.
            </label>
            )
            }
        </div>
    )
}

export default Checkbox