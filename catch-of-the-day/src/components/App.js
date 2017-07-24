import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  constructor() {
    // Can't use this keyword until we call super.
    super();

    // Need to bind all new methods, kind of like what we had to do in angular.
    // Kind of annoying, hopefully future versions of React can improve this.
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

    // Initial state / getInitialState (older approach)
    this.state = {
      fishes: {},
      order: {}
    };
  }

  // Example of a react lifecycle method.
  componentWillMount() {
    // React router is nice enough to automatically add the storeId to props
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
      {
        context: this,
        state: 'fishes'
      });

    // Check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef) {
      // Update app component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    // Pass variables in {} and the console will name them.
    //console.log({nextProps, nextState});
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    // Currently we get a flash of the default component, could use the ShouldComponentUpdate
    // lifecycle method to be more specific about when the order component should re-render.
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish(fish) {
    // Update our state
    // ... is a spread
    const fishes = {...this.state.fishes};
    // Not best practice, but could this.state.fishes.fish1 = fish
    // Add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // Set state
    this.setState({ fishes });
    // Line above is the same as this.setState({ fishes: fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key) {
    // Take a copy of our state
    const order = {...this.state.order};
    // Update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // Update our state
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            { /* Object.keys() gets an array of keys that we can iterate through */ }
            {
              Object
                .keys(this.state.fishes)
                // React won't let you use key in a component, create another prop
                // with that value and sent it instead
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
        />
        { /* Passsing methods down via props */ }
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App;