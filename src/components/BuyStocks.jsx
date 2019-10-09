import React, { Component } from 'react';
import axios from 'axios';
let API_KEY = "ZWZTAOSWFD17KO03";
API_KEY = "H2TW3V7T3APHYLEM";

class BuyStocks extends Component {
	constructor(props){
		super(props);
		this.state = {
            symbol: "",
            quantity: 0,
            condColor: {color:"grey"}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleQty = this.handleQty.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
	}
	renderContent(){
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
                try{
                    console.log(res.data);
                    let ans = {symbol: sym, currentPrice: 0};
                    if("Note" in res.data) resolve(ans)
                    const dataObj = res.data;
                    const priceData = dataObj[`Time Series (${intv})`];
                    const metaObj = dataObj["Meta Data"];
                    const recentDate = metaObj["3. Last Refreshed"];
                    const cPrice = priceData[recentDate]["1. open"];
                    console.log("gcp debug: ",[dataObj,priceData,metaObj,recentDate,cPrice]);
                    if(typeof priceData !== 'undefined' && typeof metaObj !== 'undefined' && typeof recentDate !== 'undefined' && typeof cPrice !== 'undefined'){
                        ans.currentPrice = parseFloat(cPrice);
                    }
                    console.log("gcp:",ans)
                    resolve(ans)
                }
                catch(e){
                    console.log(e);
				    resolve({symbol: sym, currentPrice: 0});
                }
				
			}).catch(function(err){
				console.log(err);
				// resolve({symbol: sym, currentPrice: 0});
				resolve({symbol: sym, currentPrice: 0});
				
			})
		});
	}

    searchSymbol(keyword){
		return new Promise((resolve,reject)=>{
			axios.get("https://www.alphavantage.co/query?",{
				params:{
					function: "SYMBOL_SEARCH",
					keywords: keyword,
					apikey: API_KEY
				}
			}).then(function(res){
				let bestMatchesArr = []
				if("Note" in res.data) resolve(bestMatchesArr)
				else bestMatchesArr = res;
				resolve(bestMatchesArr);
			}).catch(function(err){
				reject(err);
			})
		});
	}
    

    async validTicker(keyword){
        const resArr = await this.searchSymbol(keyword);
        return resArr.length === 0 ? false : true;
    }

	handleChange(event){
        let clr = (this.state.quantity > 0 && this.state.symbol) ? "green" : "red"
        this.setState({
            symbol: event.target.value.toUpperCase(),
            condColor: {color:clr}
        })
        
    }
    handleQty(event){
        let clr = (this.state.quantity > 0 && this.state.symbol) ? "green" : "red"
        this.setState({
            quantity: parseInt(event.target.value) || 0,
            condColor: {color:clr}
        });
    }

	async handleSubmit(event){
        event.preventDefault();
        console.log(event);
        console.log(event.target);
        const qty = this.state.quantity;
        const sym = this.state.symbol;
        let priceObj = await this.getCurrentPrice(sym,"1min");
        let isValidTicker = await this.validTicker(sym);
        const price = priceObj["currentPrice"];
        const totalCost = qty * price;
        console.log(isValidTicker);
        console.log(price);
        
        if(qty > 0 &&  isValidTicker && price > 0 && totalCost <= this.props.balance){  
            //state changes go in here when unbanned from api
            console.log("passed all purchase constraints");
            this.props.handler({
                symbol: sym,
                side: "BUY",
                numShares: qty,
                value: totalCost,
                dailyPrice: 0,
                currentPrice: price,
                balance: this.props.balance - (totalCost)
            })
        }else{
            alert("Your order cannot be completed. Please create orders within your balance or wait for the api cooldown to end.")
        }

		
    }
    
    
    componentDidUpdate(){
        console.log(this.state);
    }
    componentDidMount(){

        console.log("buy stocks mounted")
    }

	render(){
        try{
            return(
                <div className="col">
                    <div>Cash - ${(this.props.balance.toFixed(2))}</div>
                    <div className="spacer"></div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                        <label htmlFor="Ticker">Ticker Symbol</label>
                        <input type="text" className="form-control" placeholder="TSLA, NFLX, AMZN..." onChange={this.handleChange}/>
                        
                        </div>
                        <div className="form-group">
                        <label htmlFor="Quantity">Quantity</label>
                        <input type="number" className="form-control" placeholder="12..." onChange={this.handleQty}/>
                        <small className="form-text" style={this.state.condColor}>Please enter only whole numbers and valid ticker symbols.</small>
                        </div>
                        
                        <button type="submit" className="btn btn-primary">Purchase</button>
                    </form>
                </div>
            );
        }catch(e){
            console.log(e);
        }
	}


}

export default BuyStocks;