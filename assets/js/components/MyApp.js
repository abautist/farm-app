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
			console.log(products);
		})
	},
	render: function(){
		return(
			<div>
				<SearchBox search={this.getProducts} />
				// <ResultList data={this.state.products} />
			</div>
			)
	}
})

const SearchBox = React.createClass({
	getInitialState: function() {
		return {
			searchTerm: ""
		};
	},
	changeSearchField: function(e) {
		this.setState({
			searchTerm: e.target.value
		});
	},
	passSearchTerm: function(e) {
		e.preventDefault();
		this.props.search(this.state.searchTerm);
	},
	render: function(){
		return(
				<div>
					<form onSubmit={this.passSearchTerm}>
						<input type="text" placeholder="Search for vegetables..." value={this.state.searchTerm} onChange={this.changeSearchField} className="form-control" />
					</form>
				</div>
			)
	}
})

module.exports = MyApp;


				// <div>
				// 	<button type="button" onClick={this.getProducts}>Click Here</button>
				// 	{this.state.products.map(function(product){
				// 		return (
				// 				<div className="well" key={product.id}>{product.name} | {product.id}</div>
				// 			)
				// 	})}
				// </div>
