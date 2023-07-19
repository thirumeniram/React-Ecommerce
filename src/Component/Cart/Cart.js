import React from "react";
import { useDispatch } from "react-redux";
import { CartItems,DeleteCart } from "../../Redux/actions";

export default function Cart({ item }) {
  const dispatch = useDispatch();

  // Delete product from cart
  function handleCancel(item) {
    dispatch(DeleteCart(item));
    dispatch(CartItems());
  }

  return (
    <>
      {/* Items added to Cart */}
      <div className="d-flex container-sm p-1 bg-white gap-5">
        {/* Left part */}
        <img
          src={item.thumbnail}
          alt="error"
          id="card-image"
          style={{ width: "50%", height: "17rem", objectFit: "cover" }}
        />
        {/* Right part */}
        <div
          className="d-flex flex-column gap-2 justify-content-center"
          style={{ width: "50%" }}
        >
          <span>{item.title}</span>
          <span className="text-success">
            <span className="text-danger">Price:</span> Rs{item.price}
          </span>

          <div className="align-self-end mt-5">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => handleCancel(item)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
