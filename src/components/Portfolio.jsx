import React, { Component } from 'react';
import BuyStocks from './BuyStocks';
const axios = require('axios');
require('dotenv').config();
let API_KEY = "ZWZTAOSWFD17KO03";
API_KEY = "H2TW3V7T3APHYLEM";



class Portfolio extends Component {
	constructor(props){
		super(props);
		this.state = {
			auth: {
				userName: "Kent"
			},
			balance: 5000,
			portfolio: {
				TSLA:{
					symbol: "TSLA",
					side: "BUY",
					numShares: 15,
					value: 0,
					dailyPrice: 0,
					currentPrice: 0
				},
				AAPL:{
					symbol: "AAPL",
					side: "BUY",
					numShares: 20,
					value: 0,
					dailyPrice: 0,
					currentPrice: 0
				}

			}
		}
		this.handler = this.handler.bind(this)
		this.spinner = this.spinner.bind(this)
	}
	getDailyOpenPrice(sym){
		return new Promise((resolve,reject)=>{
			axios.get("https://www.alphavantage.co/query?",{
				params:{
					function: "TIME_SERIES_DAILY",
					symbol: sym,
					apikey: API_KEY
				}
			}).then(function(res){
				console.log(res.data);
				let ans = {symbol: sym, openPrice: 0}
				if("Note" in res.data) resolve(ans);
				const dataObj = res.data;
				const priceData = dataObj["Time Series (Daily)"];
				const metaObj = dataObj["Meta Data"];
				const recentDate = metaObj["3. Last Refreshed"].slice(0,10);
				const oPrice = priceData[recentDate]["1. open"];
				// console.log("gdop debug: ",[dataObj,priceData,metaObj,recentDate,oPrice]);
				
				if(typeof priceData !== 'undefined' && typeof metaObj !== 'undefined' && typeof recentDate !== 'undefined' && typeof oPrice !== 'undefined'){
					
					ans.openPrice = parseFloat(oPrice);
				}
				console.log("gcp:",ans)
				resolve(ans)

			}).catch(function(err){
				console.log(err);
				// resolve({symbol: sym, openPrice: 0});
				reject(err);
				
			})
		});
	}
	getCurrentPrice(sym,intv){
		return new Promise((resolve,reject)=>{
			axios.get("https://www.alphavantage.co/query?",{
				params:{
					function: "TIME_SERIES_INTRADAY",
					symbol: sym,
					interval: intv,
					apikey: API_KEY
				}
			}).then(function(res){
				console.log(res.data);
				let ans = {symbol: sym, currentPrice: 0};
				if("Note" in res.data) resolve(ans)
				const dataObj = res.data;
				const priceData = dataObj[`Time Series (${intv})`];
				const metaObj = dataObj["Meta Data"];
				const recentDate = metaObj["3. Last Refreshed"];
				const cPrice = priceData[recentDate]["1. open"];
				// console.log("gcp debug: ",[dataObj,priceData,metaObj,recentDate,cPrice]);
				if(typeof priceData !== 'undefined' && typeof metaObj !== 'undefined' && typeof recentDate !== 'undefined' && typeof cPrice !== 'undefined'){
					ans.currentPrice = parseFloat(cPrice);
				}
				console.log("gcp:",ans)
				resolve(ans)
				
			}).catch(function(err){
				console.log(err);
				// resolve({symbol: sym, currentPrice: 0});
				reject(err);
				
			})
		});
	}
	spinner(){
		return <svg width="15%" height="15%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-rolling"><circle cx="50" cy="50" fill="none" ng-attr-stroke="{{config.color}}" ng-attr-stroke-width="{{config.width}}" ng-attr-r="{{config.radius}}" ng-attr-stroke-dasharray="{{config.dasharray}}" stroke="#333332" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138" transform="rotate(42.1531 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>
	}

	updateCurrentPrice(){
		let copyOfTransactions = {...this.state.portfolio};
		let currentPriceList = []
		Object.keys(this.state.portfolio).forEach((key)=>{
			currentPriceList.push(this.getCurrentPrice(this.state.portfolio[key].symbol,"1min"))
		  
		  });
		axios.all(currentPriceList)
		.then((b)=>{
			//update current prices
			b.forEach((x)=>{
				Object.keys(copyOfTransactions).forEach((key,i)=>{
					let tx = copyOfTransactions[key];
					if(x.symbol === tx.symbol){
						copyOfTransactions[key].currentPrice = x.currentPrice;
					}
				})
			})
			console.log(copyOfTransactions)
			this.setState({
				portfolio: copyOfTransactions
			});
			
			
		})
		.catch((err)=>{
			console.log("error fetching current prices.",err);
		})
	}

	componentDidUpdate(){
		console.log("portfolio updated")
		setTimeout(()=> this.updateCurrentPrice(),60000);
	}
	componentWillUnmount(){

	}


	componentDidMount(){
		
		let dailyOpenList = []
		let currentPriceList = []
		Object.keys(this.state.portfolio).forEach((key,i)=>{
			let tx = this.state.portfolio[key];
			dailyOpenList.push(this.getDailyOpenPrice(tx.symbol))
			currentPriceList.push(this.getCurrentPrice(tx.symbol,"1min"))
		})

		axios.all(dailyOpenList)
		.then((a)=>{
			let copyOfTransactions = {...this.state.portfolio};
			//updates the opening prices.
			a.forEach((x)=>{
				copyOfTransactions = Object.keys(copyOfTransactions).map((key,i)=>{
					let tx = copyOfTransactions[key];
					let newTx = tx;
					if(x.symbol === tx.symbol){
						newTx ={...tx,dailyPrice: x.openPrice}
						// console.log(newTx);
						return newTx;
					}
					// console.log(tx);
					return tx;
				})
			})
			
			// get current prices for everything
			axios.all(currentPriceList)
			.then((b)=>{
				//update current prices
				b.forEach((x)=>{
					copyOfTransactions = Object.keys(copyOfTransactions).map((key,i)=>{
						let tx = copyOfTransactions[key];
						let newTx = tx;
						if(x.symbol === tx.symbol){
							newTx ={...tx,currentPrice: x.currentPrice}
							// console.log(newTx);
							return newTx;
						}
						// console.log(tx);
						return tx;
					})

				})
				console.log("component did mount: ",copyOfTransactions)
				
				this.setState({
					portfolio: {...copyOfTransactions}
				});
				
				
			})
			.catch((err)=>{
				console.log("error fetching current prices.",err);
			})
			
		})
		.catch((e)=>{
			console.log("error fetching daily prices.",e)
		})
		console.log("portfolio mounted.")
		
	}
	renderPortfolio(){
		return Object.keys(this.state.portfolio).map((key,i)=>{
			// console.log(tx);
			let tx = this.state.portfolio[key];
			// console.log(tx);
			let priceColor = 'black'
			if(tx.side !== "SELL"){
				if(tx.currentPrice > tx.dailyPrice){
					priceColor = 'green'
				}else if(tx.currentPrice < tx.dailyPrice){
					priceColor = 'red'
				}else{
					priceColor= 'grey'
				}
			}
			const condColors = {color:priceColor}
			const curPrice = tx.currentPrice <= 0 ? this.spinner() : `$${tx.currentPrice.toFixed(2)}`
			const value = (tx.currentPrice * tx.numShares).toFixed(2);
			  return <tr key={tx.symbol+tx.value}>
						  <th scope="row" style={condColors}>{tx.symbol}</th>
						  <td>{tx.numShares}</td>
						  <td>{(value <= 0 ? this.spinner() : `$${value}`)}</td>
						  <td style={condColors}>{curPrice}</td>
					</tr>
		});
	}

	handler(newState){
		console.log("child calling parent: ",newState)
		let copy = []
		copy = Object.keys(this.state.portfolio).map((key,i)=>{
			let x = this.state.portfolio[key];
			if(x.symbol === newState.symbol){
				let newX = {
					...x, numShares: x.numShares + newState.numShares
				}
				return newX;
			}else{
				return x;
			}
		})
		console.log("modified state:", copy);
		this.setState({
			balance: newState.balance,
			portfolio: copy
		})
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
							  <th scope="col">Current Price</th>

						    </tr>
						  </thead>
						  <tbody>
						  {this.renderPortfolio()}
						  </tbody>
						</table>
					</div>
					<BuyStocks handler={this.handler} balance={this.state.balance}/>
				</div>
			</div>
		);
	}


}

export default Portfolio;