import { useMemo } from "react";

/**
 * Hook para manejar el tema día / noche
 * @param {boolean} isDay - true si es día, false si es noche
 * @returns {string} themeClass
 */
export default function useTheme(isDay) {
    const theme = useMemo(() => {
        if (isDay === undefined || isDay === null) return "day-mode";
        return isDay ? "day-mode" : "night-mode";
    }, [isDay]);

    return theme;
}
