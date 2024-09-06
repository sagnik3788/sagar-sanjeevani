import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import BeachReport from './BeachReport';
import CurrentGraph from './CurrentGraph';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
);

// Custom marker icons
const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const initialBeaches = [
  {
    name: "Marina Beach",
    position: [13.0500, 80.2824],
    safe: true,
    windSpeed: "10 km/h",
    currentStrength: "Low",
    currentSpeed: "0.2 m/s",
    temperature: "30°C",
    Grade: "A"
  },
  {
    name: "Juhu Beach",
    position: [19.0988, 72.8260],
    safe: true,
    windSpeed: "8 km/h",
    currentStrength: "Moderate",
    currentSpeed: "0.4 m/s",
    temperature: "29°C",
    Grade: "B"
  },
  {
    name: "Radhanagar Beach",
    position: [11.9847, 92.9874],
    safe: false,
    windSpeed: "20 km/h",
    currentStrength: "High",
    currentSpeed: "1.0 m/s",
    temperature: "27°C",
    Grade: "D"
  },
  {
    name: "Varkala Beach",
    position: [8.7379, 76.6990],
    safe: true,
    windSpeed: "15 km/h",
    currentStrength: "Moderate",
    currentSpeed: "0.6 m/s",
    temperature: "28°C",
    Grade: "A"
  },
  {
    name: "Palolem Beach",
    position: [15.0092, 74.0234],
    safe: true,
    windSpeed: "12 km/h",
    currentStrength: "Low",
    currentSpeed: "0.3 m/s",
    temperature: "28°C",
    Grade: "C"
  },
  {
    name: "Kovalam Beach",
    position: [8.3997, 76.9784],
    safe: true,
    windSpeed: "14 km/h",
    currentStrength: "Moderate",
    currentSpeed: "0.5 m/s",
    temperature: "29°C",
    Grade: "B"
  },
  {
    name: "Puri Beach",
    position: [19.7983, 85.8252],
    safe: false,
    windSpeed: "22 km/h",
    currentStrength: "High",
    currentSpeed: "1.1 m/s",
    temperature: "30°C",
    Grade: "A"
  },
  {
    name: "Elephant Beach",
    position: [11.5354, 92.9880],
    safe: true,
    windSpeed: "16 km/h",
    currentStrength: "Moderate",
    currentSpeed: "0.7 m/s",
    temperature: "27°C",
    Grade: "A"
  },
  {
    name: "Gokarna Beach",
    position: [14.5500, 74.3180],
    safe: true,
    windSpeed: "9 km/h",
    currentStrength: "Low",
    currentSpeed: "0.2 m/s",
    temperature: "29°C",
    Grade: "B"
  },
  {
    name: "Mandrem Beach",
    position: [15.6755, 73.7043],
    safe: false,
    windSpeed: "18 km/h",
    currentStrength: "Very High",
    currentSpeed: "1.3 m/s",
    temperature: "26°C",
    Grade: "C"
  },
  {
    name: "Agatti Island Beach",
    position: [10.8552, 72.1954],
    safe: true,
    windSpeed: "13 km/h",
    currentStrength: "Low",
    currentSpeed: "0.4 m/s",
    temperature: "28°C",
   Grade: "A"
  },
  {
    name: "Bangaram Beach",
    position: [10.9440, 72.2840],
    safe: true,
    windSpeed: "11 km/h",
    currentStrength: "Moderate",
    currentSpeed: "0.6 m/s",
    temperature: "27°C",
    Grade: "B"
  },
  {
    name: "Minicoy Beach",
    position: [8.2830, 73.0454],
    safe: true,
    windSpeed: "10 km/h",
    currentStrength: "Low",
    currentSpeed: "0.3 m/s",
    temperature: "29°C",
    Grade: "A"
  },
  {
    name: "Alleppey Beach",
    position: [9.4899, 76.3264],
    safe: true,
    windSpeed: "12 km/h",
    currentStrength: "Moderate",
    currentSpeed: "0.5 m/s",
    temperature: "28°C",
    Grade: "D"
  },
  {
    name: "Cherai Beach",
    position: [10.1429, 76.1698],
    safe: true,
    windSpeed: "13 km/h",
    currentStrength: "Low",
    currentSpeed: "0.4 m/s",
    temperature: "29°C",
    Grade: "A"
  },
  {
    name: "Bekal Beach",
    position: [12.3996, 75.0366],
    safe: true,
    windSpeed: "14 km/h",
    currentStrength: "Moderate",
    currentSpeed: "0.5 m/s",
    temperature: "28°C",
    Grade: "B"
  },
  {
    name: "Kappad Beach",
    position: [11.3778, 75.7098],
    safe: false,
    windSpeed: "20 km/h",
    currentStrength: "High",
    currentSpeed: "1.0 m/s",
    temperature: "27°C",
    Grade: "B"
  },
  {
    name: "Sagar Island Beach",
    position: [21.6491, 88.0786],
    safe: false,
    windSpeed: "20 km/h",
    currentStrength: "High",
    currentSpeed: "1.1 m/s",
    temperature: "27°C",
    Grade: "C"
  },
  {
    name: "Talasari Beach",
    position: [21.5788, 87.4486],
    safe: true,
    windSpeed: "9 km/h",
    currentStrength: "Low",
    currentSpeed: "0.3 m/s",
    temperature: "29°C",
    Grade: "A"
  },
  {
    name: "Gopalpur Beach",
    position: [19.2597, 84.9080],
    safe: true,
    windSpeed: "10 km/h",
    currentStrength: "Low",
    currentSpeed: "0.4 m/s",
    temperature: "28°C",
    Grade: "D"
  },
  {
    name: "Lalaji Bay Beach",
    position: [12.1214, 93.0602],
    safe: false,
    windSpeed: "10 km/h",
    currentStrength: "Low",
    currentSpeed: "0.3 m/s",
    temperature: "28°C",
    Grade: "A"
  },

  {
    name: "Laxmanpur Beach",
    position: [11.6667, 93.0167],
    safe: false,
    windSpeed: "8 km/h",
    currentStrength: "Low",
    currentSpeed: "0.2 m/s",
    temperature: "29°C",
    Grade: "A"

  },
  {
    name: "Merk Bay Beach",
    position: [12.3384, 92.9167],
    safe: true,
    windSpeed: "11 km/h",
    currentStrength: "Low",
    currentSpeed: "0.3 m/s",
    temperature: "27°C",
    Grade: "D"
  },
  {
    name: "Baludera Beach",
    position: [12.0144, 92.9513],
    safe: true,
    windSpeed: "14 km/h",
    currentStrength: "Moderate",
    currentSpeed: "0.5 m/s",
    temperature: "28°C",
    Grade: "A"
  }
  
];

