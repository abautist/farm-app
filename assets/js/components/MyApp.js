"use strict"

const React = require("react");
const NavBar = require("./NavBar");
const Auth = require("./Auth");
const Router = require('react-router').Router
const Route = require('react-router').Route
const Link = require('react-router').Link
const browserHistory = require('react-router').browserHistory;

const MyApp = React.createClass({
	render: function(){
		return(
				<div>
          <NavBar />					
          <Router history={browserHistory}>
            <Route path="/" component={ProductSheet} />
            <Route path="/auth" component={Auth} />
          </Router>
        </div>
			)
	}
});

const ProductSheet = React.createClass({
	getInitialState: function() {
		return {
			products: [],
			message: ""
		};
	},
	getProducts: function() {
		this.setState({
			products: [],
			message: "Loading..."
		});
		let self = this;
		$.get("/api/products").done(function(products){
			self.setState({
				products: products,
				message: ""
			});
		})
	},
	render: function(){
		return(
			<div>
        <h1>Jumanji Farm Fresh Sheet</h1>
				<button type="button" className="btn btn-primary" onClick={this.getProducts}>Get Fresh!</button>
				<h1>{this.state.message}</h1>
				<ResultList data={this.state.products} />
			</div>
			)
	}
})

const ResultList = React.createClass({
	render: function() {
		let resultItems = this.props.data.map(function(item, idx){
			return <ResultItem key={idx} data={item} />;
		});
		return (
				<div>
					{resultItems}
				</div>
			)
	}
});

const ResultItem = React.createClass({
  render: function() {
		let item = this.props.data;
    let price = item.price.toFixed(2);
		return (
			<div className="well">
				<h1>{item.variety} - <small>{item.vegetable}</small></h1>
        <h3>${price}</h3>
			</div>
			)
	}
});



module.exports = MyApp;

