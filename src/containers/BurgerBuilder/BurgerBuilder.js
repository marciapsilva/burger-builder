import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0, 
      cheese: 0, 
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    orderNow: false
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(ingredient => ingredients[ingredient])
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: sum > 0 });
  }

  addIngredient = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCounted = oldCount + 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCounted;

    const oldPrice = this.state.totalPrice;
    const priceAddition = INGREDIENT_PRICES[type];
    const priceUpdated = oldPrice + priceAddition;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: priceUpdated
    });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredient = type => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    } 

    const updatedCounted = oldCount - 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCounted;

    const oldPrice = this.state.totalPrice;
    const priceDeduction = INGREDIENT_PRICES[type];
    const priceUpdated = oldPrice - priceDeduction;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: priceUpdated
    });
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseBurger = () => this.setState({ orderNow: true });

  cancelPurchase = () => this.setState({ orderNow: false });

  render() {
    const disabledInfo = {...this.state.ingredients};
    for (let key in disabledInfo) {
      //it will return true or false
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          addIngredient={this.addIngredient} 
          removeIngredient={this.removeIngredient} 
          disableButton={disabledInfo} 
          price={this.state.totalPrice} 
          purchasable={this.state.purchasable} 
          order={this.purchaseBurger} />
        <Modal show={this.state.orderNow} closeModal={this.cancelPurchase}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
      </>
    )
  }
};

export default BurgerBuilder;