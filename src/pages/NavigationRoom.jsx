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
    // Just update the selected planet without routing anywhere
    setSelectedPlanet(planetId);
    addLog(`Selected Planet ${planetId}`);
  };

  return (
    <div className="navigation-room">
        <HomeButton/>
      <h1>Navigation Room</h1>
      <p>This room enables you to select different planets to travel to and gather new and unique resources for upgrades.</p>
      <p>Each level up unlocks a new planet to select and explore.</p>
      <p>Navigation Room Level: {navigationLevel}</p>
      <div className="planet-selection">
        <h2>Select a Planet:</h2>
        {unlockedPlanets.map((planetId) => (
          <button
            key={planetId}
            onClick={() => handleSelectPlanet(planetId)}
          >
            Planet {planetId}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationRoom;
