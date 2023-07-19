import Nav from "./Component/Navbar/Navbar";
import ProductDetail from "./Component/Product/ProductDetail";
import AddProduct from "./Component/ProductAddition/AddProduct";
import CartItems from "./Component/Cart/CartItems";
import ProductItemList from "./Component/Product/ProductItemList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addproducts } from "./Redux/actions/index";
import customFetch from "./apiCall";
import { useEffect } from "react";

function App() {
  // Accessing the itemToDisplay state from Redux store
  let productDetailItem = useSelector((state) => state.itemToDisplay);

  const url =
    "https://my-json-server.typicode.com/thirumeniram/my-json-server/db"; // API endpoint URL

  const dispatch = useDispatch(); // Accessing the dispatch function from Redux

  // Fetching data from the API and updating the Redux store
  useEffect(() => {
    let response = customFetch(url, {
      method: "GET",
    });
    response.then((data) => {
      // Modifying the data received from the API
      let modifiedData = data.products.map((item) => {
        item.edit = true; // Adding a new property 'edit' to each item
        return item;
      });

      // Saving the modified data to localStorage for persistence
      window.localStorage.setItem("products", JSON.stringify(modifiedData));

      // Retrieving the products from localStorage
      let products = JSON.parse(window.localStorage.getItem("products"));

      // Dispatching the addproducts action to update the Redux store with the fetched products
      dispatch(addproducts(products));
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<ProductItemList />} />
          <Route path="/addproducts" element={<AddProduct />} />
          <Route
            path={`/productdetails/${productDetailItem.id}`}
            element={<ProductDetail item={productDetailItem} />}
          />
          <Route path="/cart" element={<CartItems />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
