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
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [2, 3, 4, 6, 5, 4, 3, 2],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [2, 3, 4, 5, 6, 4, 3, 2],
  ]);

  const newBoard = structuredClone(board);
  const clickHandler = (x: number, y: number) => {};

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
              content = <img className={styles.imgstyle} src={getImageSrc(color)?.src} />;
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
