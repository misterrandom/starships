import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { buildReportData } from './util';
import { StarshipCostChart, StarshipCostChartWithoutDeathStar, StarshipCountsChart } from './BarChart';

function App() {
  const [apiResponse, setApiResponse] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      // The starships api is required for cost per starship
      const shipResponse = await fetch('/api/starships');
      const ships = await shipResponse.json();
      // The films api gives film title and list of starships per film
      const filmResponse = await fetch('/api/films');
      const films = await filmResponse.json();
      // The data is manipulated client side to get it in a format that works for rendering charts
      // This logic can move to the server if there are rules applied that would be useful to other apps outside of the website
      const dataForReport = await buildReportData(films, ships);
      setApiResponse(dataForReport);
    }
    fetchApi();
    return () => {
      // cleanup can be added here if desired
    };
  }, []);
  return (
    <div className="App">
      <h1>Starship Cost per Star Wars Film</h1>
      <h3>Goal: Determine if the spend on starships has gone down over time.</h3>
      <p>At first glance, it appears that yes, the spend has gone down dramatically. This is based primarily on the most expensive starship appearing in the first movie. The Death Star is so much more expensive than the rest of the starships, that the entire data set is distorted. If it weren't for the labels on movies 2-6, you might not notice that there are more than just one value.</p>
      <h4>Total Starship Cost by Movie</h4>
      <div style={{ height: "600px" }}>
        <StarshipCostChart data={apiResponse}></StarshipCostChart>
      </div>
      <p>Excluding the death star, it's much easier to see how the trend continues in the remaining 5 movies. As seen in the following chart, the final 3 movies had a significant drop in total starship cost compared to the previous 2 movies:</p>
      <h4>Total Starship Cost by Movie (excluding the Death Star)</h4>
      <div style={{ height: "400px" }}>
        <StarshipCostChartWithoutDeathStar data={apiResponse}></StarshipCostChartWithoutDeathStar>
      </div>
      <p>Before drawing any conclusions from the data, it is important to note that there are starships in each movie where the cost is unknown. This is highlighted in the next chart.</p>
      <h4>Count of Starships with Known Cost vs Unknown Cost</h4>
      <div style={{ height: "400px" }}>
        <StarshipCountsChart data={apiResponse}></StarshipCountsChart>
      </div>
      <h3>Conclusion</h3>
      <p>While it is clear that the starship spending dropped for the last 3 movies when compared with the first 3 movies - even after excluding the Death Star, the lack of key data points makes it impossible to draw any conclusions with a high level of confidence. The 2 movies with the lowest overall starship spend also have the highest number of starships with unknown cost.</p>
    </div>
  );
}

export default App;
