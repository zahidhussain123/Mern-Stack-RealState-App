import React from 'react';
import "./properties.css"
import { useProperties } from '../../hooks/useProperties';
import {PuffLoader} from "react-spinners"
import SearchBar from '../../components/searchBar/SearchBar';
import PropertyCard from '../../components/propertyCard/PropertyCard';

const Properties = () => {
  const {data, isError, isLoading} = useProperties();
  if(isError){
    return (
      <div className="wrapper">
      <span>Error while fetching data</span>
    </div>
    )
  }

  if(isLoading){
    return(
      <div className='wrapper flexCenter' style={{height:"60vh"}}>
      <PuffLoader
      width="80"
      height="80"
      radius={1}
      color='#4066ff'
      aria-label='puff-loading'
      />
      </div>
    )
  }
  return (
    <div className='wrapper'>
      <div className='"flexColCenter paddings innerWidth properties-container'>
        <SearchBar />
        <div  className="paddings flexCenter properties">
        {data && data?.residencies?.map((card, i) => <PropertyCard card={card} key={i} />)}
        </div>
      </div>
    </div>
  )
}

export default Properties