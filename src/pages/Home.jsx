import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import to navigate to other routes

const Home = ({
  navigationLevel,
  droneRoomLevel,
  setNavigationLevel,
  setDroneRoomLevel,
  setResources,
  addLog,
  unlockedPlanets,
  handleNavigationUpgrade,  // Receive this function as a prop
}) => {
  const navigate = useNavigate();

  // Cost arrays for upgrading the rooms
  const navigationCosts = [
    { scrap: 100 },
    { scrap: 200, copper: 100 },
    { scrap: 500, aluminum: 250, nickel: 100 },
    { aluminum: 1000, carbon: 600, graphene: 400 },
    { carbon: 1800, graphene: 1400, silicon: 1000 },
    { carbon: 3000, silicon: 2500, lithium: 2000 },
    { silicon: 5000, lithium: 4000, tungsten: 3000 },
    { lithium: 7000, tungsten: 6000, zirconium: 5000 },
    { tungsten: 8000, zirconium: 7000, titanium: 6000 },
    { scrap: 20000, zirconium: 10000, titanium: 9000, andreasite: 8000 },
    { copper: 25000, titanium: 12500, andreasite: 11000, bazium: 10000 },
    { aluminum: 30000, andreasite: 16000, bazium: 13000, samborium: 11000 },
    { nickel: 35000, bazium: 20000, samborium: 17500, owenite: 15000 },
    { carbon: 40000, samborium: 25000, owenite: 20000, joenite: 17500 },
    { graphene: 45000, owenite: 30000, joenite: 25000, theonite: 22500 },
    { silicon: 50000, joenite: 40000, theonite: 38000, jakium: 36000 }
  ];

  const droneRoomCosts = [
    { scrap: 100 },
    { scrap: 200, copper: 100 },
    { scrap: 500, aluminum: 250, nickel: 100 },
    { aluminum: 1000, carbon: 600, graphene: 400 },
    { carbon: 1800, graphene: 1400, silicon: 1000 },
    { carbon: 3000, silicon: 2500, lithium: 2000 },
    { silicon: 5000, lithium: 4000, tungsten: 3000 },
    { lithium: 7000, tungsten: 6000, zirconium: 5000 },
    { tungsten: 8000, zirconium: 7000, titanium: 6000 },
    { scrap: 20000, zirconium: 10000, titanium: 9000, andreasite: 8000 },
    { copper: 25000, titanium: 12500, andreasite: 11000, bazium: 10000 },
    { aluminum: 30000, andreasite: 16000, bazium: 13000, samborium: 11000 },
    { nickel: 35000, bazium: 20000, samborium: 17500, owenite: 15000 },
    { carbon: 40000, samborium: 25000, owenite: 20000, joenite: 17500 },
    { graphene: 45000, owenite: 30000, joenite: 25000, theonite: 22500 },
    { silicon: 50000, joenite: 40000, theonite: 38000, jakium: 36000 }
  ];

  const handleUpgradeNavigation = () => {
    const level = navigationLevel;
    if (level >= navigationCosts.length) {
      addLog('Navigation Room is at max level.');
      return;
    }

    const cost = navigationCosts[level];
    setResources((prev) => {
      const newResources = { ...prev };
      let canUpgrade = true;
      Object.entries(cost).forEach(([res, amount]) => {
        if ((newResources[res] || 0) < amount) {
          canUpgrade = false;
          addLog(`Not enough ${res}.`);
        }
      });
      if (canUpgrade) {
        Object.entries(cost).forEach(([res, amount]) => {
          newResources[res] -= amount;
        });
        setNavigationLevel(level + 1);
        addLog(`Upgraded Navigation Room to Level ${level + 1}.`);
        handleNavigationUpgrade();
      }
      return newResources;
    });
  };

  const handleUpgradeDroneRoom = () => {
    const level = droneRoomLevel;
    if (level >= droneRoomCosts.length) {
      addLog('Drone Room is at max level.');
      return;
    }

    const cost = droneRoomCosts[level];
    setResources((prev) => {
      const newResources = { ...prev };
      let canUpgrade = true;
      Object.entries(cost).forEach(([res, amount]) => {
        if ((newResources[res] || 0) < amount) {
          canUpgrade = false;
          addLog(`Not enough ${res}.`);
        }
      });
      if (canUpgrade) {
        Object.entries(cost).forEach(([res, amount]) => {
          newResources[res] -= amount;
        });
        setDroneRoomLevel(level + 1);
        addLog(`Upgraded Drone Room to Level ${level + 1}.`);
      }
      return newResources;
    });
  };

  const getCostDisplay = (cost) => {
    return Object.entries(cost).map(([res, amount], index) => (
      <p key={index}>
        {amount} {res.charAt(0).toUpperCase() + res.slice(1)}
      </p>
    ));
  };

  return (
    <div className="home">
      <h1>Station Overview</h1>
      
      {/* Navigation Room Section */}
      <div className="upgrades">
        <h2>Navigation Room</h2>
        <p>This room enables you to select different planets to travel to and gather new and unique resources for upgrades.</p>
        <p>Each level up unlocks a new planet to select and explore.</p>
        <p>Level: {navigationLevel}</p>
        
        {/* Display cost for the current level */}
        <div>
          <h3>Upgrade Cost:</h3>
          {navigationLevel < navigationCosts.length && getCostDisplay(navigationCosts[navigationLevel])}
        </div>

        <button onClick={handleUpgradeNavigation}>Upgrade Navigation Room</button>
        {navigationLevel >= 1 && (
          <button onClick={() => navigate('/navigation-room')}>Go to Navigation Room</button>
        )}
      </div>
      
      {/* Drone Room Section */}
      <div className="upgrades">
        <h2>Drone Room</h2>
        <p>This room enables you to unlock drones that will automatically be sent out to harvest resources of that specific drone.</p>
        <p>Each level up will provide you +1 capacity for each drone and each drone can gather 5 units of a resource per 10 seconds.</p>
        <p>Level: {droneRoomLevel}</p>

        {/* Display cost for the current level */}
        <div>
          <h3>Upgrade Cost:</h3>
          {droneRoomLevel < droneRoomCosts.length && getCostDisplay(droneRoomCosts[droneRoomLevel])}
        </div>

        <button onClick={handleUpgradeDroneRoom}>Upgrade Drone Room</button>
        {droneRoomLevel >= 1 && (
          <button onClick={() => navigate('/drone-room')}>Go to Drone Room</button>
        )}
      </div>
    </div>
  );
};

export default Home;
