import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCityList = createAsyncThunk('weather/fetchCityList ', async () => {
  try {
    const response = await axios.get('/cities.json');
    return response.data
  }
  catch (error) {
    throw (error)
  }
})

export const fetchWeatherData = createAsyncThunk('weather/fetchWeatherData', async (city) => {
  try {
    const response = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city},tr&APPID=4c0952198a288cd399002b53b2e8b8be&lang=tr`);
    return response.data
  }
  catch (error) {
    throw (error)
  }
})

export const fetchWeeklyData = createAsyncThunk(
  "weather/fetchWeeklyData",
  async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city},tr&APPID=4c0952198a288cd399002b53b2e8b8be`
      );
      const data = await response.json();
      return data.list;
    } catch (error) {
      throw error;
    }
  }
);

export const WeartherSlice = createSlice({
  name: "weather",
  initialState: {
    city: "İstanbul",
    weatherData: null,
    cityList: [],
    status: "idle",
    error: null,
    weeklyData: [],
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCityList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cityList = action.payload;
      })
      .addCase(fetchCityList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.weatherData = action.payload;
      })
      .addCase(fetchWeeklyData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeeklyData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weeklyData = action.payload;
      })
      .addCase(fetchWeeklyData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  }
})

export const selectCity = (state) => state.weather.city;
export const selectWeatherData = (state) => state.weather.weatherData;
export const selectCityList = (state) => state.weather.cityList;
export const selectWeatherStatus = (state) => state.weather.status;
export const selectWeatherError = (state) => state.weather.error;
export const selectWeeklyData = (state) => state.weather.weeklyData;

export const { setCity } = WeartherSlice.actions;

export default WeartherSlice.reducer;