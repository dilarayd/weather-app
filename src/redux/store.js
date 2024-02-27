import { configureStore } from "@reduxjs/toolkit";
import  WeartherSlice  from "./WeatherSlice";
export const store = configureStore({
    reducer: {
        weather: WeartherSlice
    }
})