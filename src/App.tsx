import './App.css';
import React, { useEffect, useState } from 'react';
import { walk } from './pieces/bishop/bishop';
import { Path } from './pieces/types';
import { BoardProps, StringBoard } from './board/StringBoard';

function App() {
  const [boardHeight, setBoardHeight] = useState(9);
  const [boardWidth, setBoardWidth] = useState(17);
  const [input, setInput] = useState("test input")
  const [stringBoardProps, setStringBoardProps] = useState<BoardProps>({
    height: boardHeight,
    width: boardWidth,
    paths: [[]]
  })

  useEffect(() => {
    const walkResult = walk({ boardHeight, boardWidth, input })
    setStringBoardProps({ height: boardHeight, width: boardWidth, paths: [walkResult] })
  }, [boardHeight, boardWidth, input])

  return (
    <div className="App">
      <div>
        <input value={input} onChange={(event) => setInput(event.target.value)} />
      </div>
      <div>
        <label>Height</label>
        <input
          type="number"
          value={boardHeight}
          min={1}
          onChange={(event) => setBoardHeight(Number(event.target.value))}
        />
      </div>
      <div>
        <label>Width</label>
        <input
          type="number"
          value={boardWidth}
          min={1}
          onChange={(event) => setBoardWidth(Number(event.target.value))}
        />
      </div>

      <StringBoard {...stringBoardProps} />
    </div>
  );
}

export default App;
