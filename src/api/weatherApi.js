const API_KEY = "aa0903ca1d74404f89805015251312";
const BASE_URL = "https://api.weatherapi.com/v1";

/**
 * Buscar ubicaciones (autocompletado)
 * @param {string} query
 * @returns {Promise<Array>}
 */
export const searchLocations = async (query) => {
    if (!query || query.length < 3) return [];

    const response = await fetch(
        `${BASE_URL}/search.json?key=${API_KEY}&q=${query}`
    );

    if (!response.ok) {
        throw new Error("Error fetching location suggestions");
    }

    return response.json();
};

/**
 * Obtener clima actual por ciudad o coordenadas
 * @param {string} location 
 * @returns {Promise<Object>}
 */
export const getCurrentWeather = async (location) => {
    const response = await fetch(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${location}&aqi=no`
    );

    if (!response.ok) {
        throw new Error("Location not found");
    }

    return response.json();
};
