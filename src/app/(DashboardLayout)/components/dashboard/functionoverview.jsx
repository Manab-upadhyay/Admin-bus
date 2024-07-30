import { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

const LineChart = () => {
  const chartContainerCPU = useRef(null);
  const chartInstanceCPURef = useRef(null);
  const chartContainerMemory = useRef(null);
  const chartInstanceMemoryRef = useRef(null);

  // State variables to store CPU usage data arrays
  const [userData, setUserData] = useState([]);
  const [sysData, setSysData] = useState([]);
  const [idleData, setIdleData] = useState([]);

  // State variables to store memory usage data arrays
  const [totalMemoryData, setTotalMemoryData] = useState([]);
  const [usedMemoryData, setUsedMemoryData] = useState([]);
  const [freeMemoryData, setFreeMemoryData] = useState([]);

  useEffect(() => {
    const fetchDataAndRenderCharts = async () => {
      try {
        const response = await fetch("http://localhost:6969/cpu-usage");
        if (!response.ok) {
          throw new Error("Failed to fetch CPU and Memory usage data");
        }
        const data = await response.json();

        // Update state variables with new CPU usage data
        setUserData(prevData => [...prevData, data.cpu.user.toFixed(2)]);
        setSysData(prevData => [...prevData, data.cpu.sys.toFixed(2)]);
        setIdleData(prevData => [...prevData, data.cpu.idle.toFixed(2)]);

        // Update state variables with new Memory usage data
        setTotalMemoryData(prevData => [...prevData, data.memory.total.toFixed(2)]);
        setUsedMemoryData(prevData => [...prevData, data.memory.used.toFixed(2)]);
        setFreeMemoryData(prevData => [...prevData, data.memory.free.toFixed(2)]);
      } catch (error) {
        console.error('Error fetching CPU and Memory usage:', error);
      }
    };

    // Initial fetch and render
    fetchDataAndRenderCharts();

    // Fetch and render chart every 10 seconds
    const interval = setInterval(fetchDataAndRenderCharts, 10000);

    return () => {
      clearInterval(interval);
      if (chartInstanceCPURef.current) {
        chartInstanceCPURef.current.destroy();
      }
      if (chartInstanceMemoryRef.current) {
        chartInstanceMemoryRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (chartContainerCPU.current) {
      const ctx = chartContainerCPU.current.getContext('2d');

      if (chartInstanceCPURef.current) {
        chartInstanceCPURef.current.destroy();
      }

      chartInstanceCPURef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: userData.map((_, index) => index + 1), // Use indices as labels
          datasets: [
            {
              label: 'User',
              data: userData,
              fill: false,
              borderColor: '#8884d8',
              tension: 0.1
            },
            {
              label: 'Sys',
              data: sysData,
              fill: false,
              borderColor: '#82ca9d',
              tension: 0.1
            },
            {
              label: 'Idle',
              data: idleData,
              fill: false,
              borderColor: '#ffc658',
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          onClick: (e) => {
            const canvasPosition = getRelativePosition(e, chartInstanceCPURef.current);

            const dataX = chartInstanceCPURef.current.scales.x.getValueForPixel(canvasPosition.x);
            const dataY = chartInstanceCPURef.current.scales.y.getValueForPixel(canvasPosition.y);

            console.log(`Clicked data point: X = ${dataX}, Y = ${dataY}`);
          }
        }
      });
    }
  }, [userData, sysData, idleData]);

  useEffect(() => {
    if (chartContainerMemory.current) {
      const ctx = chartContainerMemory.current.getContext('2d');

      if (chartInstanceMemoryRef.current) {
        chartInstanceMemoryRef.current.destroy();
      }

      chartInstanceMemoryRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: totalMemoryData.map((_, index) => index + 1), // Use indices as labels
          datasets: [
            {
              label: 'Total Memory',
              data: totalMemoryData,
              fill: false,
              borderColor: '#8884d8',
              tension: 0.1
            },
            {
              label: 'Used Memory',
              data: usedMemoryData,
              fill: false,
              borderColor: '#82ca9d',
              tension: 0.1
            },
            {
              label: 'Free Memory',
              data: freeMemoryData,
              fill: false,
              borderColor: '#ffc658',
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
            },
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          onClick: (e) => {
            const canvasPosition = getRelativePosition(e, chartInstanceMemoryRef.current);

            const dataX = chartInstanceMemoryRef.current.scales.x.getValueForPixel(canvasPosition.x);
            const dataY = chartInstanceMemoryRef.current.scales.y.getValueForPixel(canvasPosition.y);

            console.log(`Clicked data point: X = ${dataX}, Y = ${dataY}`);
          }
        }
      });
    }
  }, [totalMemoryData, usedMemoryData, freeMemoryData]);

  return (
    <div>
      <h2>Interactive CPU and Memory Usage Charts</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ position: "relative", width: "400px", height: "400px" }}>
          <canvas ref={chartContainerCPU}></canvas>
        </div>
        <div style={{ position: "relative", width: "400px", height: "400px" }}>
          <canvas ref={chartContainerMemory}></canvas>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
