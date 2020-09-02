import React from "react";

const WeatherComp = (props) => {
  return (
    <div className="container">
      <h1>Current weather for {props.data.name},{props.data.sys.country}</h1>
      <div className="current-weather-info">
          <div className="temperature">
            <h3>{props.data.main.temp}°C</h3> 
            <img src={require("../icons/"+ props.data.weather[0].id+".svg")}   style={{filter: "invert(1)"}} alt=""/>
            </div>
          <div className="min-max">
              {props.data.main.temp_min}
              {props.data.main.temp_max}
          </div>
      </div>
      <div className="forecast-info">
          <ul className="weather-list">
              {props.forecast.map((hour,i) =>(
                <li key={"hour-"+i}className="weather-card"><span className="UpperText">{hour.dt}</span><img src={require("../icons/"+ hour.weather[0].id+".svg")} style={{filter: "invert(1)"}} alt=""/><span className="BottomText">{Math.round(hour.temp)}°C</span></li>
              ))}
          </ul>
      </div>
    </div>
  );
};

export default WeatherComp