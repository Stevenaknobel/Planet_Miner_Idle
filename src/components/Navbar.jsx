// components/Navbar.jsx
import React, { useState, forwardRef } from 'react';
import planets from '../data/planets';
import ResourceDisplay from './ResourceDisplay';
import AIDialog from './AIDialog';

const Navbar =({ selectedPlanet, resources, setResources, addLog, aiLogs, setDrones, setDroneRoomLevel, setNavigationLevel }) => {
  const [isTraveling, setIsTraveling] = useState(false);
  const [isMining, setIsMining] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // New state variables for the timers
  const [travelTimeLeft, setTravelTimeLeft] = useState(0);
  const [miningTimeLeft, setMiningTimeLeft] = useState(0);

  const handleLaunch = () => {
    if (!selectedPlanet) {
      addLog('No planet selected.');
      return;
    }
  
    const planet = planets.find((p) => p.id === selectedPlanet);
    addLog(`Launching ship to ${planet.name}...`);
    setIsTraveling(true);
    setIsPressed(true);
  
    // Set travel time countdown
    setTravelTimeLeft(planet.travelTime);
  
    const travelInterval = setInterval(() => {
      setTravelTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(travelInterval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  
    setTimeout(() => {
      addLog(`Arrived at ${planet.name}. Starting mining.`);
      setIsTraveling(false);
      setIsMining(true);
  
      // Set mining time countdown
      setMiningTimeLeft(planet.miningTime);
  
      const miningInterval = setInterval(() => {
        setMiningTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(miningInterval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
  
      setTimeout(() => {
        // Create a formatted log message for mined resources
        const minedResources = Object.entries(planet.resources)
          .map(([resource, amount]) => `${resource.charAt(0).toUpperCase() + resource.slice(1)}: ${amount}`)
          .join(', ');
  
        addLog(`Mining complete on ${planet.name}. Resources mined: ${minedResources}`);
  
        // Update resources
        setResources((prev) => {
          const newResources = { ...prev };
          Object.entries(planet.resources).forEach(([resource, amount]) => {
            newResources[resource] = (newResources[resource] || 0) + amount;
          });
          return newResources;
        });
  
        setIsMining(false);
        setIsPressed(false);
      }, planet.miningTime * 1000);
    }, planet.travelTime * 1000);
  };
  

const resetApp = () => {
   // Show confirmation dialog
   const isConfirmed = window.confirm('Are you sure you want to reset the game? This will erase all progress.');

   // Proceed only if the user confirms the reset
   if (isConfirmed) {
  localStorage.clear(); // Clears all localStorage
  setResources({
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
  setDrones({});
  setNavigationLevel(0);
  setDroneRoomLevel(0);
}
};
  return (
    <div className="navbar">
      <div className="navbar-buttons">
        <h1>Planet Miner Idle</h1>
        <button onClick={handleLaunch} disabled={isTraveling || isMining || isPressed}>
          <img 
            src={isPressed ? '/shiplaunchedbutton.png' : '/launchshipbutton.png'}
            alt="Launch Ship" 
            style={{ width: '200px', height: 'auto' }} // You can adjust the size as needed
          />
        </button>
        <button onClick={resetApp}>Reset Game</button>
              {/* Display the timers */}
      <div>
        {isTraveling && <p>Traveling to {planets.find((p) => p.id === selectedPlanet)?.name}... Time left: {travelTimeLeft}s</p>}
        {isMining && <p>Mining {planets.find((p) => p.id === selectedPlanet)?.name}... Time left: {miningTimeLeft}s</p>}
      </div>
      </div>
      <div>
        <AIDialog logs={aiLogs} />
      </div>
      <div>      
        <ResourceDisplay resources={resources} />
      </div>
    </div>
  );
};

export default Navbar;