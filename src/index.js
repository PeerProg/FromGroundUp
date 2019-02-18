import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faEdit,
  faTrashAlt,
  faPlusCircle,
  faCircle,
  faCheckCircle,
  faTimesCircle,
  faMinusCircle
} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

library.add(
  fab,
  faEdit,
  faTrashAlt,
  faPlusCircle,
  faCircle,
  faCheckCircle,
  faTimesCircle,
  faMinusCircle
);

ReactDOM.render(<App />, document.getElementById('root'));
