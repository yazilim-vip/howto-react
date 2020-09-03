import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import WebFont from 'webfontloader';

ReactDOM.render(<App />, document.getElementById('root'));

WebFont.load({
    google: {
      families: ['Lato', 'Ubuntu']
    }
 });