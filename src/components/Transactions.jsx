import React, { Component } from 'react';

class Transactions extends Component {
	constructor(props){
		super(props);
		// this.state = {
		// 	auth: null
		// }
		this.state = {
			auth: {
				userclassName: "Kent"
			},
			transactions: [
				{
					symbol: "TSLA",
					side: "BUY",
					numShares: 10,
					costPerShare: 255.50
				},
				{
					symbol: "APPL",
					side: "BUY",
					numShares: 20,
					costPerShare: 100.50
				},
			]
		}
	}
	renderContent(){
		return this.state.transactions.map((tx)=>{
			return <tr key ={tx.symbol + tx.side}>
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