import React from 'react';
import PathFindingVisualizer from './PathFindingVisualizer/PathFindingVisualizer';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import './App.css';


function App() {
  return (
    <div>
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route path="/" exact component={PathFindingVisualizer} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
