import { useEffect, useState } from "react";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=34.5553&longitude=69.2075&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=Asia%2FKabul",
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch today's weather!");
        }

        return response.json();
      })
      .then((data) => {
        setWeather(data.current);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getWeatherStatus = (code) => {
    if (code === 0) return "☀️ Sunny";
    if (code >= 1 && code <= 3) return "⛅ Cloudy";
    if (code >= 51 && code <= 67) return "🌧️ Rainy";
    if (code >= 71 && code <= 77) return "❄️ Snowy";
    if (code >= 80 && code <= 82) return "🌦️ Showers";
    if (code >= 95) return "⛈️ Thunderstorm";

    return "🌤️ Unknown";
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #dbeafe, #eff6ff)",
      }}
    >
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-sm-10 col-md-7 col-lg-5">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              {/* Header */}
              <div
                className="text-white text-center p-4"
                style={{
                  background: "linear-gradient(135deg, #0d6efd, #0dcaf0)",
                }}
              >
                <div className="fs-1 mb-2">🌤️</div>

                <h1 className="fw-bold mb-1">Weather App</h1>

                <p className="mb-0 opacity-75">Today's weather</p>
              </div>

              <div className="card-body text-center p-4 p-md-5">
                {/* Location */}
                <div className="mb-4">
                  <h3 className="fw-bold mb-1">Kabul, Afghanistan</h3>

                  <p className="text-muted mb-0">📍 Current weather</p>
                </div>

                {/* Loading */}
                {loading && (
                  <div className="py-5">
                    <div
                      className="spinner-border text-primary"
                      role="status"
                      style={{
                        width: "3rem",
                        height: "3rem",
                      }}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>

                    <p className="text-muted mt-3 mb-0">Loading weather...</p>
                  </div>
                )}

                {/* Error */}
                {error && !loading && (
                  <div
                    className="alert alert-danger rounded-3 shadow-sm"
                    role="alert"
                  >
                    <div className="fs-3 mb-2">⚠️</div>

                    <h5 className="fw-bold">Something went wrong</h5>

                    <p className="mb-0">{error}</p>
                  </div>
                )}

                {/* Weather */}
                {weather && !loading && !error && (
                  <div>
                    {/* Temperature */}
                    <div className="mb-3">
                      <h2
                        className="fw-bold mb-0"
                        style={{
                          fontSize: "4.5rem",
                        }}
                      >
                        {weather.temperature_2m}
                        <span className="fs-2">°F</span>
                      </h2>

                      <p className="text-muted mb-0">Current temperature</p>
                    </div>

                    {/* Weather status */}
                    <div
                      className="rounded-4 p-4 mt-4"
                      style={{
                        background: "#f8f9fa",
                      }}
                    >
                      <div className="fs-1 mb-2">
                        {getWeatherStatus(weather.weather_code).split(" ")[0]}
                      </div>

                      <h4 className="fw-bold mb-0">
                        {getWeatherStatus(weather.weather_code)
                          .split(" ")
                          .slice(1)
                          .join(" ")}
                      </h4>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="text-center border-top py-3">
                <small className="text-muted">Weather data by Open-Meteo</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
