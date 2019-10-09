import React, { Component } from 'react';
import Axios from 'axios';

class Transactions extends Component {
	constructor(props){
		super(props);
		// this.state = {
		// 	auth: null
		// }
		this.state = {
			auth: {
				userName: "Kent"
			},
			transactions: [
				{
					symbol: "TSLA",
					side: "BUY",
					numShares: 10,
					costPerShare: 255.50
				},
				{
					symbol: "AAPL",
					side: "BUY",
					numShares: 20,
					costPerShare: 100.50
				},
			]
		}
		this.getTransactions = this.getTransactions.bind(this);
	}
	async getTransactions(){
		return new Promise((resolve,reject)=>{
			Axios.get('/api/transactions')
			.then((a)=>{
				console.log(a);
				resolve(a.data);
			})
			.catch((e)=>{
				console.log(e);
				reject(e);
			})
		});
	}
	async componentDidMount(){
		console.log(this.props.srvState);
		let trans = await this.getTransactions();
		console.log(trans);
		this.setState({transactions: trans})
		// this.setState({transactions: this.props.srvState.transactions})
	}
	renderContent(){
		return this.state.transactions.map((tx)=>{
			return <tr key ={tx.symbol + tx.side+tx.costPerShare}>
			<th scope="row">{tx.symbol}</th>
			<td>{tx.side}</td>
			<td>{tx.numShares}</td>
			<td>${(tx.costPerShare).toFixed(2)}</td>
			<td>${(tx.numShares * tx.costPerShare).toFixed(2)}</td>
		  </tr>
		})
	}

	render(){
		return(
			<div className="container">
				<div className="row">
				Transactions
				</div>
				<div className="row" id = "transaction-data">
					<table className="table table-striped">
						  <thead>
						    <tr>
						      <th scope="col">Symbol</th>
						      <th scope="col">Side</th>
						      <th scope="col">Number of Shares</th>
						      <th scope="col">Cost Per Share</th>
							  <th scope="col">Total</th>
						    </tr>
						  </thead>
						  <tbody>
						    {this.renderContent()}
						  </tbody>
						</table>
				</div>
			</div>
		);
	}


}

export default Transactions;