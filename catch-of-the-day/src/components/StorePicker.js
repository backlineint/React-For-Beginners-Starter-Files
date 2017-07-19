import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // One approach - using constructor to bind this to the component in our custom methods.
  /*
  constructor() {
    // Super creates an instance of the default React.Component first that we can then customize.
    super();
    this.goToStore = this.goToStore.bind(this);
  }
  */

  goToStore(event) {
    event.preventDefault();
    console.log("You changed the URL");
    // Get the text from the box
    console.log(this.storeInput.value);
    // Direct the user to the new route
  }

  render() {
    return (
      // Shortcut - type form.storeselector and let php storm autocomplete the jsx for you
      /* There seems to be a difference between onSubmit={this.goToStore} (doesn't execute)
      and onSubmit={this.goToStore()} (automatically executes the function which we probably don't want) */
      <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
        { /* Another alternative to the onsubmit above is onSubmit={(e) => this.goToStore.bind(e)}  */ }
        <h2>Please Enter a Store</h2>
        { /* Can't use regular comments within JSX, have to do this */ }
        { /* Ref lets us access the input inside react */}
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input }} />
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

export default StorePicker;