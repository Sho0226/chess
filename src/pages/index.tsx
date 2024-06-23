import styles from './index.module.css';
import { useState } from 'react';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const directions = [
    [0, 1], // Down
    [1, 1], // Down-right
    [1, 0], // Right
    [1, -1], // Up-right
    [0, -1], // Up
    [-1, -1], // Up-left
    [-1, 0], // Left
    [-1, 1], // Down-left
  ];

  const newBoard = structuredClone(board);
  const clickHandler = (x: number, y: number) => {
    if (board[y][x] !== 0) return;
    for (const direct of directions) {
      const [x_d, y_d] = direct;

      for (let i = 1; i < 8; i++) {
        if (
          board[y + y_d * i] !== undefined &&
          board[y + y_d * i][x + x_d * i] !== undefined &&
          board[y + y_d][x + x_d] !== 0 &&
          board[y + y_d][x + x_d] === 3 - turnColor
        ) {
          if (board[y + y_d * i][x + x_d * i] === turnColor) {
            Array.from({ length: i + 1 }, (_, s) => {
              newBoard[y + y_d * s][x + x_d * s] = turnColor;
            });
            newBoard[y + y_d * i][x + x_d * i] = turnColor;
            setTurnColor(3 - turnColor);
            setBoard(newBoard);

            break;
          }
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.boardstyle}>
        {board.map((row, y) =>
          row.map((color, x) => {
            const isEven = (y + x) % 2 === 0;
            const cellStyle = {
              backgroundColor: isEven ? '#f7c899' : '#ca8745',
            };
            return (
              <div
                className={styles.cellstyle}
                key={`${x}-${y}`}
                onClick={() => clickHandler(x, y)}
              >
                {color !== 0 && (
                  <div
                    className={`${styles.stonestyle} ${color === 3 ? styles.blue : ''}`}
                    style={{ background: color === 1 ? '#000' : color === 2 ? '#fff' : '#00f' }}
                  />
                )}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
};

export default Home;
