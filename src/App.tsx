import React from "react";
import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import FullPizza from "./pages/FullPizza";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./components/NotFoundBlock/NotFound";
import Cart from "./pages/Cart";

export const SearchContext = React.createContext({});

function App() {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<FullPizza />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}
export default App;
