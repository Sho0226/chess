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
  type CellType = {
    piece: number;
    isCandidate: boolean;
    isCapture: boolean;
    z: number;
  };

  type BoardType = CellType[][];

  const initializeBoard = (): BoardType => {
    const pieces = [
      [-2, -3, -4, -6, -5, -4, -3, -2],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [2, 3, 4, 5, 6, 4, 3, 2],
    ];

    return Array(8)
      .fill(null)
      .map((_, y) =>
        Array(8)
          .fill(null)
          .map((_, x) => ({
            piece: pieces[y][x],
            isCandidate: false,
            isCapture: false,
            z: 0,
          })),
      );
  };

  const [turn, setTurn] = useState<'white' | 'black'>('white');
  const [selectedPiece, setSelectedPiece] = useState<{ x: number; y: number } | null>(null);
  const [selectedPieceValue, setSelectedPieceValue] = useState<number | null>(null);
  const [board, setBoard] = useState<BoardType>(initializeBoard);

  const resetCandidateMoves = (board: BoardType) => {
    for (const row of board) {
      for (const cell of row) {
        cell.isCandidate = false;
        cell.isCapture = false; // isCapture もリセット
      }
    }
  };

  const displayCandidateMoves = (x: number, y: number, board: BoardType) => {
    const piece = board[y][x].piece;
    const z = board[y][x].z;
    if (piece === 1 || piece === -1) pawn(x, y, board, piece);
    if (piece === 2 || piece === -2) rook(x, y, z, board);
    if (piece === 3 || piece === -3) knight(x, y, board);
    if (piece === 4 || piece === -4) bishop(x, y, z, board);
    if (piece === 5 || piece === -5) king(x, y, board);
    if (piece === 6 || piece === -6) queen(x, y, board);
  };

  const clickHandler = (x: number, y: number) => {
    const newBoard = structuredClone(board);
    const currentTurn = turn === 'white' ? 1 : -1;

    if (selectedPiece) {
      if (newBoard[y][x].isCandidate && selectedPieceValue !== null) {
        newBoard[selectedPiece.y][selectedPiece.x].piece = 0; // 元の位置を0にする
        newBoard[y][x].piece = selectedPieceValue; // 駒を新しい位置に移動
        setSelectedPiece(null); // 選択をリセット
        setSelectedPieceValue(null); // 駒の値をリセット

        // 移動後に残っている候補地を消す
        resetCandidateMoves(newBoard);

        // ターンを交代
        setTurn(turn === 'white' ? 'black' : 'white');
      } else {
        // 他の駒が選択された場合、選択状態を更新し候補地をリセット
        resetCandidateMoves(newBoard);
        setSelectedPiece({ x, y });
        setSelectedPieceValue(newBoard[y][x].piece);
        // 新しい候補地を設定
        displayCandidateMoves(x, y, newBoard);
      }
    } else {
      // 現在のターンの駒でなければ何もしない
      if (
        (currentTurn === 1 && newBoard[y][x].piece <= 0) ||
        (currentTurn === -1 && newBoard[y][x].piece >= 0)
      ) {
        return;
      }

      // すべての既存の候補地をリセット
      resetCandidateMoves(newBoard);

      // 新しい候補地を設定
      displayCandidateMoves(x, y, newBoard);

      // 駒が選択された状態を保存
      if (newBoard[y][x].piece !== 0) {
        setSelectedPiece({ x, y });
        setSelectedPieceValue(newBoard[y][x].piece);
      }
    }

    setBoard(newBoard);
  };

  const getImageSrc = (piece: number) => {
    switch (piece) {
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

  const addCandidate = (board: BoardType, y: number, x: number) => {
    if (board[y] !== undefined && board[y][x] !== undefined && board[y][x].piece === 0) {
      board[y][x].isCandidate = true;
    }
  };

  const addEnemyCandidate = (board: BoardType, y: number, x: number, piece: number) => {
    if (
      board[y] !== undefined &&
      board[y][x] !== undefined &&
      Math.sign(board[y][x].piece) !== Math.sign(piece) &&
      board[y][x].piece !== 0
    ) {
      board[y][x].isCandidate = true;
      board[y][x].isCapture = true; // 敵の駒を取れる場所を示す
    }
  };

  const pawn = (x: number, y: number, board: BoardType, piece: number) => {
    if (piece === 1) {
      addCandidate(board, y - 1, x);
      if (y === 6 && board[y - 1][x].isCandidate) {
        addCandidate(board, y - 2, x);
      }
      addEnemyCandidate(board, y - 1, x - 1, piece);
      addEnemyCandidate(board, y - 1, x + 1, piece);
    } else if (piece === -1) {
      addCandidate(board, y + 1, x);
      if (y === 1 && board[y + 1][x].isCandidate) {
        addCandidate(board, y + 2, x);
      }
      addEnemyCandidate(board, y + 1, x - 1, piece);
      addEnemyCandidate(board, y + 1, x + 1, piece);
    }
  };

  const rook = (x: number, y: number, z: number, board: BoardType) => {
    for (let r = 1; r < 8; r++) {
      if (board[y + r] !== undefined) {
        if (board[y + r][x].piece === 0) {
          board[y + r][x].isCandidate = true;
        } else if (Math.sign(board[y + r][x].piece) !== Math.sign(z)) {
          board[y + r][x].isCandidate = true;
          break; // 敵の駒があればそこまで
        } else {
          break; // 味方の駒があれば貫通しない
        }
      }
    }
    for (let r = 1; r < 8; r++) {
      if (board[y - r] !== undefined) {
        if (board[y - r][x].piece === 0) {
          board[y - r][x].isCandidate = true;
        } else if (Math.sign(board[y - r][x].piece) !== Math.sign(z)) {
          board[y - r][x].isCandidate = true;
          break; // 敵の駒があればそこまで
        } else {
          break; // 味方の駒があれば貫通しない
        }
      }
    }
    for (let r = 1; r < 8; r++) {
      if (board[y][x + r] !== undefined) {
        if (board[y][x + r].piece === 0) {
          board[y][x + r].isCandidate = true;
        } else if (Math.sign(board[y][x + r].piece) !== Math.sign(z)) {
          board[y][x + r].isCandidate = true;
          break; // 敵の駒があればそこまで
        } else {
          break; // 味方の駒があれば貫通しない
        }
      }
    }
    for (let r = 1; r < 8; r++) {
      if (board[y][x - r] !== undefined) {
        if (board[y][x - r].piece === 0) {
          board[y][x - r].isCandidate = true;
        } else if (Math.sign(board[y][x - r].piece) !== Math.sign(z)) {
          board[y][x - r].isCandidate = true;
          break; // 敵の駒があればそこまで
        } else {
          break; // 味方の駒があれば貫通しない
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

  const knight = (x: number, y: number, board: BoardType) => {
    for (const k_d of knight_drection) {
      const [y_k, x_k] = k_d;
      if (board[y + y_k] !== undefined && board[y + y_k][x + x_k] !== undefined) {
        if (
          (board[y][x].piece === 3 || board[y][x].piece === -3) &&
          (board[y + y_k][x + x_k].piece === 0 ||
            Math.sign(board[y + y_k][x + x_k].piece) !== Math.sign(board[y][x].piece))
        ) {
          board[y + y_k][x + x_k].isCandidate = true;
        }
      }
    }
  };

  const bishop = (x: number, y: number, z: number, board: BoardType) => {
    for (let b = 1; b < 8; b++) {
      // 右下方向のチェック
      if (board[y + b] !== undefined && board[y + b][x + b] !== undefined) {
        if (board[y + b][x + b].piece === 0) {
          board[y + b][x + b].isCandidate = true;
        } else if (Math.sign(board[y + b][x + b].piece) !== Math.sign(z)) {
          board[y + b][x + b].isCandidate = true;
          break; // 敵の駒があればそこまで
        } else {
          break; // 味方の駒があれば貫通しない
        }
      }
    }
    for (let b = 1; b < 8; b++) {
      // 左上方向のチェック
      if (board[y - b] !== undefined && board[y - b][x - b] !== undefined) {
        if (board[y - b][x - b].piece === 0) {
          board[y - b][x - b].isCandidate = true;
        } else if (Math.sign(board[y - b][x - b].piece) !== Math.sign(z)) {
          board[y - b][x - b].isCandidate = true;
          break; // 敵の駒があればそこまで
        } else {
          break; // 味方の駒があれば貫通しない
        }
      }
    }
    for (let b = 1; b < 8; b++) {
      // 右上方向のチェック
      if (board[y - b] !== undefined && board[y - b][x + b] !== undefined) {
        if (board[y - b][x + b].piece === 0) {
          board[y - b][x + b].isCandidate = true;
        } else if (Math.sign(board[y - b][x + b].piece) !== Math.sign(z)) {
          board[y - b][x + b].isCandidate = true;
          break; // 敵の駒があればそこまで
        } else {
          break; // 味方の駒があれば貫通しない
        }
      }
    }
    for (let b = 1; b < 8; b++) {
      // 左下方向のチェック
      if (board[y + b] !== undefined && board[y + b][x - b] !== undefined) {
        if (board[y + b][x - b].piece === 0) {
          board[y + b][x - b].isCandidate = true;
        } else if (Math.sign(board[y + b][x - b].piece) !== Math.sign(z)) {
          board[y + b][x - b].isCandidate = true;
          break; // 敵の駒があればそこまで
        } else {
          break; // 味方の駒があれば貫通しない
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

  const king = (x: number, y: number, board: BoardType) => {
    for (const kg_d of king_drection) {
      const [y_kg, x_kg] = kg_d;
      if (
        board[y + y_kg] !== undefined &&
        board[y + y_kg][x + x_kg] !== undefined &&
        (board[y + y_kg][x + x_kg].piece === 0 ||
          Math.sign(board[y + y_kg][x + x_kg].piece) !== Math.sign(board[y][x].piece))
      ) {
        board[y + y_kg][x + x_kg].isCandidate = true;
      }
    }
  };

  const queen = (x: number, y: number, board: BoardType) => {
    rook(x, y, 6, board);
    rook(x, y, -6, board);
    bishop(x, y, 6, board);
    bishop(x, y, -6, board);
  };

  const cellSize = 80; // セルのサイズを定義

  return (
    <div className={styles.container}>
      <div className={styles.turnIndicator}>
        {turn === 'white' ? "White's Turn" : "Black's Turn"}
      </div>

      <div className={styles.boardstyle}>
        {board.map((row, y) =>
          row.map(({ piece, isCandidate }, x) => {
            const isEven = (y + x) % 2 === 0;
            const cellStyle = {
              backgroundColor: isEven ? '#f7c899' : '#ca8745',
              width: `${cellSize / 6.4}%`,
              height: `${cellSize / 6.4}%`,
              position: 'relative' as const, // 型キャストを追加
            };
            const imageSrc = getImageSrc(piece)?.src;

            return (
              <div
                className={styles.cellstyle}
                style={cellStyle}
                key={`${x}-${y}`}
                onClick={() => clickHandler(x, y)}
              >
                {imageSrc !== undefined && (
                  <img
                    className={styles.imgstyle}
                    src={imageSrc}
                    alt=""
                    style={{ position: 'absolute' as const }}
                  />
                )}
                {isCandidate && (
                  <div
                    className={`${styles.spinnerBox} ${board[y][x].isCapture ? styles.captureCandidate : ''}`}
                    style={{ width: cellSize, height: cellSize, position: 'absolute' as const }}
                  >
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
