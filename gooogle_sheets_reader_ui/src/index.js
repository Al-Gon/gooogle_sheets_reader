import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'

export const API_URL_1 = "http://127.0.0.1:8000/google_sheet_reader/api/sheet/"
export const API_URL_2 = "http://127.0.0.1:8000/google_sheet_reader/api/sync/"
export const API_STATIC_MEDIA = "http://127.0.0.1:8000/"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

reportWebVitals();
