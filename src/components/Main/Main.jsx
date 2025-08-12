import React, { useEffect, useState } from "react";
import "./Main.css";
import supabase from "../../supabaseClient";

const Main = () => {
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select();
      if (error) {
        setFetchError("Could not fetch products");
        setProducts(null);
        console.log(error);
      } else {
        setProducts(data || []);
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

    const newItem = {
      id: parseInt(productId, 10),
      name: productName,
      quantity: parseInt(quantity, 10),
    };

    const { data, error } = await supabase
      .from("products")
      .insert([newItem])
      .select();

    if (error) {
      console.error("Error adding product:", error);
      alert("Failed to add stock");
    } else {
      setProducts((prev) => [...(prev ?? []), (data && data[0]) || newItem]);
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
            />

            <input
              className='input-box'
              type='text'
              placeholder='Product id'
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />

            <input
              className='input-box'
              type='text'
              placeholder='Quantity'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

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

            <div className='inventory'>
              <div className='inv header'>
                <div>Product Name</div>
                <div>Product ID</div>
                <div>Quantity</div>
              </div>

              {products?.map((p) => (
                <div className='inv row' key={p.id}>
                  <div
                    className='cell name'
                    data-label='Product Name'
                    title={p.name}
                  >
                    {p.name}
                  </div>
                  <div className='cell id' data-label='Product ID'>
                    {p.id}
                  </div>
                  <div className='cell qty' data-label='Quantity'>
                    {p.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
