import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './components/Header';
import Transactions from './components/Transactions';
import Portfolio from './components/Portfolio';
import Login from './components/Login';
import Register from './components/Register';
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      auth: false,
      appName: "StockTradr",
      email: ""
    }
    this.handler = this.handler.bind(this);
  }
  componentDidMount(){
    console.log("state: ",this.state);
  }
  componentDidUpdate(){
    console.log("app updated:",this.state)
  }
  handler(newState){
    console.log("newState",newState)
    this.setState({
      ...newState
    })
    
  }
  render()
  {
    return (<div className="App">
      <BrowserRouter>
        <div>
          <Header name={this.state.appName} srvState={this.state}/>
          <Route exact path="/" render={()=><Portfolio srvState={this.state} handler={this.handler}/>}/>
          <Route exact path="/transactions" render={()=><Transactions srvState={this.state} handler={this.handler}/>}/>
          <Route exact path="/portfolio" render={()=><Portfolio srvState={this.state} handler={this.handler}/>}/>
          <Route exact path="/login" render={()=><Login srvState={this.state} handler={this.handler}/>}/>
          <Route exact path="/register" render={()=><Register srvState={this.state} handler={this.handler}/>}/>
        </div>
      </BrowserRouter>
    </div>
    );
  }
}

export default App;
