import './App.css';
import React, { useEffect, useState } from 'react';
import { walk as bishopWalk } from './pieces/bishop/bishop';
import { walk as knightWalk } from './pieces/knight/knight'
import { walk as rookWalk } from './pieces/rook/rook'
import { BoardProps, StringBoard } from './board/StringBoard';
import { WalkFunction } from './pieces/types';

const BISHOP_ALGORITHM = "bishop"
const ROOK_ALGORITHM = "rook"
const KNIGHT_ALGORITHM = "knight"

function App() {
  const [boardHeight, setBoardHeight] = useState(9);
  const [boardWidth, setBoardWidth] = useState(17);
  const [input, setInput] = useState("test input")
  const [algorithm, setAlgorithm] = useState(BISHOP_ALGORITHM);

  const [walkFunction, setWalkFunction] = useState<WalkFunction>(() => bishopWalk)
  const [stringBoardProps, setStringBoardProps] = useState<BoardProps>({
    height: boardHeight,
    width: boardWidth,
    paths: [[]]
  })

  useEffect(() => {
    if(algorithm === BISHOP_ALGORITHM) {
      setWalkFunction(() => bishopWalk)
    } else if(algorithm === ROOK_ALGORITHM) {
      setWalkFunction(() => rookWalk)
    } else if(algorithm === KNIGHT_ALGORITHM) {
      setWalkFunction(() => knightWalk)
    }
  }, [algorithm])

  useEffect(() => {
    console.log(walkFunction)
    const walkResult = walkFunction({ boardHeight, boardWidth, input })
    setStringBoardProps({ height: boardHeight, width: boardWidth, paths: [walkResult] })
  }, [boardHeight, boardWidth, input, walkFunction])

  return (
    <div className="App">
      <div>
        <input value={input} onChange={(event) => setInput(event.target.value)} />
      </div>
      <div>
        <label>Select walk algorithm</label>
        <select value={algorithm} onChange={event => setAlgorithm(event.target.value)}>
          <option value={BISHOP_ALGORITHM}>Bishop</option>
          <option value={KNIGHT_ALGORITHM}>Knight</option>
          <option value={ROOK_ALGORITHM}>Rook</option>
        </select>
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
