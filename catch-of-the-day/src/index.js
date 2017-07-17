import React from 'react';
import { render } from 'react-dom';
// Approach above allows us to import a single method from ReactDOM since we don't need the whole package.
// import ReactDOM from 'react-dom';
import './css/style.css'

import StorePicker from './components/StorePicker';

render(<StorePicker/>, document.querySelector('#main'));