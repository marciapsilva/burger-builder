import React from 'react';

import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
];

const buildControls = props => (
  <div className={styles.BuildControls}>
    <p>Current price: 
      <span className={styles.Price}> R$ {props.price.toFixed(2)}</span>
    </p>
    {controls.map(control => (
      <BuildControl 
        key={control.label} 
        label={control.label} 
        addIngredient={() => props.addIngredient(control.type)}
        removeIngredient={() => props.removeIngredient(control.type)} 
        disable={props.disableButton[control.type]} />
    ))}
    <button 
      className={styles.OrderButton}
      disabled={!props.purchasable}>ORDER NOW</button>
  </div>
);

export default buildControls;