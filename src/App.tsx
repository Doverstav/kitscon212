import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { walk } from './pieces/bishop/bishop';
import { Path } from './pieces/types';
import { StringBoard } from './board/StringBoard';

function App() {
  const [walkResult, setWalkResult] = useState<Path>([]);
  const boardHeight = 9;
  const boardWidth = 17;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => setWalkResult(walk({ boardHeight, boardWidth, input: "and yet!" }))}>walk</button>
        <StringBoard height={boardHeight} width={boardWidth} paths={[walkResult]} />
      </header>
    </div>
  );
}

export default App;
