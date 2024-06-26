import styles from './index.module.css';
import { useState } from 'react';
import oneBlack from '../assets/images/1b.png';
import oneWhite from '../assets/images/1w.png';
import twoBlack from '../assets/images/2b.png';
import twoWhite from '../assets/images/2w.png';
import threeBlack from '../assets/images/3b.png';
import threeWhite from '../assets/images/3w.png';
import fourBlack from '../assets/images/4b.png';
import fourWhite from '../assets/images/4w.png';
import fiveBlack from '../assets/images/5b.png';
import fiveWhite from '../assets/images/5w.png';
import sixBlack from '../assets/images/6b.png';
import sixWhite from '../assets/images/6w.png';

const Home = () => {
  const [turn, setTurn] = useState(1);
  const [chess, setChess] = useState();
  const [board, setBoard] = useState([
    [-2, -3, -4, -6, -5, -4, -3, -2],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 3, 4, 5, 6, 4, 3, 2],
  ]);

  const newBoard = structuredClone(board);
  const clickHandler = (x: number, y: number) => {
    pawn(x, y);
    rook(x, y);
    knight(x, y);
    bishop(x, y);
    setBoard(newBoard);
  };

  const getImageSrc = (color: number) => {
    switch (color) {
      case 1:
        return oneWhite;
      case 2:
        return twoWhite;
      case 3:
        return threeWhite;
      case 4:
        return fourWhite;
      case 5:
        return fiveWhite;
      case 6:
        return sixWhite;
      case -1:
        return oneBlack;
      case -2:
        return twoBlack;
      case -3:
        return threeBlack;
      case -4:
        return fourBlack;
      case -5:
        return fiveBlack;
      case -6:
        return sixBlack;
      default:
        return;
    }
  };

  const pawn = (x: number, y: number) => {
    if (board[y] !== undefined) {
      if (board[y][x] !== undefined) {
        if (board[y][x] === 1) {
          newBoard[y - 2][x] = 7;
          newBoard[y - 1][x] = 7;
        }
      }
    }
  };

  const rook = (x: number, y: number) => {
    for (let r = 1; r < 8; r++) {
      if (board[y][x] === 2) {
        // 縦方向のチェック
        if (y + r < 8 && board[y + r] !== undefined) {
          if (board[y + r][x] === 0) {
            newBoard[y + r][x] = 7;
          }
        }
        if (y - r >= 0 && board[y - r] !== undefined) {
          if (board[y - r][x] === 0) {
            newBoard[y - r][x] = 7;
          }
        }
        // 横方向のチェック
        if (x + r < 8 && board[y][x + r] !== undefined) {
          if (board[y][x + r] === 0) {
            newBoard[y][x + r] = 7;
          }
        }
        if (x - r >= 0 && board[y][x - r] !== undefined) {
          if (board[y][x - r] === 0) {
            newBoard[y][x - r] = 7;
          }
        }
      }
    }
  };

  const knight_drection = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ];

  const knight = (x: number, y: number) => {
    for (const k_d of knight_drection) {
      const [y_k, x_k] = k_d;
      if (board[y + y_k] !== undefined) {
        if (board[y + y_k][x + x_k] !== undefined) {
          if (board[y][x] === 3) {
            newBoard[y + y_k][x + x_k] = 7;
          }
        }
      }
    }
  };

  const bishop = (x: number, y: number) => {
    for (let b = 1; b < 8; b++) {
      if (board[y][x] === 4) {
        // 縦方向のチェック
        if (
          y + b < 8 &&
          board[y + b] !== undefined &&
          x + b < 8 &&
          board[y + b][x + b] !== undefined
        ) {
          if (board[y + b][x + b] === 0 || board[y + b][x + b] === 7) {
            newBoard[y + b][x + b] = 7;
          }
        }
        if (
          y - b >= 0 &&
          board[y - b] !== undefined &&
          x - b >= 0 &&
          board[y - b][x - b] !== undefined
        ) {
          if (board[y - b][x - b] === 0 || board[y - b][x - b] === 7) {
            newBoard[y - b][x - b] = 7;
          }
        }
        // 横方向のチェック
        if (
          y + b < 8 &&
          board[y + b] !== undefined &&
          x - b >= 0 &&
          board[y + b][x - b] !== undefined
        ) {
          if (board[y + b][x - b] === 0 || board[y + b][x - b] === 7) {
            newBoard[y + b][x - b] = 7;
          }
          if (
            y - b >= 0 &&
            board[y - b] !== undefined &&
            x + b < 8 &&
            board[y - b][x + b] !== undefined
          ) {
            if (board[y - b][x + b] === 0 || board[y - b][x + b] === 7) {
              newBoard[y - b][x + b] = 7;
            }
          }
        }
      }
    }
  };

  // const chessmoves = (x: number, y: number) => {
  //   if (board[y] !== undefined) {
  //     if (board[y][x] !== undefined) {
  //       if (board[y][x] === 2) {
  //         newBoard[y][x] = 0;
  //         newBoard[y - 2][x] = 1;
  //       }
  //     }
  //   }
  // };
  const cellSize = 80; // セルのサイズを定義

  return (
    <div className={styles.container}>
      <div className={styles.boardstyle}>
        {board.map((row, y) =>
          row.map((color, x) => {
            const isEven = (y + x) % 2 === 0;
            const cellStyle = {
              backgroundColor: isEven ? '#f7c899' : '#ca8745',
              width: `${cellSize / 6.4}%`,
              height: `${cellSize / 6.4}%`,
            };
            const imageSrc = getImageSrc(color)?.src; // 画像ソースの取得
            const content =
              color !== 7 ? <img className={styles.imgstyle} src={imageSrc} alt="" /> : null; // 画像コンテンツ

            return (
              <div
                className={styles.cellstyle}
                style={cellStyle}
                key={`${x}-${y}`}
                onClick={() => clickHandler(x, y)}
              >
                {color === 7 ? (
                  <div className={styles.spinnerBox} style={{ width: cellSize, height: cellSize }}>
                    <div
                      className={styles.configureBorder1}
                      style={{ width: cellSize * 0.4, height: cellSize * 0.4 }}
                    >
                      <div
                        className={`${styles.configure1}  ${styles.configure4}`}
                        style={{ width: cellSize * 0.4, height: cellSize * 0.4 }}
                      />
                    </div>
                    <div
                      className={styles.configureBorder2}
                      style={{ width: cellSize * 0.4, height: cellSize * 0.4 }}
                    >
                      <div
                        className={`${styles.configure2}  ${styles.configure3}`}
                        style={{ width: cellSize * 0.4, height: cellSize * 0.4 }}
                      />
                    </div>
                  </div>
                ) : null}
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
