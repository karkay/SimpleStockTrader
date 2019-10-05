import React, { Component } from 'react';
const axios = require('axios');
require('dotenv').config();
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
			},
			meta:{
				dailyPrices: [
				]
			},
			transactions: [
				{
					symbol: "TSLA",
					side: "BUY",
					numShares: 15,
					value: 1500
				},
				{
					symbol: "APPL",
					side: "BUY",
					numShares: 20,
					value: 2000
				},
				{
					symbol: "NFLX",
					side: "BUY",
					numShares: 1,
					value: 100
				},
				{
					symbol: "GPRO",
					numShares: 50,
					side: "BUY",
					value: 1500
				},

			]
		}
	}

	getPrice(sym){
		return new Promise((resolve,reject)=>{
			axios.get("https://www.alphavantage.com/query?",{
				params:{
					function: "TIME_SERIES_DAILY",
					symbol: sym,
					apikey: API_KEY
				}
			}).then(function(res){
				resolve(res.data["Time Series (Daily)"][Object.keys(res.data["Time Series (Daily)"])[0]]);
				// resolve({
				// 	symbol: sym,
				// 	price: 1500
				// })

			}).catch(function(err){
				reject(err);
				
			})
		});
	}


	componentDidMount(){
		let symList = this.state.transactions.map((tx)=>{
			return this.getPrice(tx.symbol)
		})
		axios.all(symList)
		.then((a)=>{
			a.map((x)=>{
				this.state.meta.dailyPrices.append(x);
			})
			console.log(a);
			console.log(this.state.meta.dailyPrices);
		})
		.catch((e)=>{
			console.log("error fetching prices.")
		})
		
		console.log("portfolio mounted.")
	}
	renderContent(){
	}

	render(){
		return(
			<div className="container" id="portfolio-container">
				<div className="row" id ="portfolio-header">Portfolio</div>
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
						  {this.state.transactions.map((tx)=>{
						  	if(tx.side === "SELL"){ return;}
						  	return <tr key={tx.symbol+tx.value}>
								  		<th scope="row">{tx.symbol}</th>
								  		<td>{tx.numShares}</td>
								      	<td>${tx.value}</td>
								    </tr>
						  })}
						  </tbody>
						</table>
					</div>
					<div className="col">
						<form>
						  <div className="form-group">
						    <label htmlFor="Ticker">Ticker Symbol</label>
						    <input type="text" className="form-control" placeholder="TSLA, NFLX, AMZN..."/>
						 
						  </div>
						  <div className="form-group">
						    <label htmlFor="Quantity">Quantity</label>
						    <input type="number" className="form-control" placeholder="12..."/>
						    <small className="form-text text-muted">Please enter only whole quantities.</small>
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