import React, { Component } from 'react';

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
	renderContent(){
	}

	render(){
		return(
			<div className="container" id="portfolio-container">
				<div className="row">{this.state.auth == null ? "Uncle Joe" : this.state.auth.userName}'s Portfolio</div>
				<div className="row">
					<div className="col">
						<table class="table table-striped">
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
						    <label for="Ticker">Ticker Symbol</label>
						    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="TSLA, NFLX, AMZN..."/>
						 
						  </div>
						  <div className="form-group">
						    <label for="Quantity">Quantity</label>
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