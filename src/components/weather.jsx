import React from "react";

const WeatherComp = (props) => {
  return (
    <div className="container">
      <h1 className="animate__animated animate__fadeIn">Current weather for {props.data.name},{props.data.sys.country}</h1>
      <div className="current-weather-info  animate__animated animate__fadeIn animate__delay-1s">
          <div className="temperature">
            <h3>{Math.round(props.data.main.temp)}°C</h3> 
            <img src={require("../icons/"+ props.data.weather[0].id+".svg")} className="svg" alt=""/>
            </div>
          <div className="min-max">
            <span className="min">{Math.round(props.data.main.temp_min)}°C</span>
            <span className="max">{Math.round(props.data.main.temp_max)}°C</span>
          </div>
      </div>
      <div className="forecast-info animate__animated animate__fadeIn animate__delay-2s">
          <ul className="weather-list">
              {props.forecast.map((hour,i) =>(
                <li key={"hour-"+i}className="weather-card  animate__animated animate__fadeIn"><span className="UpperText">{hour.dt}</span><img src={require("../icons/"+ hour.weather[0].id+".svg")} className="svg" alt=""/><span className="BottomText">{Math.round(hour.temp)}°C</span></li>
              ))}
          </ul>
      </div>
    </div>
  );
};

export default WeatherComp