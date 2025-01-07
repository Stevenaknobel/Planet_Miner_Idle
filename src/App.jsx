import React, { useState, useEffect,} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NavigationRoom from './pages/NavigationRoom';
import DroneRoom from './pages/DroneRoom';
import AIDialog from './components/AIDialog';
import planets from './data/planets';

const App = () => {
  // Global States
  const [resources, setResources] = useState({
    scrap: 0,
    copper: 0,
    aluminum: 0,
    nickel: 0,
    carbon: 0,
    graphene: 0,
    silicon: 0,
    lithium: 0,
    tungsten: 0,
    zirconium: 0,
    titanium: 0,
    andreasite: 0,
    bazium: 0,
    samborium: 0,
    owenite: 0,
    joenite: 0,
    theonite: 0,
    jakium: 0,
    kennium: 0
  });

  const [aiLogs, setAiLogs] = useState(['AI: Welcome back, Captain!']);
  const [selectedPlanet, setSelectedPlanet] = useState(1); // Default: Planet 1
  const [navigationLevel, setNavigationLevel] = useState(0); // Set initial value to 0
  const [droneRoomLevel, setDroneRoomLevel] = useState(0); // Set initial value to 0
  const [unlockedPlanets, setUnlockedPlanets] = useState([1]); // Starting with Planet 1 unlocked


  // Manage drones - store drone counts globally
  const [drones, setDrones] = useState({});

  // Load drones from localStorage if available (persistent storage)
  useEffect(() => {
    const savedDrones = JSON.parse(localStorage.getItem('drones'));
    if (savedDrones) {
      setDrones(savedDrones);
    }
  }, []);

  // Save drones to localStorage for persistence
  useEffect(() => {
    if (drones) {
      localStorage.setItem('drones', JSON.stringify(drones));
    }
  }, [drones]);
//Save levels and resources to local storage
  useEffect(() => {
    const savedResources = JSON.parse(localStorage.getItem('resources'));
    const savedNavigationLevel = JSON.parse(localStorage.getItem('navigationLevel'));
    const savedDroneRoomLevel = JSON.parse(localStorage.getItem('droneRoomLevel'));
    const savedUnlockedPlanets = JSON.parse(localStorage.getItem('unlockedPlanets'));
    
    if (savedResources) {
      setResources(savedResources);
    }
    if (savedNavigationLevel !== null) {
      setNavigationLevel(savedNavigationLevel);
    }
    if (savedDroneRoomLevel !== null) {
      setDroneRoomLevel(savedDroneRoomLevel);
    }
    if (savedUnlockedPlanets) {
      setUnlockedPlanets(savedUnlockedPlanets);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('resources', JSON.stringify(resources));
    localStorage.setItem('navigationLevel', JSON.stringify(navigationLevel));
    localStorage.setItem('droneRoomLevel', JSON.stringify(droneRoomLevel));
    localStorage.setItem('unlockedPlanets', JSON.stringify(unlockedPlanets));
  }, [resources, navigationLevel, droneRoomLevel, unlockedPlanets]);


  // Global resource accumulation - runs every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setResources((prev) => {
        const newResources = { ...prev };
        Object.entries(drones).forEach(([resource, count]) => {
          // Assume drones produce 5 resources per minute
          newResources[resource] = (newResources[resource] || 0) + count * 5;
        });
        return newResources;
      });
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [drones]);

  // Add a message to the AI Dialog
  const addLog = (message) => {
    setAiLogs((prevLogs) => [...prevLogs, `AI: ${message}`]);
  };

  // Update unlocked planets when navigation level increases
  const handleNavigationUpgrade = () => {
    const newLevel = navigationLevel + 1;
    setNavigationLevel(newLevel);

    // Unlock the next planet based on the new level
    if (newLevel <= planets.length && !unlockedPlanets.includes(newLevel + 1)) {
      setUnlockedPlanets((prev) => [...prev, newLevel + 1]);
    }
  };

  return (
    <div className="app">
      <Navbar
        resources={resources}
        selectedPlanet={selectedPlanet}
        setResources={setResources}
        addLog={addLog}
        aiLogs={aiLogs}
        setDrones={setDrones}  // Pass setDrones here for reset button
        setNavigationLevel={setNavigationLevel} // Pass setDrones here for reset button
        setDroneRoomLevel={setDroneRoomLevel} // Pass setDrones here for reset button
      />
      <main style={{ paddingTop: `20px`, flex: 1, overflowY: 'auto' }}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                navigationLevel={navigationLevel}
                droneRoomLevel={droneRoomLevel}
                setNavigationLevel={setNavigationLevel}
                setDroneRoomLevel={setDroneRoomLevel}
                setResources={setResources}
                addLog={addLog}
                unlockedPlanets={unlockedPlanets} // Pass unlocked planets
                handleNavigationUpgrade={handleNavigationUpgrade} // Pass the function here
              />
            }
          />
          <Route
            path="/navigation-room"
            element={
              <NavigationRoom
                unlockedPlanets={unlockedPlanets}  // Pass unlocked planets to NavigationRoom
                setSelectedPlanet={setSelectedPlanet} // To update the selected planet
                addLog={addLog}
                navigationLevel={navigationLevel} // To check navigation level
              />
            }
          />
          <Route
            path="/drone-room"
            element={
              <DroneRoom
                unlockedResources={Object.keys(resources)} // Show all resources regardless of amount
                level={droneRoomLevel}
                setResources={setResources}
                addLog={addLog}
                dronesFromApp={drones} // Pass drones as a prop
                setDrones={setDrones} // Pass the function to update drones
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
