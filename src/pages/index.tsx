import styles from './index.module.css';
import { useState } from 'react';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [1, 1, 0, 0, 0, 0, 0, 0],
    [2, 2, 0, 0, 0, 0, 0, 0],
    [3, 3, 3, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [whitePassCount, setWhitePassCount] = useState(0);
  const [blackPassCount, setBlackPassCount] = useState(0);

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

  const colorNum = (col: number) => newBoard.flat().filter((c) => c === col).length;
  const newBoard = structuredClone(board);
  const removeCandidates = (board: number[][]) => {
    return board.map((row) => row.map((cell) => (cell === 3 ? 0 : cell)));
  };

  const clickHandler = (x: number, y: number) => {
    if (
      colorNum(1) === 0 ||
      colorNum(2) === 0 ||
      colorNum(1) + colorNum(2) === 64 ||
      blackPassCount === 2 ||
      whitePassCount === 2 ||
      newBoard[y][x] === 0
      //return がおかしい？
      //レンダリングが複数？
    )
      return;

    const assist = () => {
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (newBoard[i][j] === 0) {
            for (const direction of directions) {
              const [x1, y1] = direction;
              for (let k = 1; k < 8; k++) {
                const newX = j + x1 * k;
                const newY = i + y1 * k;

                if (newBoard[newY] !== undefined && newBoard[newY][newX] !== undefined) {
                  if (newBoard[newY][newX] === 0) {
                    break;
                  } else if (newBoard[newY][newX] === 3) {
                    break;
                  } else if (newBoard[newY][newX] === turnColor) {
                    if (k > 1) {
                      if (newBoard[newY][newX] === newBoard[i + y1][j + x1]) {
                        break;
                      } else {
                        newBoard[i][j] = 3;

                        break;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    for (let a = 0; a < 8; a++) {
      for (let b = 0; b < 8; b++) {
        if (board[b][a] === 3) {
          newBoard[b][a] = 0;
        }
      }
    }

    if (board[y][x] === 3) {
      for (const direction of directions) {
        const [x1, y1] = direction;

        for (let i = 1; i < 8; i++) {
          if (board[y + y1 * i] !== undefined && board[y + y1 * i][x + x1 * i] !== undefined) {
            if (board[y + y1 * i][x + x1 * i] === 0) {
              break;
            } else if (board[y + y1 * i][x + x1 * i] === 3) {
              break;
            } else if (board[y + y1 * i][x + x1 * i] === turnColor) {
              if (i > 1) {
                if (board[y + y1 * i][x + x1 * i] === board[y + y1][x + x1]) {
                  break;
                } else {
                  for (let s = i; s >= 0; s--) {
                    newBoard[y + y1 * s][x + x1 * s] = turnColor;
                  }
                  setTurnColor(3 - turnColor);
                  setBoard(newBoard);
                  break;
                }
              }
            }
          }
        }
      }
    }

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (newBoard[i][j] === 0) {
          for (const direction of directions) {
            const [x1, y1] = direction;
            for (let k = 1; k < 8; k++) {
              const newX = j + x1 * k;
              const newY = i + y1 * k;

              if (newBoard[newY] !== undefined && newBoard[newY][newX] !== undefined) {
                if (newBoard[newY][newX] === 0) {
                  break;
                } else if (newBoard[newY][newX] === 3) {
                  break;
                } else if (newBoard[newY][newX] === 3 - turnColor) {
                  if (k > 1) {
                    if (newBoard[newY][newX] === newBoard[i + y1][j + x1]) {
                      break;
                    } else {
                      newBoard[i][j] = 3;
                      break;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    console.log(colorNum(3));

    if (colorNum(3) === 0) {
      setTurnColor(turnColor);
      assist();
      if (turnColor === 2) {
        setBlackPassCount(blackPassCount + 1);
      }
      if (turnColor === 1) {
        setWhitePassCount(whitePassCount + 1);
      }
    }
    console.table(newBoard);
  };
  if (
    colorNum(1) === 0 ||
    colorNum(2) === 0 ||
    colorNum(1) + colorNum(2) === 64 ||
    blackPassCount === 2 ||
    whitePassCount === 2
  ) {
    setBoard(removeCandidates(newBoard));
  }

  return (
    <div className={styles.container}>
      <>
        <span className={styles.textlarge}>
          black {colorNum(1)} / white {colorNum(2)}
        </span>

        <br />
        {colorNum(1) !== 0 &&
          colorNum(2) !== 0 &&
          colorNum(1) + colorNum(2) !== 64 &&
          blackPassCount < 2 &&
          whitePassCount < 2 && (
            <span className={styles.textlarge}>
              {colorNum(0) === 0 || colorNum(3) === 0
                ? ''
                : ['', '黒のターン', '白のターン'][turnColor]}
            </span>
          )}
      </>

      {colorNum(1) === 0 ? (
        <span className={styles.text}>黒の負け</span>
      ) : colorNum(2) === 0 ? (
        <span className={styles.text}>白の負け</span>
      ) : colorNum(1) + colorNum(2) === 64 ? (
        colorNum(1) > colorNum(2) ? (
          <span className={styles.text}>黒の勝ち</span>
        ) : (
          <span className={styles.text}>白の勝ち</span>
        )
      ) : blackPassCount === 2 ? (
        <span className={styles.text}>黒の負け</span>
      ) : whitePassCount === 2 ? (
        <span className={styles.text}>白の負け</span>
      ) : null}
      {blackPassCount === 1 ? <span className={styles.text}>黒が1回パスしました</span> : ''}
      {whitePassCount === 1 ? <span className={styles.text}>白が1回パスしました</span> : ''}

      <div className={styles.boardstyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellstyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={`${styles.stonestyle} ${color === 3 ? styles.blue : ''}`}
                  style={{ background: color === 1 ? '#000' : color === 2 ? '#fff' : '#00f' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
