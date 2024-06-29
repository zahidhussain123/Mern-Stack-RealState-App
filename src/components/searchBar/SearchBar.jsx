import React from 'react'
import "./searchBar.css"
import { HiLocationMarker } from 'react-icons/hi'

const SearchBar = ({filterVal, setFilterVal}) => {
  return (
    <div className="flexCenter search-bar">
    <HiLocationMarker color="var(--blue)" size={25} />
    <input type="text" placeholder="Search by title/city/country..."value={filterVal} onChange={(e) => setFilterVal(e.target.value)} />
    <button className="button">Search</button>
  </div>
  )
}

export default SearchBar