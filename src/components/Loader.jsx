import "./Loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner" aria-label="Loading"></div>
      <p>Loading weather data...</p>
    </div>
  );
}

export default Loader;
