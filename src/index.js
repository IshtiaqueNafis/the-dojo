import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./Redux/ConfigureStore";

ReactDOM.render(
<Provider store={store}>
    
    <App />
</Provider>
 ,
  document.getElementById('root')
);