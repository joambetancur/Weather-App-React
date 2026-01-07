import "./WeatherCard.css";

function WeatherCard({ temperature, location, dateTime, condition, icon }) {
  return (
    <div className="main_info">
      <div className="temperature">
        <p>{temperature} °C</p>
      </div>

      <div className="time_location">
        <p>{location}</p>
        <span>{dateTime}</span>
      </div>

      <div className="condition">
        <img
          src={icon ? `https:${icon}` : ""}
          alt="weather icon"
          className="weather_icon"
        />
        <p>{condition}</p>
      </div>
    </div>
  );
}

export default WeatherCard;

