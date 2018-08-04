import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


registerServiceWorker();

setInterval(function(){ReactDOM.render(<App />, document.getElementById('root'))}, 1000);

