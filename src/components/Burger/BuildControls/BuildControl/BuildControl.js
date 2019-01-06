import React from 'react';

import styles from './BuildControl.module.css';

const buildControl = props => (
  <div className={styles.BuildControl}>
    <div className={styles.Label}>{props.label}</div>
    <button 
      onClick={props.removeIngredient} 
      className={styles.Less}
      disabled={props.disable}>Less</button>
    <button 
      onClick={props.addIngredient} 
      className={styles.More}>More</button>
  </div>
);

export default buildControl;