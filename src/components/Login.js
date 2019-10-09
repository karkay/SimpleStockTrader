import React, { Component } from 'react';
import Portfolio from './Portfolio';
import Axios from 'axios';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
            userName: "",
            password:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePass = this.handlePass.bind(this);

    }
    componentDidMount(){
        console.log(this.props.handler);
        console.log(this.props)
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
    processLogin(){
        Axios.post('/auth/login',{
                username: this.state.userName,
                password: this.state.password
            
        })
        .then((a)=>{
            console.log("login succ",a);
            // console.log(this.props.handler);
            this.props.handler({...this.props.srvState,auth:true,email:this.state.password});

        })
        .catch((e)=>{
            console.log(e);
            alert("login failed!")
        })
    }
    handleSubmit(e){
        e.preventDefault();
        console.log("pressed login submit")
        this.processLogin();
        
    }
    componentWillMount(){
        
    }
	renderContent(){
		switch(this.props.srvState.auth){
			case false:
				return <div className="container-fluid container-small">
                            <h1>Login</h1>
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
				return <Portfolio srvState={this.props.srvState}/>
		}
	}

	render(){
        console.log(this.state);
		return(
			<div className = "container-fluid">
						{this.renderContent()}
			</div>
		);
	}


}

export default Login;