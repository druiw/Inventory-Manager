import React from "react";
import { useEffect } from "react";
import "./Main.css"; // Assuming you have a CSS file for styling
import supabase from "../../supabaseClient";

const Main = () => {
  const [productName, setProductName] = React.useState("");
  const [productId, setProductId] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [fetchError, setFetchError] = React.useState(null);
  const [products, setProducts] = React.useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select();

      if (error) {
        setFetchError("Could not fetch products");
        setProducts(null);
        console.log(error);
      }
      if (data) {
        setProducts(data);
        setFetchError(null);
      }
    };
    fetchProducts();
  }, []);

  const handleAddStock = async () => {
    if (!productName || !productId || !quantity) {
      alert("Please fill in all fields");
      return;
    }

    const { data, error } = await supabase.from("products").insert([
      {
        id: parseInt(productId),
        name: productName,
        quantity: parseInt(quantity),
      },
    ]);

    if (error) {
      console.error("Error adding product:", error);
      alert("Failed to add stock");
    } else {
      console.log("Product added:", data);
      alert("Stock Added");
      console.log(productName);
      console.log(productId);
      console.log(quantity);
      console.log(supabase);
      setProductName("");
      setProductId("");
      setQuantity("");
    }
  };

  return (
    <>
      <div className='main'>
        <div className='top'>
          <div className='input-stock-container'>
            <h1>Add Products to Inventory</h1>
            <input
              className='input-box'
              type='text'
              placeholder='Product Name'
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            ></input>
            <input
              className='input-box'
              type='text'
              placeholder='Product id'
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            ></input>
            <input
              className='input-box'
              type='text'
              placeholder='Quantity'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></input>
            <div className='add-container'>
              <button className='add-stock-button' onClick={handleAddStock}>
                Add Product
              </button>
            </div>
          </div>
          <div className='left'>
            <h1></h1>
          </div>
        </div>

        <div className='bottom'>
          {fetchError && <p>{fetchError}</p>}

          <div className='container'>
            <h1>Inventory</h1>
            <div className='category-container'>
              <div className='product-name'>
                <h3>Product Name</h3>
                {products &&
                  products.map((product) => (
                    <p key={product.id}>{product.name}</p>
                  ))}
              </div>
              <div className='product-name'>
                <h3>Product Id</h3>
                {products &&
                  products.map((product) => (
                    <p key={product.id}>{product.id}</p>
                  ))}
              </div>
              <div className='product-name'>
                <h3>Quantity</h3>
                {products &&
                  products.map((product) => (
                    <p key={product.id}>{product.quantity}</p>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
