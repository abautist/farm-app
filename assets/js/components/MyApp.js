"use strict"

const React = require("react");
//additional components here

const MyApp = React.createClass({
	render: function(){
		return(
				<div>
					<h1>Jumanji Farm Fresh Sheet</h1>
					<ProductSheet />
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
				<button type="button" onClick={this.getProducts}>Get Fresh!</button>
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
		return (
			<div className="well">
				<h1>{item.variety} - <small>{item.vegetable}</small></h1>
        <h3>${item.price}</h3>


			</div>
			)
	}
});

module.exports = MyApp;

