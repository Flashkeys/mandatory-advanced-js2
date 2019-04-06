import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Add from './Add.jsx';
import Details from './Details.jsx';
import Home from './Home.jsx';
import Edit from './Edit.jsx';
import NotFound from './NotFound.jsx';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/Edit" component={Edit} />
      <Route path="/Add" component={Add} />
      <Route path="/Details" component={Details} />
      <Route component={NotFound} />
    </Switch>
  </Router>
  , document.getElementById('root')); 