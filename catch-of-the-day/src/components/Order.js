import React from 'react';
import { formatPrice } from '../helpers';
// One of the react blessed addons.
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends React.Component {
  constructor () {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  // Example of a render function.  Could be an individual component as well.
  renderOrder(key) {
    // Can't acces this unless we've bound it in the constructor above.
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>;

    if(!fish || fish.status === 'unavailable') {
      return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available.{removeButton}</li>
    }

    return (
      <li key={key}>
        <span>
          { /* React will briefly duplicate the count span so we can animate the old and new versions */ }
          <CSSTransitionGroup
            component="span"
            className="count"
            transitionName="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >
            <span key={count}>{count}</span>
          </CSSTransitionGroup>
          lbs {fish.name} {removeButton}
          </span>
        <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
    )
  }

  render () {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if(isAvailable) {
        return prevTotal + (count * fish.price || 0);
      }
      return prevTotal;
    }, 0);
    return(
      <div className="order-wrap">
        <h2>Your Order</h2>
        <CSSTransitionGroup
          className="order"
          component="ul"
          transitionName="order"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </CSSTransitionGroup>
      </div>
    )
  }
}

export default Order;