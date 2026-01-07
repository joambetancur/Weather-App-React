import { useEffect, useState, useCallback } from "react";
import { getCurrentWeather } from "../api/weatherApi";

const DEFAULT_CITY = "Medellín";

function formatDateTime(localtime) {
    const dateObject = new Date(localtime);
    const day = dateObject.toLocaleDateString("en-US", { weekday: "long" });
    const [date, time] = localtime.split(" ");
    return `${day}, ${date} | ${time}`;
}

export default function useWeather() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = useCallback(async (location) => {
        try {
            setLoading(true);
            setError(null);

            const data = await getCurrentWeather(location);

            const {
                temp_c,
                condition,
                is_day,
                humidity,
                wind_kph,
                feelslike_c,
                uv,
                pressure_mb,
            } = data.current;

            setWeather({
                temperature: temp_c,
                location: data.location.name,
                dateTime: formatDateTime(data.location.localtime),
                condition: condition.text,
                icon: condition.icon,
                isDay: is_day === 1,
                humidity,
                wind: wind_kph,
                feelsLike: feelslike_c,
                uv,
                pressure: pressure_mb,
            });
        } catch (err) {
            setError("Location not found. Please try again.");
            setWeather(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // Geolocalización + fallback
    useEffect(() => {
        if (!navigator.geolocation) {
            fetchWeather(DEFAULT_CITY);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeather(`${latitude},${longitude}`);
            },
            () => {
                fetchWeather(DEFAULT_CITY);
            }
        );
    }, [fetchWeather]);

    return {
        weather,
        loading,
        error,
        searchWeather: fetchWeather,
    };
}
