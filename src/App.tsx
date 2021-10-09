import './App.css';
import React, { useEffect, useState } from 'react';
import { bishopWalk } from './pieces/bishop/bishop';
import { knightWalk } from './pieces/knight/knight'
import { rookWalk } from './pieces/rook/rook'
import { kingWalk } from './pieces/king/king'
import { BoardProps, StringBoard } from './board/StringBoard';
import { WalkFunction } from './pieces/types';
import { CanvasBoard } from './board/CanvasBoard';

const BISHOP_ALGORITHM = "bishop"
const ROOK_ALGORITHM = "rook"
const KNIGHT_ALGORITHM = "knight"
const KING_ALGORITHM = "king"

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
    } else if(algorithm === KING_ALGORITHM) {
      setWalkFunction(() => kingWalk)
    }
  }, [algorithm])

  useEffect(() => {
    const walkResult = walkFunction({ boardHeight, boardWidth, input })
    setStringBoardProps({ height: boardHeight, width: boardWidth, paths: [walkResult] })
  }, [boardHeight, boardWidth, input, walkFunction])

  return (
    <div className="App">
      <div>
        <label>Input to be hashed</label>
        <input value={input} onChange={(event) => setInput(event.target.value)} />
      </div>
      <div>
        <label>Select walk algorithm</label>
        <select value={algorithm} onChange={event => setAlgorithm(event.target.value)}>
          <option value={BISHOP_ALGORITHM}>Bishop</option>
          <option value={KNIGHT_ALGORITHM}>Knight</option>
          <option value={ROOK_ALGORITHM}>Rook</option>
          <option value={KING_ALGORITHM}>King</option>
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
      <CanvasBoard {...stringBoardProps}/>
    </div>
  );
}

export default App;
