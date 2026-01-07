import "./WeatherDetails.css";
import {
  FaDroplet,
  FaWind,
  FaTemperatureHalf,
  FaSun,
  FaGaugeHigh,
} from "react-icons/fa6";

function WeatherDetails({
  humidity,
  wind,
  feelsLike,
  uv,
  pressure,
}) {
  return (
    <div className="extra_details">
      <div className="detail_item">
        <FaDroplet />
        <p>Humidity</p>
        <span>{humidity}%</span>
      </div>

      <div className="detail_item">
        <FaWind />
        <p>Wind Speed</p>
        <span>{wind} km/h</span>
      </div>

      <div className="detail_item">
        <FaTemperatureHalf />
        <p>Feels Like</p>
        <span>{feelsLike} °C</span>
      </div>

      <div className="detail_item">
        <FaSun />
        <p>UV Index</p>
        <span>{uv}</span>
      </div>

      <div className="detail_item">
        <FaGaugeHigh />
        <p>Pressure</p>
        <span>{pressure} hPa</span>
      </div>
    </div>
  );
}

export default WeatherDetails;
