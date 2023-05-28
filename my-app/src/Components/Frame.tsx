import React, { ReactNode } from 'react';
import styles from './Frame.module.css';

interface FrameProps {
  children: ReactNode;
}

const Frame = ({ children }: FrameProps) => {
  return (
    <div className={styles['body--container']}>
      {children}
    </div>
  );
};

export default Frame;
