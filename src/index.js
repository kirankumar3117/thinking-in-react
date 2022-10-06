import React,{useState} from "react";
import ReactDOM from "react-dom";


const ProductCategory=props=>{
  const {product}=props;
  return(
    <tr>
      <th colSpan="2">{product.category}</th>
    </tr>
  )
}
const ProductRows=props=>{
  const {product}=props;
 const coloredProduct= product.stocked ? 
    product.name : <span style={({color:"red"})}>{product.name}</span>
  return(<tr>
    <td>{coloredProduct}</td>
    <td align="right">{product.price}</td>
  </tr>)
}
const ProductTable=props=>{
  const {products,filterText,inStock}=props;
  const rows=[];
  let lastCategory=null;
  products.forEach(products=>{
    if(products.name.indexOf(filterText)===-1){
      return
    }
    if(inStock && !products.stocked){
      return;
    }
    if(lastCategory!=products.category){
    rows.push(<ProductCategory product={products} key={products.category}/>)
    }

    rows.push(<ProductRows product={products} key={products.name}/>)
    lastCategory=products.category;
  })
  return(
    <table width="100%">
      <thead>
    <tr style={({color:"blue"})}>
      <th align="left">Name</th>
      <th align="right">Price</th>
    </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}
const SearchBar=(props)=>{
  const {
    filterText
    ,inStock
    ,onFilterTextChange
    ,onInStockChange}=props;

  return(
    <form>
      <input type="text" placeholder="search.." value={filterText}
      onChange={event=> onFilterTextChange(event.target.value)}
      />
      <p>
        <input type="checkbox" checked={inStock}
        onChange={event=>onInStockChange(event.target.checked)}
        />
        {" "}
        <span style={({color:"green"})}>show available products</span>
      </p>
    </form>
  )
}


const FilterableProductsTable = props =>{
	const {products}=props;
  const [filterText,setFilterText]=useState("");
  const [inStock,setInStock]=useState(false);

  const handleFilterTextChange=filterText=>{
    setFilterText(filterText);
  }
  const handleInStockChange=inStock=>{
    setInStock(inStock);
  }

	return(
	<div style={({fontFamily:"sans-serif"})}>
		<SearchBar
     filterText={filterText}
      inStock={inStock}
      onFilterTextChange={handleFilterTextChange}
      onInStockChange={handleInStockChange}
      />
		<ProductTable filterText={filterText} inStock={inStock} products={products}/>
	</div>
	)
}

const PRODUCTS=[
	{	category: "Sporting Goods",
			 price: "$49.99",
		 stocked: true,
				name: "Football" },
	{	category: "Sporting Goods",
			 price: "$9.99",
		 stocked: true,
				name: "Baseball" },
	{	category: "Sporting Goods",
			 price: "$29.99",
		 stocked: false,
				name: "Basketball" },
	{	category: "Electronics",
			 price: "$99.99",
		 stocked: true,
				name: "iPod Touch" },
	{	category: "Electronics",
			 price: "$399.99",
		 stocked: false,
				name: "iPhone 5" },
	{	category: "Electronics",
			 price: "$199.99",
		 stocked: true,
				name: "Nexus 7" }
];
ReactDOM.render(<FilterableProductsTable products={PRODUCTS}/>,
document.getElementById("root")
)
