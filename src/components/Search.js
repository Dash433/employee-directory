import React from "react";
import "../styles/search.css";

const styles = {
  search: {
    margin: 30,
  }
}

function Search(props) {
  return (
    <form>
      <div style={styles.search} className="form-group">
        <input
          onChange={props.handleInputChange}
          value={props.value}
          name="search"
          type="text"
          className="form-control"
          placeholder="Search"
          id="search"
        />
      </div>
    </form>
  );
}

export default Search;

