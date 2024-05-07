import React, { useState, Fragment } from "react";

import "./Search.css";
import { useNavigate } from "react-router-dom";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const [customerName, setcustomerName] = useState("");
  const navigate = useNavigate();

  console.log("key", keyword);
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    console.log("key", keyword);
    if (keyword.trim()) {
      navigate(`/tickets/${keyword}`);
    } else {
      navigate("/tickets`");
    }
  };

  return (
    <Fragment>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