const generateGraphData = (beaches, attribute, min, max) => {
  return beaches.map(beach => ({
    name: beach.name,
    value: (Math.random() * (max - min) + min).toFixed(2), // Random value within the range
  }));
};

const MapViewUpdater = ({ hoveredBeach }) => {
  const map = useMap();

  useEffect(() => {
    if (hoveredBeach) {
      map.setView(hoveredBeach.position, map.getZoom());
    }
  }, [hoveredBeach, map]);

  return null;
};

const App = () => {
  const [beaches, setBeaches] = useState(initialBeaches);
  const [hoveredBeach, setHoveredBeach] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBeaches((prevBeaches) =>
        prevBeaches.map((beach) => ({
          ...beach,
          windSpeed: `${Math.floor(Math.random() * 20) + 5} km/h`,
          currentSpeed: `${(Math.random() * 1.5).toFixed(1)} m/s`,
        }))
      );
    }, 500000000); // Update data every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const graphData1 = beaches.map(beach => ({
    name: beach.name,
    currentSpeed: parseFloat(beach.currentSpeed.split(' ')[0]), // Convert "0.2 m/s" to 0.2
    currentStrength: beach.currentStrength === 'Very High' ? 4 :
      beach.currentStrength === 'High' ? 3 :
      beach.currentStrength === 'Moderate' ? 2 : 1 // Convert strength to a numerical value
  }));

  // Generate dummy data for graphs
  const pHData = generateGraphData(beaches, 'pH', 6.5, 8.5);
  const turbidityData = generateGraphData(beaches, 'turbidity', 0, 100);
  const salinityData = generateGraphData(beaches, 'salinity', 30, 40);

  const createGraph = (label, data, color) => {
    return {
      labels: data.map(item => item.name), // X-axis labels
      datasets: [
        {
          label,
          data: data.map(item => item.value), // Y-axis data
          backgroundColor: color,
          borderColor: color,
          fill: false,
          tension: 0.1,
        },
      ],
      options: {
        scales: {
          x: {
            type: 'category',
          },
          y: {
            type: 'linear',
          },
        },
      },
    };
  };

  return (
    <div className="app-container" style={{ height: '100vh', display: 'flex' }}>
      <div className="app-header">Sagar Sanjeevani</div>
      <div className="left-side" style={{ flex: 1, overflowY: 'auto' }}>
        <h2 className='beach-re'>Beach Report and Analytics</h2>
        <h3>Current</h3>
        <CurrentGraph data={graphData1} />
        <h3>pH Levels</h3>
        <Line key="ph-graph" data={createGraph('pH Level', pHData, 'rgba(75,192,192,1)')} />

        <h3>Turbidity Levels</h3>
        <Line key="turbidity-graph" data={createGraph('Turbidity Level', turbidityData, 'rgba(255,99,132,1)')} />

        <h3>Salinity Levels</h3>
        <Line key="salinity-graph" data={createGraph('Salinity Level', salinityData, 'rgba(54,162,235,1)')} />
        {beaches.map((beach) => (
          <BeachReport
            key={beach.name}
            beach={beach}
            onMouseEnter={() => setHoveredBeach(beach)}
            onMouseLeave={() => setHoveredBeach(null)}
            isHighlighted={hoveredBeach === beach}
          />
        ))}
      
      </div>
      <div className="right-side" style={{ flex: 1 }}>
        <MapContainer
          center={hoveredBeach ? hoveredBeach.position : [11.7923, 75.4422]}
          zoom={6.4}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapViewUpdater hoveredBeach={hoveredBeach} />
          {beaches.map((beach) => (
            <Marker
              key={beach.name}
              position={beach.position}
              icon={beach.safe ? greenIcon : redIcon}
            >
              <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                <div>
                  <h3>{beach.name}</h3>
                  <p><strong>Wind Speed:</strong> {beach.windSpeed}</p>
                  <p><strong>Current Strength:</strong> {beach.currentStrength}</p>
                  <p><strong>Current Speed:</strong> {beach.currentSpeed}</p>
                  <p><strong>Temperature:</strong> {beach.temperature}</p>
                  <p><strong>Grade:</strong> {beach.Grade}</p>

                  {!beach.safe && (
                    <p style={{ color: 'red', fontWeight: 'bold' }}>
                      WARNING: High-risk conditions!
                    </p>
                  )}
                </div>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default App;