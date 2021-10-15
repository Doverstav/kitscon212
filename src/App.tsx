import "./App.css";
import React, { useEffect, useState } from "react";
import { bishopWalk } from "./pieces/bishop/bishop";
import { knightWalk } from "./pieces/knight/knight";
import { rookWalk } from "./pieces/rook/rook";
import { kingWalk } from "./pieces/king/king";
import { hash, HashingAlgorithm } from "./pieces/helpers";
import { BoardProps, StringBoard } from "./board/StringBoard";
import { WalkFunction } from "./pieces/types";
import { CanvasBoard } from "./board/CanvasBoard";
import { MD5, SHA256, SHA512 } from "./pieces/helpers";

const BISHOP_ALGORITHM = "bishop";
const ROOK_ALGORITHM = "rook";
const KNIGHT_ALGORITHM = "knight";
const KING_ALGORITHM = "king";

function App() {
  const [boardHeight, setBoardHeight] = useState(9);
  const [boardWidth, setBoardWidth] = useState(17);
  const [input, setInput] = useState("kitscon");
  const [algorithm, setAlgorithm] = useState(BISHOP_ALGORITHM);
  const [hashingAlgoritm, sethashingAlgorithm] =
    useState<HashingAlgorithm>(MD5);

  const [walkFunction, setWalkFunction] = useState<WalkFunction>(
    () => bishopWalk
  );
  const [stringBoardProps, setStringBoardProps] = useState<BoardProps>({
    height: boardHeight,
    width: boardWidth,
    paths: [[]],
  });

  useEffect(() => {
    if (algorithm === BISHOP_ALGORITHM) {
      setWalkFunction(() => bishopWalk);
    } else if (algorithm === ROOK_ALGORITHM) {
      setWalkFunction(() => rookWalk);
    } else if (algorithm === KNIGHT_ALGORITHM) {
      setWalkFunction(() => knightWalk);
    } else if (algorithm === KING_ALGORITHM) {
      setWalkFunction(() => kingWalk);
    }
  }, [algorithm]);

  useEffect(() => {
    const walkResult = walkFunction({
      boardHeight,
      boardWidth,
      input: hash(input, hashingAlgoritm),
    });
    setStringBoardProps({
      height: boardHeight,
      width: boardWidth,
      paths: [walkResult],
    });
  }, [boardHeight, boardWidth, input, hashingAlgoritm, walkFunction]);

  return (
    <div className="App">
      <h1 className="big-header">KitsCon 21.2</h1>
      <div className="input-container">
        <label className="input-label">Input to be hashed</label>
        <input
          className="input-element"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </div>
      <div className="input-container">
        <label className="input-label">Select walk algorithm</label>
        <select
          className="input-element"
          value={algorithm}
          onChange={(event) => setAlgorithm(event.target.value)}
        >
          <option value={BISHOP_ALGORITHM}>Bishop</option>
          <option value={KNIGHT_ALGORITHM}>Knight</option>
          <option value={ROOK_ALGORITHM}>Rook</option>
          <option value={KING_ALGORITHM}>King</option>
        </select>
      </div>
      <div className="input-container">
        <label className="input-label">Select hashing algorithm</label>
        <select
          className="input-element"
          value={hashingAlgoritm}
          onChange={(event) =>
            sethashingAlgorithm(event.target.value as HashingAlgorithm)
          }
        >
          <option value={MD5}>{MD5}</option>
          <option value={SHA256}>{SHA256}</option>
          <option value={SHA512}>{SHA512}</option>
        </select>
      </div>
      <div className="input-container split-input-container">
        <div className="split-input-divider" style={{marginRight: '8px'}}>
          <label className="input-label">Height</label>
          <input
            className="input-element"
            type="number"
            value={boardHeight}
            min={1}
            onChange={(event) => setBoardHeight(Number(event.target.value))}
          />
        </div>
        <div className="split-input-divider" style={{marginLeft: '8px'}}>
          <label className="input-label">Width</label>
          <input
            className="input-element"
            type="number"
            value={boardWidth}
            min={1}
            onChange={(event) => setBoardWidth(Number(event.target.value))}
          />
        </div>
      </div>
      <div className="input-container">
        
      </div>
      <CanvasBoard {...stringBoardProps} />
      <StringBoard {...stringBoardProps} />
    </div>
  );
}

export default App;
