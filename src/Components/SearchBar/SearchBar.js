import React, { Component } from 'react';
import './SearchBar.css';

class App extends Component {
  constructor(props){
    super(props);

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(e){
    const term = e.state.value;
    this.props.onSearch(term);
  }

  //search(){
    //this.props.onSearch(term.state);
  //}

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <a>SEARCH</a>
      </div>
    );
  }
}

export default App;
