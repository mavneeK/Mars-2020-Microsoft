import React from 'react';
import PathFindingVisualizer from './PathFindingVisualizer/PathFindingVisualizer';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import TicTacToe from './TicTacToe/TicTacToe'

function App() {
  return (
    <div>
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route path="/" exact component={PathFindingVisualizer} />
            <Route path="/tictactoe" exact component={TicTacToe} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
