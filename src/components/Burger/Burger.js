import React from 'react';

import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  //returns an array with the keys of an object
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredient => {
      //creates empties arrays with the amount of each ingredients
      return [...Array(props.ingredients[ingredient])].map(( __, index ) => {
        //for each array element, creates a BurgerIngredient with the ingredient
        return <BurgerIngredient key={ingredient + index} type={ingredient} />;
      });
    })
    //reduces transformedIngredients into a single array of objects 
    .reduce(( arr, el )=> arr.concat(el), []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;