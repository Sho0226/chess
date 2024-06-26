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
  const [turn, setTurn] = useState<'white' | 'black'>('white');
  const [selectedPiece, setSelectedPiece] = useState<{ x: number; y: number } | null>(null);
  const [selectedPieceValue, setSelectedPieceValue] = useState<number | null>(null);
  const [board, setBoard] = useState([
    [-2, -3, -4, -6, -5, -4, -3, -2],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [2, 3, 4, 5, 6, 4, 3, 2],
  ]);

  const resetCandidateMoves = (board: number[][]) => {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === 7) {
          board[row][col] = 0;
        }
      }
    }
  };

  const displayCandidateMoves = (x: number, y: number, board: number[][]) => {
    const piece = board[y][x];
    if (piece === 1 || piece === -1) pawn(x, y, board, piece);
    if (piece === 2 || piece === -2) rook(x, y, piece, board);
    if (piece === 3 || piece === -3) knight(x, y, board);
    if (piece === 4 || piece === -4) bishop(x, y, piece, board);
    if (piece === 5 || piece === -5) king(x, y, board);
    if (piece === 6 || piece === -6) queen(x, y, board);
  };

  const clickHandler = (x: number, y: number) => {
    const newBoard = structuredClone(board);
    const currentTurn = turn === 'white' ? 1 : -1;

    if (selectedPiece) {
      if (newBoard[y][x] === 7 && selectedPieceValue !== null) {
        newBoard[selectedPiece.y][selectedPiece.x] = 0; // 元の位置を0にする
        newBoard[y][x] = selectedPieceValue; // 駒を新しい位置に移動
        setSelectedPiece(null); // 選択をリセット
        setSelectedPieceValue(null); // 駒の値をリセット

        // 移動後に残っている7を消す
        resetCandidateMoves(newBoard);

        // ターンを交代
        setTurn(turn === 'white' ? 'black' : 'white');
      } else {
        // 他の駒が選択された場合、選択状態を更新し候補地をリセット
        resetCandidateMoves(newBoard);
        setSelectedPiece({ x, y });
        setSelectedPieceValue(newBoard[y][x]);
        // 新しい候補地を設定
        displayCandidateMoves(x, y, newBoard);
      }
    } else {
      // 現在のターンの駒でなければ何もしない
      if (
        (currentTurn === 1 && newBoard[y][x] <= 0) ||
        (currentTurn === -1 && newBoard[y][x] >= 0)
      ) {
        return;
      }

      // すべての既存の7を0に置き換え
      resetCandidateMoves(newBoard);

      // 新しい7を設定
      displayCandidateMoves(x, y, newBoard);

      // 駒が選択された状態を保存
      if (newBoard[y][x] !== 0) {
        setSelectedPiece({ x, y });
        setSelectedPieceValue(newBoard[y][x]);
      }
    }

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
        return null; // 画像が存在しない場合は null を返す
    }
  };

  const pawn = (x: number, y: number, board: number[][], piece: number) => {
    if (board[y] !== undefined && board[y][x] !== undefined) {
      if (piece === 1) {
        if (board[y - 1] !== undefined) {
          if (board[y - 1][x] === 0) board[y - 1][x] = 7;
          if (board[y - 1][x - 1] !== undefined && board[y - 1][x - 1] < 0) board[y - 1][x - 1] = 7;
          if (board[y - 1][x + 1] !== undefined && board[y - 1][x + 1] < 0) board[y - 1][x + 1] = 7;
        }
        if (y === 6 && board[y - 2] !== undefined && board[y - 2][x] === 0) board[y - 2][x] = 7;
      } else if (piece === -1) {
        if (board[y + 1] !== undefined) {
          if (board[y + 1][x] === 0) board[y + 1][x] = 7;
          if (board[y + 1][x - 1] !== undefined && board[y + 1][x - 1] > 0) board[y + 1][x - 1] = 7;
          if (board[y + 1][x + 1] !== undefined && board[y + 1][x + 1] > 0) board[y + 1][x + 1] = 7;
        }
        if (y === 1 && board[y + 2] !== undefined && board[y + 2][x] === 0) board[y + 2][x] = 7;
      }
    }
  };

  const rook = (x: number, y: number, z: number, board: number[][]) => {
    if (board[y][x] === z) {
      // 縦方向のチェック
      for (let r = 1; r < 8; r++) {
        if (board[y + r] !== undefined) {
          if (board[y + r][x] === 0) {
            board[y + r][x] = 7;
          } else if (Math.sign(board[y + r][x]) !== Math.sign(z)) {
            board[y + r][x] = 7;
            break; // 敵の駒があればそこまで
          } else {
            break; // 味方の駒があれば貫通しない
          }
        }
      }
      for (let r = 1; r < 8; r++) {
        if (board[y - r] !== undefined) {
          if (board[y - r][x] === 0) {
            board[y - r][x] = 7;
          } else if (Math.sign(board[y - r][x]) !== Math.sign(z)) {
            board[y - r][x] = 7;
            break; // 敵の駒があればそこまで
          } else {
            break; // 味方の駒があれば貫通しない
          }
        }
      }
      // 横方向のチェック
      for (let r = 1; r < 8; r++) {
        if (board[y][x + r] !== undefined) {
          if (board[y][x + r] === 0) {
            board[y][x + r] = 7;
          } else if (Math.sign(board[y][x + r]) !== Math.sign(z)) {
            board[y][x + r] = 7;
            break; // 敵の駒があればそこまで
          } else {
            break; // 味方の駒があれば貫通しない
          }
        }
      }
      for (let r = 1; r < 8; r++) {
        if (board[y][x - r] !== undefined) {
          if (board[y][x - r] === 0) {
            board[y][x - r] = 7;
          } else if (Math.sign(board[y][x - r]) !== Math.sign(z)) {
            board[y][x - r] = 7;
            break; // 敵の駒があればそこまで
          } else {
            break; // 味方の駒があれば貫通しない
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

  const knight = (x: number, y: number, board: number[][]) => {
    for (const k_d of knight_drection) {
      const [y_k, x_k] = k_d;
      if (board[y + y_k] !== undefined && board[y + y_k][x + x_k] !== undefined) {
        if (
          (board[y][x] === 3 || board[y][x] === -3) &&
          (board[y + y_k][x + x_k] === 0 ||
            Math.sign(board[y + y_k][x + x_k]) !== Math.sign(board[y][x]))
        ) {
          board[y + y_k][x + x_k] = 7;
        }
      }
    }
  };

  const bishop = (x: number, y: number, z: number, board: number[][]) => {
    if (board[y][x] === z) {
      for (let b = 1; b < 8; b++) {
        // 右下方向のチェック
        if (board[y + b] !== undefined && board[y + b][x + b] !== undefined) {
          if (board[y + b][x + b] === 0) {
            board[y + b][x + b] = 7;
          } else if (Math.sign(board[y + b][x + b]) !== Math.sign(z)) {
            board[y + b][x + b] = 7;
            break; // 敵の駒があればそこまで
          } else {
            break; // 味方の駒があれば貫通しない
          }
        }
      }
      for (let b = 1; b < 8; b++) {
        // 左上方向のチェック
        if (board[y - b] !== undefined && board[y - b][x - b] !== undefined) {
          if (board[y - b][x - b] === 0) {
            board[y - b][x - b] = 7;
          } else if (Math.sign(board[y - b][x - b]) !== Math.sign(z)) {
            board[y - b][x - b] = 7;
            break; // 敵の駒があればそこまで
          } else {
            break; // 味方の駒があれば貫通しない
          }
        }
      }
      for (let b = 1; b < 8; b++) {
        // 右上方向のチェック
        if (board[y - b] !== undefined && board[y - b][x + b] !== undefined) {
          if (board[y - b][x + b] === 0) {
            board[y - b][x + b] = 7;
          } else if (Math.sign(board[y - b][x + b]) !== Math.sign(z)) {
            board[y - b][x + b] = 7;
            break; // 敵の駒があればそこまで
          } else {
            break; // 味方の駒があれば貫通しない
          }
        }
      }
      for (let b = 1; b < 8; b++) {
        // 左下方向のチェック
        if (board[y + b] !== undefined && board[y + b][x - b] !== undefined) {
          if (board[y + b][x - b] === 0) {
            board[y + b][x - b] = 7;
          } else if (Math.sign(board[y + b][x - b]) !== Math.sign(z)) {
            board[y + b][x - b] = 7;
            break; // 敵の駒があればそこまで
          } else {
            break; // 味方の駒があれば貫通しない
          }
        }
      }
    }
  };

  const king_drection = [
    [1, 1],
    [1, -1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [-1, 1],
    [-1, -1],
    [0, 1],
  ];

  const king = (x: number, y: number, board: number[][]) => {
    if (board[y][x] === 5 || board[y][x] === -5) {
      for (const kg_d of king_drection) {
        const [y_kg, x_kg] = kg_d;
        if (
          board[y + y_kg] !== undefined &&
          board[y + y_kg][x + x_kg] !== undefined &&
          (board[y + y_kg][x + x_kg] === 0 ||
            Math.sign(board[y + y_kg][x + x_kg]) !== Math.sign(board[y][x]))
        ) {
          board[y + y_kg][x + x_kg] = 7;
        }
      }
    }
  };

  const queen = (x: number, y: number, board: number[][]) => {
    rook(x, y, 6, board);
    rook(x, y, -6, board);
    bishop(x, y, 6, board);
    bishop(x, y, -6, board);
  };

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
            const imageSrc = getImageSrc(color)?.src;
            const content =
              color !== 7 && imageSrc !== undefined ? (
                <img className={styles.imgstyle} src={imageSrc} alt="" />
              ) : null;

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
