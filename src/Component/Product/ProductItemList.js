import React from "react";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";
import Sort from "./Sort";

export default function ProductItemList({}) {
  // Retrieving the product data from the Redux store
  const data = useSelector((state) => state.products);

  // Displaying a loading spinner if the data is not available yet
  // if (data.length === 0) {
  //   return (
  //     <div className="d-flex justify-content-center mt-5">
  //       <div
  //         className="spinner-border"
  //         style={{ width: "8rem", height: "8rem" }}
  //         role="status"
  //       >
  //         <span className="visually-hidden">Loading...</span>
  //       </div>
  //     </div>
  //   );
  // } else {
    // Rendering the list of products
    return (
      <div
        className=" d-flex flex-row container-sm mt-6 flex-wrap "
        style={{ gap: "0px" }}
      >
        <Sort />
        {data.map((item) => (
          <ProductItem item={item} key={item.title} />
        ))}
      </div>
    );
  // }

}
