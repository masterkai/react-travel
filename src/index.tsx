import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import "./i18n/configs"
import {Provider} from 'react-redux'
import rootStore from './redux/store'
import {PersistGate} from "redux-persist/integration/react"
import {Spin} from 'antd'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={rootStore.store}>
            <PersistGate loading={<Spin/>} persistor={rootStore.persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

