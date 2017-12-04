import React, { Component } from 'react';
import './App.css';
import StockInfo from './components/StockInfo';
import { loadQuoteForStock } from './api/iex';



class App extends Component {
  state = {
    symbol: 'B',
    isValid: true,
    quote: null,
    hasError: false
  }

  componentDidMount(){
    console.log("I am in componentDidMount");
    this.loadQuote()
  }

  componentDidUpdate(){
    console.log("I am in componentDidUpdate");
  }

  loadQuote() {
    console.log("I am in the class");
    loadQuoteForStock(this.state.symbol)
    .then((quote)=> {
      console.log(quote)
      this.setState({quote: quote})
    })
    .catch((err)=> {
      console.log(err)
      this.setState({hasError: true});
    })
  }

  handleSymbolChange = (event) => {
    // const target = event.target;
    // console.log("target is", target);

    const symbol = event.target.value;
    this.setState({ symbol: symbol });
    console.log(event);
  }

  handleButtonClick = (event) => {
    console.log(event.target);
    this.loadQuote();
  }



  render() {
    console.log(`I am in render() with this.state.hasError of: ${this.state.hasError}`);
    // if (this.state.hasError) {
    //   return <div>Something went wrong!</div>;
    // }
    const hasError = () => {
      return (
        <div>Something went wrong!</div>
      )
    }

    return (

      <div className="App">
        { this.state.hasError ? hasError() : null }
        <h1>Wolf of React</h1>
        <input
          value={this.state.symbol}
          placeholder="Enter symbol"
          onChange={this.handleSymbolChange}
        />
        <button onClick={ this.handleButtonClick }>Get this sana</button>
        <StockInfo {...this.state.quote}/>

      </div>
    )
  }
}

export default App;
