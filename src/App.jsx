import React, { useState, useEffect ,useRef } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip ,useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import CurrentGraph from './CurrentGraph'; // Import if needed or remove if not used
import BeachReport from './BeachReport'; // Correct import for BeachReport

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
    temperature: "30°C"
  },
  {
    name: "Juhu Beach",
    position: [19.0988, 72.8260],
    safe: true,
    windSpeed: "8 km/h",
    currentStrength: "Moderate",
    currentSpeed: "0.4 m/s",
    temperature: "29°C"
  },
  {
    name: "Radhanagar Beach",
    position: [11.9847, 92.9874],
    safe: false,
    windSpeed: "20 km/h",
    currentStrength: "High",
    currentSpeed: "1.0 m/s",
    temperature: "27°C"
  },
  {
    name: "Varkala Beach",
    position: [8.7379, 76.6990],
    safe: true,
    windSpeed: "15 km/h",
    currentStrength: "Moderate",
    currentSpeed: "0.6 m/s",
    temperature: "28°C"
  },
  {
    name: "Palolem Beach",
    position: [15.0092, 74.0234],
    safe: true,
    windSpeed: "12 km/h",
    currentStrength: "Low",
    currentSpeed: "0.3 m/s",
    temperature: "28°C"
  },
  {
    name: "Kovalam Beach",
    position: [8.3997, 76.9784],
    safe: true,
    windSpeed: "14 km/h",
    currentStrength: "Moderate",
    currentSpeed: "0.5 m/s",
    temperature: "29°C"
  },
  {
    name: "Puri Beach",
    position: [19.7983, 85.8252],
    safe: false,
    windSpeed: "22 km/h",
    currentStrength: "High",
    currentSpeed: "1.1 m/s",
    temperature: "30°C"
  },
  {
    name: "Elephant Beach",
    position: [11.5354, 92.9880],
    safe: true,
    windSpeed: "16 km/h",
    currentStrength: "Moderate",
    currentSpeed: "0.7 m/s",
    temperature: "27°C"
  },
  {
    name: "Gokarna Beach",
    position: [14.5500, 74.3180],
    safe: true,
    windSpeed: "9 km/h",
    currentStrength: "Low",
    currentSpeed: "0.2 m/s",
    temperature: "29°C"
  },
  {
    name: "Mandrem Beach",
    position: [15.6755, 73.7043],
    safe: false,
    windSpeed: "18 km/h",
    currentStrength: "Very High",
    currentSpeed: "1.3 m/s",
    temperature: "26°C"
  },
  {
    name: "Agatti Island Beach",
    position: [10.8552, 72.1954],
    safe: true,
    windSpeed: "13 km/h",
    currentStrength: "Low",
    currentSpeed: "0.4 m/s",
    temperature: "28°C"
  },
  {
    name: "Bangaram Beach",
    position: [10.9440, 72.2840],
    safe: true,
    windSpeed: "11 km/h",
    currentStrength: "Moderate",
    currentSpeed: "0.6 m/s",
    temperature: "27°C"
  },
  {
    name: "Minicoy Beach",
    position: [8.2830, 73.0454],
    safe: true,
    windSpeed: "10 km/h",
    currentStrength: "Low",
    currentSpeed: "0.3 m/s",
    temperature: "29°C"
  },
  {
    name: "Alleppey Beach",
    position: [9.4899, 76.3264],
    safe: true,
    windSpeed: "12 km/h",
    currentStrength: "Moderate",
    currentSpeed: "0.5 m/s",
    temperature: "28°C"
  },
  {
    name: "Cherai Beach",
    position: [10.1429, 76.1698],
    safe: true,
    windSpeed: "13 km/h",
    currentStrength: "Low",
    currentSpeed: "0.4 m/s",
    temperature: "29°C"
  },
  {
    name: "Bekal Beach",
    position: [12.3996, 75.0366],
    safe: true,
    windSpeed: "14 km/h",
    currentStrength: "Moderate",
    currentSpeed: "0.5 m/s",
    temperature: "28°C"
  },
  {
    name: "Kappad Beach",
    position: [11.3778, 75.7098],
    safe: false,
    windSpeed: "20 km/h",
    currentStrength: "High",
    currentSpeed: "1.0 m/s",
    temperature: "27°C"
  },
  {
    name: "Muzhappilangad Drive-in Beach",
    position: [11.7923, 75.4422],
    safe: true,
    windSpeed: "9 km/h",
    currentStrength: "Low",
    currentSpeed: "0.2 m/s",
    temperature: "30°C"
  },
  {
    name: "Thottada Beach",
    position: [11.7971, 75.4238],
    safe: true,
    windSpeed: "10 km/h",
    currentStrength: "Moderate",
    currentSpeed: "0.6 m/s",
    temperature: "28°C"
  },
  {
    name: "Kannur Beach",
    position: [11.8745, 75.3704],
    safe: true,
    windSpeed: "15 km/h",
    currentStrength: "Moderate",
    currentSpeed: "0.7 m/s",
    temperature: "29°C"
  }
];

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
    }, 5000); // Update data every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const graphData = beaches.map(beach => ({
    name: beach.name,
    currentSpeed: parseFloat(beach.currentSpeed.split(' ')[0]), // Convert "0.2 m/s" to 0.2
    currentStrength: beach.currentStrength === 'Very High' ? 4 :
      beach.currentStrength === 'High' ? 3 :
      beach.currentStrength === 'Moderate' ? 2 : 1 // Convert strength to a numerical value
  }));

  return (
    <div className="app-container" style={{ height: '100vh', display: 'flex' }}>
      <div className="left-side" style={{ flex: 1, overflowY: 'auto' }}>
        <h2>Beach Report and Analytics</h2>
        {beaches.map((beach) => (
          <BeachReport
            key={beach.name}
            beach={beach}
            onMouseEnter={() => setHoveredBeach(beach)}
            onMouseLeave={() => setHoveredBeach(null)}
            isHighlighted={hoveredBeach === beach}
          />
        ))}
        <CurrentGraph data={graphData} />
      </div>
      <div className="right-side" style={{ flex: 1 }}>
        <MapContainer
          center={hoveredBeach ? hoveredBeach.position : [11.7923, 75.4422]}
          zoom={6.4}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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
