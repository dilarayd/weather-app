import './App.css';
import Select from './components/Select';
import WeatherData from './components/WeatherData';
import WeeklyData from './components/WeeklyData';

function App() {
  return (
    <div className="App">
      <Select/>
      <WeatherData/>
      <WeeklyData/>
    </div>
  );
}

export default App;
