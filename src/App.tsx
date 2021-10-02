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
      <button onClick={() => setWalkResult(walk({ boardHeight, boardWidth, input: "test input" }))}>walk</button>
      <StringBoard height={boardHeight} width={boardWidth} paths={[walkResult]} />
    </div>
  );
}

export default App;
