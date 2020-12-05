import React from "react"
import styles from "./Search.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

const Search = ({ filter, setFilter }) => {
  return (
    <div className={styles.searchBar}>
      <input
        filter={filter}
        onChange={setFilter}
        className=" pa3 ba b--green bg-lightest-blue"
        type="search"
        placeholder="rechercher..."
      />{" "}
      <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
    </div>
  )
}
export default Search
