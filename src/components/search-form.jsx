import React from "react";
const SearchForm = (props) => {
    return(
        <div className="form-wrapper">
        <form onSubmit={props.searchCity}>
<div className="search-bar">
            <input type="search" name="city" className="search-input" placeholder="Search..."></input>
            <input type="submit" className="search-btn"></input>
        </div>
        </form>
        <ul className="city-list">
            {props.searchResult.map((city,i) =>(
                <li key={"city-"+i} className="city-card" onClick={() => {props.getWeatherInfo(city.id)}}><span>{city.name},{city.sys.country}</span><img src={"https://openweathermap.org/images/flags/"+city.sys.country.toLowerCase()+".png"}alt=""/></li>
              ))}
        </ul>
        </div>
        );
    };

export default SearchForm