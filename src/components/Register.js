import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import Portfolio from './Portfolio';
import Axios from 'axios';

class Register extends Component {
	constructor(props){
		super(props);
		this.state = {
            auth: null,
            userName: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePass = this.handlePass.bind(this);
    }
    handleEmail(e){
        this.setState({
            userName: e.target.value
        });
    }
    handlePass(e){
        this.setState({
            password: e.target.value
        });
    }
    processRegistration(){
        Axios.post('/auth/register',{
                username: this.state.userName,
                password: this.state.password
        })
        .then((a)=>{
            // console.log("login succ",a);
            if(a.data.regSuccess){
                alert("successfully registered!")
            }else{
                alert("failed to register! account already exists")
            }
        })
        .catch((e)=>{
            alert("failed to register!")
        })
    }
    handleSubmit(e){
        e.preventDefault();
        this.processRegistration()
        
    }
	renderContent(){
		switch(this.props.auth){
			case undefined:
				return <div className="container-fluid container-small">
                            <h1>Register</h1>
							<form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" onChange={this.handleEmail}/>
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handlePass}/>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        
					   </div>

			default:
				return <Portfolio/>
		}
	}

	render(){
		return(
			<div className = "container-fluid">
	
						{this.renderContent()}

			</div>
		);
	}


}

export default Register;