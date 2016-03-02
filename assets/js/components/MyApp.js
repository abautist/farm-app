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
			self.setState({products});
		})
	},
	render: function(){
		return(
				<div>
					<h3> Test!</h3>
					<button type="button" onClick={this.getProducts}>Click Here</button>
					{this.state.products.map(function(product){
						return (
								<div key={product.id}>{product.name}<img src={product.image} /></div>
							)
					})}
				</div>
			)
	}
})

module.exports = MyApp;