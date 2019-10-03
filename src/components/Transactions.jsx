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
			}
		}
	}
	renderContent(){
	}

	render(){
		return(
			<div className="container">
				<div className="row">
				Transactions
				</div>
				<div className="row" id = "transaction-data">
					<table class="table table-striped">
						  <thead>
						    <tr>
						      <th scope="col">Name</th>
						      <th scope="col">Side</th>
						      <th scope="col">Number of Shares</th>
						      <th scope="col">Cost Per Share</th>
						    </tr>
						  </thead>
						  <tbody>
						    <tr>
						      <th scope="row">APPL</th>
						      <td>BUY</td>
						      <td>1000</td>
						      <td>$200</td>
						    </tr>
						    <tr>
						      <th scope="row">TSLA</th>
						      <td>BUY</td>
						      <td>10000</td>
						      <td>$256</td>
						    </tr>
						    <tr>
						      <th scope="row">NFLX</th>
						      <td>SELL</td>
						      <td>5</td>
						      <td>$200000</td>
						    </tr>
						  </tbody>
						</table>
				</div>
				<div className="row" id="paginator">
					<nav aria-label="transactions pagination">
					  <ul className="pagination">
					    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
					    <li className="page-item"><a className="page-link" href="#">1</a></li>
					    <li className="page-item"><a className="page-link" href="#">2</a></li>
					    <li className="page-item"><a className="page-link" href="#">3</a></li>
					    <li className="page-item"><a className="page-link" href="#">Next</a></li>
					  </ul>
					</nav>
				</div>
			</div>
		);
	}


}

export default Transactions;