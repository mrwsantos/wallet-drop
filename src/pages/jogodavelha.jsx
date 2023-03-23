import React, { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [currentPlayer, setCurrentPlayer] = useState("X");

  const [winner, setWinner] = useState(null);

  const handleCellClick = (row, col) => {
    if (board[row][col] !== "" || winner) {
      return;
    }

    let newBoard = [...board];
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    checkForWinner();

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkForWinner = () => {
    let winner = null;
    // check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2] &&
        board[i][0] !== ""
      ) {
        winner = board[i][0];
      }
    }

    // check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i] &&
        board[0][i] !== ""
      ) {
        winner = board[0][i];
      }
    }

    // check diagonals
    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== ""
    ) {
      winner = board[0][0];
    }

    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] !== ""
    ) {
      winner = board[0][2];
    }

    if (winner) {
      setWinner(winner);
    }
  };

  return (
    <div className="game-container">
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex} style={{border: '1px solid',width: '40px', height: '40px'}}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  onClick={() => handleCellClick(rowIndex, cellIndex)}
                  style={{border: '1px solid',width: '40px', height: '40px', textAlign: 'center', verticalAlign: 'center'}}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {winner && <div className="winner">Player {winner} won!</div>}
    </div>
  );
};

export default TicTacToe;
