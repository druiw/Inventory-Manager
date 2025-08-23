import React, { useEffect, useState } from "react";
import "./Main.css";
import supabase from "../../supabaseClient";

const Main = () => {
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [products, setProducts] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ quantity: "" });

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

  const beginEdit = (p) => {
    setEditingId(p.id);
    setDraft({ quantity: String(p.quantity) });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft({ quantity: "" });
  };

  const saveEdit = async (id) => {
    const qty = parseInt(draft.quantity, 10);
    if (Number.isNaN(qty)) return alert("Quantity must be a number");

    const { error } = await supabase
      .from("products")
      .update({ quantity: qty })
      .eq("id", id);

    if (!error) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
      );
      cancelEdit();
    } else {
      alert("Failed to update");
    }
  };

  const deleteRow = async (id) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
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
            <h1>Inventory in Supabase</h1>

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

                  <div
                    className={`cell qty ${
                      editingId === p.id ? "editing" : ""
                    }`}
                    data-label='Quantity'
                  >
                    {editingId === p.id ? (
                      <>
                        <input
                          type='number'
                          value={draft.quantity}
                          onChange={(e) =>
                            setDraft({ ...draft, quantity: e.target.value })
                          }
                        />
                        <div className='btn-group'>
                          <button onClick={() => saveEdit(p.id)}>Save</button>
                          <button onClick={cancelEdit}>Cancel</button>
                        </div>
                      </>
                    ) : (
                      <>
                        <span>{p.quantity}</span>
                        <div className='btn-group'>
                          <button onClick={() => beginEdit(p)}>Edit</button>
                          <button onClick={() => deleteRow(p.id)}>
                            Delete
                          </button>
                        </div>
                      </>
                    )}
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
