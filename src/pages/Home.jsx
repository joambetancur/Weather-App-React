import useWeather from "../hooks/useWeather";
import useTheme from "../theme/useTheme";
import '../pages/Home.css'
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import WeatherDetails from "../components/WeatherDetails";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import '../components/WeatherIcon.css'

import "../App.css";

function Home() {
  const { weather, loading, error, searchWeather } = useWeather();
  const themeClass = useTheme(weather?.isDay);

  return (
    <div className={`container ${themeClass}`}>
      <div className="main_layout">
        <div className="weather_container">

          {loading && <Loader />}

          {error && <ErrorMessage message={error} />}

          {weather && !loading && !error && (
            <>
              <WeatherCard
                temperature={weather.temperature}
                location={weather.location}
                dateTime={weather.dateTime}
                condition={weather.condition}
                icon={weather.icon}
              />

              <WeatherDetails
                humidity={weather.humidity}
                wind={weather.wind}
                feelsLike={weather.feelsLike}
                uv={weather.uv}
                pressure={weather.pressure}
              />
            </>
          )}
        </div>
        <div className="search_wrapper">
          <SearchBar onSearch={searchWeather} />
        </div>
      </div>
    </div>
  );
}

export default Home;
