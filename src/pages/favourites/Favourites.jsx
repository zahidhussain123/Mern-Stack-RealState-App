import React, { useContext } from "react";
import "../properties/properties.css";
import  {useProperties}  from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import SearchBar from "../../components/searchBar/SearchBar";
import PropertyCard from "../../components/propertyCard/PropertyCard";
import { useState } from "react";
import UserDetailsContext from "../../context/UserDetailsContext";

const Favourites = () => {
  const { data, isError, isLoading } = useProperties();
  const {
    userDetails: { favourites },
  } = useContext(UserDetailsContext);
  const [filterVal, setFilterVal] = useState("");
  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          width="80"
          height="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }
  return (
    <div className="wrapper">
      <div className='"flexColCenter paddings innerWidth properties-container'>
        <SearchBar filterVal={filterVal} setFilterVal={setFilterVal} />
        <div className="paddings flexCenter properties">
          {data?.residencies
            ?.filter((property) =>
                favourites?.includes(property?.id)
            )
            ?.filter(
              (property) =>
                property?.title
                  ?.toLowerCase()
                  ?.includes(filterVal?.toLowerCase()) ||
                property?.city?.toLowerCase()?.includes(filterVal?.toLowerCase()) ||
                property?.country?.toLowerCase()?.includes(filterVal?.toLowerCase())
            )
            ?.map((card, i) => (
              <PropertyCard card={card} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
