import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import NavMainpage from '../Mainpage/Nav-Mainpage';
import { URL } from '../Constant/api';

// Register the components you are using
ChartJS.register(ArcElement, Tooltip, Legend);

function Chart() {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    axios.get(`${URL}/rehome/species-aggregate`)
      .then(response => {
        const data = response.data;
        const species = data.map(item => item._id);
        const counts = data.map(item => item.count);

        setChartData({
          labels: species,
          datasets: [
            {
              label: 'Species Distribution',
              data: counts,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(error => console.error(`Error: ${error}`));
  }, []);

  return (
    <>
    <NavMainpage/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-200">
      <h2 className="text-2xl font-semibold mb-6">Pie Chart</h2>
      <div className="bg-pink-100 shadow-lg rounded-lg p-6">
        <div className="w-96 h-96">
          {Object.keys(chartData).length && <Pie data={chartData} />}
        </div>
      </div>
    </div>
    </>
  );
}

export default Chart;
