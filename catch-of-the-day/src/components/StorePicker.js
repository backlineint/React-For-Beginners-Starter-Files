import React from 'react';

class StorePicker extends React.Component {
  render() {
    return (
      // Shortcut - type form.storeselector and let php storm autocomplete the jsx for you
      <form className="store-selector">
        <h2>Please Enter a Store</h2>
        { /* Can't use regular comments within JSX, have to do this */ }
        <input type="text" required placeholder="Store Name" />
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

export default StorePicker;