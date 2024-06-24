import styles from './index.module.css';
import { useState } from 'react';
import SampleImage from '../assets/images/1b.png';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 4, 3, 0],
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

  const getImageSrc = (color: number) => {
    switch (color) {
      case 1:
        return turnColor === 1 ? oneWhite : oneBlack;
      case 2:
        return turnColor === 1 ? twoWhite : twoBlack;
      case 3:
        return turnColor === 1 ? threeWhite : threeBlack;
      case 4:
        return turnColor === 1 ? fourWhite : fourBlack;
      case 5:
        return turnColor === 1 ? fiveWhite : fiveBlack;
      case 6:
        return turnColor === 1 ? sixWhite : sixBlack;
      default:
        return '';
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
            let content = null;
            if (color !== 0) {
              content = <img className={styles.imgstyle} src={SampleImage.src} alt="1b.png" />;
            }

            return (
              <div
                className={styles.cellstyle}
                style={cellStyle}
                key={`${x}-${y}`}
                onClick={() => clickHandler(x, y)}
              >
                {content}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
};

export default Home;
