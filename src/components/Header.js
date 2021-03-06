import React, { Component } from 'react';
import {NavLink} from "react-router-dom";

class Header extends Component {
	constructor(props){
		super(props);
		// this.state = {
		// 	auth: null
		// }
		this.state = {
		}
	}
	renderContent(){
		switch(this.props.srvState.auth){
			case false:
				return <div className="col">
							Please <a href="/login" className="header-text">login</a> or <a href="/register" className="header-text">register</a>.
					   </div>

			default:
				return <div className="col">
							Welcome back, {this.props.srvState.email}
								<br></br>
								<NavLink className="header-text" id="transations" to="/transactions">Transactions
								</NavLink>
								<div className="spacing"></div>
								<NavLink to="/portfolio" className="header-text" id ="portfolio">Portfolio
								</NavLink>
							
					   </div>
		}
	}

	render(){
		return(
			<div className = "container-fluid" id="header">
				<div className ="row">
					<div className="col" id="logo">
						{this.props.name}
					</div>
					<div className="col" id="state">
						{this.renderContent()}
						
					</div>
				</div>
			</div>
		);
	}


}

export default Header;