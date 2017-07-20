import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  constructor() {
    // Can't use this keyword until we call super.
    super();

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);

    // Initial state / getInitialState (older approach)
    this.state = {
      fishes: {},
      order: {}
    };
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

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App;