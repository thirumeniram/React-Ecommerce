import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import ProductRating from "../ProductAddition/ProductRating";
import { ProductToview, addproducts } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import { addCart, CartItems } from "../../Redux/actions";
import { useState } from "react";

import axios from "axios";
// import { ToastContainer } from "react-toastify";
// import { showToastMessage } from "../../Notification/notify";
// import "react-toastify/dist/ReactToastify.css";

export default function ProductItem({ item }) {
  const [addedItem, setaddedItem] = useState(true);
  const [title, settitle] = useState(item.title);
  const [price, setprice] = useState(item.price);
  const [rating, setrating] = useState(item.rating);
  const [description, setdescription] = useState(item.description);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatchCart = useDispatch();
  const dispatchTotal = useDispatch();
  const dispatchProduct = useDispatch();

  function handleClick(item) {
    dispatch(ProductToview(item));
    navigate(`/productdetails/${item.id}`);
  }
  function handleCart(item) {
    if (addedItem) {
      item.qty = 1;
      dispatchCart(addCart(item));
      dispatchTotal(CartItems());
      setaddedItem(false);
      // showToastMessage("item Added to cart", "success");
      window.alert("Item added to cart successfully");
    } else {
      navigate("/cart");
    }
  }
  // function handleEdit(item) {
  //   item.edit = false;
  //   dispatchProduct(addproducts([...products]));
  // }
  function handleEdit(item) {
    const updatedItem = {
      ...item,
      edit: false,
    };
    dispatchProduct(
      addproducts([
        ...products.map((p) => (p.id === item.id ? updatedItem : p)),
      ])
    );
  }

  // making delete request
  function handleDelelteProduct(item) {
    const updatedProducts = [...products]; // Create a new copy of the products array
    const index = updatedProducts.indexOf(item);
    updatedProducts.splice(index, 1);
    dispatchProduct(addproducts(updatedProducts));
    // showToastMessage("Item deleted", "warning");
    window.alert("Item deleted from the list");
  }
  // closing edit mode
  // function handleCancel(item) {
  //   item.edit = true;
  //   dispatchProduct(addproducts([...products]));
  // }
  function handleCancel(item) {
    const updatedItem = {
      ...item,
      edit: true,
    };
    dispatchProduct(
      addproducts([
        ...products.map((p) => (p.id === item.id ? updatedItem : p)),
      ])
    );
  }

  // making put request after click on save button of edit
  function handleSave(item) {
    let url = `https://my-json-server.typicode.com/thirumeniram/my-json-server/products/${item.id}`;
    axios
      .put(url, {
        ...item,
        title,
        price,
        rating,
        description,
        edit: true,
      })
      .then((response) => {
        let updatedProducts = [...products];
        const index = updatedProducts.findIndex(
          (product) => product.id === item.id
        );
        updatedProducts[index] = response.data;

        dispatchProduct(addproducts(updatedProducts));
        // showToastMessage("Edit successful", "success");
        window.alert("Edited successfully!!");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        // showToastMessage("Failed to save changes", "error");
        window.alert("Failed to Save!!");
      });
  }

  return (
    <div
      className="d-flex container-sm bg-white px-2 py-3 mt-5 flex-wrap "
      style={{
        width: "25.6rem",
        height: "39.75rem",
        flexDirection: "row",
        marginTop: "0.35rem",
        gap: "5px",
      }}
    >
      <div>
        <img
          src={item.thumbnail}
          alt=""
          width={"390rem"}
          height={"310rem"}
          onClick={() => handleClick(item)}
        />
      </div>

      <div className="d-flex flex-column " style={{ marginTop: "-150px" }}>
        {/* <ToastContainer /> */}

        <div className="d-flex container-sm gap-5">
          <div
            className="d-flex flex-column gap-2"
            style={{ fontWeight: "bold", marginTop: "95px" }}
          >
            {item.edit ? (
              <span style={{ fontSize: "1.2rem" }}>{item.title}</span>
            ) : (
              <input
                type="text"
                value={title}
                style={{ marginTop: "15px" }}
                className="w-50"
                onChange={(e) => settitle(e.target.value)}
              ></input>
            )}
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                height: "50px",
              }}
            >
              {item.edit ? (
                <span
                  style={{
                    display: "inline-block",
                    width: "24rem",
                    height: "2rem",
                    margin: "0rem",
                    padding: "0px",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    overflow: "none",
                  }}
                >
                  {item.description}
                </span>
              ) : (
                <div>
                  <textarea
                    // className="form-control"
                    value={description}
                    id="floatingTextarea"
                    style={{
                      width: "15rem",
                      height: "5rem",
                      margin: "0rem",
                      padding: "0px",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                    onChange={(e) => setdescription(e.target.value)}
                  ></textarea>
                </div>
              )}
            </div>
            {item.edit ? (
              <div>
                <span>Price:</span>
                <span>{item.price} Rs</span>
              </div>
            ) : (
              <input
                type="text"
                value={price}
                className="w-50"
                onChange={(e) => setprice(e.target.value)}
              ></input>
            )}
            {item.edit ? (
              <div>
                <span className="rating">Rating:</span>
                <ProductRating value={item.rating} />
              </div>
            ) : (
              <div>
                <h5>Ratings:</h5>
                <input
                  type="number"
                  max={"5"}
                  min={"0"}
                  value={rating}
                  step={"0.5"}
                  onChange={(e) => setrating(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* footer section */}
        <div
          className="d-flex align-items-center justify-content-space-between gap-5 flex-lg-grow-1 p-1 "
          style={{ width: "26.75rem", marginTop: "-25px" }}
        >
          {item.edit ? (
            <button
              type="button"
              className="btn btn-primary"
              style={{
                width: "10rem",
                backgroundColor: "var(--nav)",
              }}
              onClick={() => handleCart(item)}
            >
              {addedItem ? "Add to Cart" : "Go to Cart "}
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => handleCancel(item)}
            >
              Cancel
            </button>
          )}

          {item.edit ? (
            <>
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3196/3196909.png"
                  alt="error"
                  width={"30rem"}
                  style={{ cursor: "pointer", margin: "0px 2.55rem" }}
                  onClick={() => handleEdit(item)}
                />
              </span>
              <span className="button">
                {/* <img
                  src="https://cdn-icons-png.flaticon.com/512/8556/8556073.png"
                  alt="error"
                  width={"30rem"}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelelteProduct(item)}
                /> */}
                <i
                  className="fas fa-trash-alt remove-icon"
                  onClick={() => handleDelelteProduct(item)}
                  alt="error"
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    right: "0rem",
                  }}
                ></i>
              </span>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => handleSave(item)}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
