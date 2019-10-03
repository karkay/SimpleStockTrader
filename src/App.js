import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './components/Header';
import Transactions from './components/Transactions';
import Portfolio from './components/Portfolio';
function App() {
  const appName = "StockTradr"
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Header name={appName}/>
          <Route exact path="/" component={Portfolio}/>
          <Route exact path="/transactions" component={Transactions}/>
          <Route exact path="/portfolio" component={Portfolio}/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
