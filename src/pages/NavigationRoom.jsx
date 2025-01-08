import React from 'react';
import planets from '../data/planets';
import HomeButton from '../components/HomeButton';

const NavigationRoom = ({
  unlockedPlanets, // List of unlocked planets
  setSelectedPlanet, // Function to update selected planet
  addLog,
  navigationLevel,
}) => {

  const handleSelectPlanet = (planetId) => {
    // Find the planet object based on the planetId
    const planet = planets.find((p) => p.id === planetId);
  
    // Check if planet was found and log the name instead of the ID
    if (planet) {
      setSelectedPlanet(planetId);
      addLog(`Selected Planet: ${planet.name}`); // Log the name of the planet
    } else {
      addLog(`Planet not found with ID: ${planetId}`);
    }
  };
  

  return (
    <div className="navigation-room">
      <HomeButton />
      <h1>Navigation Room</h1>
      <p>This room enables you to select different planets to travel to and gather new and unique resources for upgrades.</p>
      <p>Each level up unlocks a new planet to select and explore.</p>
      <p>Navigation Room Level: {navigationLevel}</p>
      <div className="planet-selection">
        <h2>Select a Planet:</h2>
        {unlockedPlanets.map((planetId) => {
          // Find the planet's name using its id
          const planet = planets.find((p) => p.id === planetId);
          return (
            <button
              key={planetId}
              onClick={() => handleSelectPlanet(planetId)}
            >
              {planet ? planet.name : `Planet ${planetId}`}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationRoom;
