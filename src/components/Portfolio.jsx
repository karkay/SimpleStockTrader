import React, { Component } from 'react';
const axios = require('axios');

const API_KEY = "ZWZTAOSWFD17KO03";



class Portfolio extends Component {
	constructor(props){
		super(props);
		// this.state = {
		// 	auth: null
		// }
		this.state = {
			auth: {
				userName: "Kent"
			}
		}
	}
	componentDidMount(){
		axios.get("https://www.alphavantage.co/query?",{
			params:{
				function: "TIME_SERIES_DAILY",
				symbol: "MSFT",
				apikey: API_KEY
			}
		}).then(function(res){
			console.log(res.data["Time Series (Daily)"][Object.keys(res.data["Time Series (Daily)"])[0]]);
		}).catch(function(err){
			console.log(err);
		})
		console.log("portfolio mounted.")
	}
	renderContent(){
	}

	render(){
		return(
			<div className="container" id="portfolio-container">
				<div className="row">{this.state.auth == null ? "Uncle Joe" : this.state.auth.userName}'s Portfolio</div>
				<div className="row">
					<div className="col">
						<table className="table table-striped">
						  <thead>
						    <tr>
						      <th scope="col">Name</th>
						      <th scope="col">Number of Shares</th>
						      <th scope="col">Value</th>
						    </tr>
						  </thead>
						  <tbody>
						    <tr>
						      <th scope="row">APPL</th>
						      <td>5</td>
						      <td>$1000</td>
						    </tr>
						    <tr>
						      <th scope="row">TSLA</th>
						      <td>10</td>
						      <td>$1500</td>
						    </tr>
						    <tr>
						      <th scope="row">NFLX</th>
						      <td>15</td>
						      <td>$2000</td>
						    </tr>
						  </tbody>
						</table>
					</div>
					<div className="col">
						<form>
						  <div className="form-group">
						    <label htmlFor="Ticker">Ticker Symbol</label>
						    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="TSLA, NFLX, AMZN..."/>
						 
						  </div>
						  <div className="form-group">
						    <label htmlFor="Quantity">Quantity</label>
						    <input type="number" className="form-control" id="exampleInputPassword1" placeholder="12..."/>
						    <small id="emailHelp" className="form-text text-muted">Please enter only whole quantities.</small>
						  </div>
						  
						  <button type="submit" className="btn btn-primary">Purchase</button>
						</form>
					</div>
				</div>
			</div>
		);
	}


}

export default Portfolio;