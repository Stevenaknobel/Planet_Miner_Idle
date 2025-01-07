import React, { useEffect } from 'react';
import HomeButton from '../components/HomeButton';

const DroneRoom = ({ unlockedResources, level, setResources, addLog, dronesFromApp, setDrones }) => {
  // Directly use dronesFromApp (which is the global state) and setDrones to update the global state

  // Define the cost for each drone (different resources per drone)
  const droneCosts = {
    scrap: { scrap: 100 },
    copper: { scrap: 50, copper: 50 },
    aluminum: { scrap: 50, copper: 50, aluminum: 50 },
    nickel: { scrap: 50, copper: 50, nickel: 50 },
    carbon: { scrap: 50, copper: 50, carbon: 50 },
    graphene: { scrap: 50, copper: 50, graphene: 50 },
    silicon: { scrap: 50, copper: 50, silicon: 50 },
    lithium: { scrap: 50, copper: 50, lithium: 50 },
    tungsten: { scrap: 50, copper: 50, tungsten: 50 },
    zirconium: { scrap: 50, copper: 50, zirconium: 50 },
    titanium: { scrap: 50, copper: 50, titanium: 50 },
    andreasite: { scrap: 100, copper: 100, andreasite: 50 },
    bazium: { scrap: 100, copper: 100, bazium: 50 },
    samborium: { scrap: 100, copper: 100, samborium: 50 },
    owenite: { scrap: 100, copper: 100, owenite: 50 },
    joenite: { scrap: 100, copper: 100, joenite: 50 },
    theonite: { scrap: 100, copper: 100, theonite: 50 },
    jakium: { scrap: 100, copper: 100, jakium: 50 },
    kennium: { scrap: 100, copper: 100, kennium: 50 }
  };

  // Function to add a drone, checking if the player has enough resources
  const addDrone = (resource) => {
    const cost = droneCosts[resource];
    setResources((prev) => {
      const newResources = { ...prev };
      let canAfford = true;

      // Check if the player has enough of each required resource
      Object.entries(cost).forEach(([res, amount]) => {
        if ((newResources[res] || 0) < amount) {
          canAfford = false;
          addLog(`Not enough ${res} to buy ${resource} drone.`);
        }
      });

      // If the player can afford the drone, deduct resources and add the drone
      if (canAfford) {
        Object.entries(cost).forEach(([res, amount]) => {
          newResources[res] -= amount;
        });

        // Update the drone count in global state (App)
        setDrones((prevDrones) => {
          const currentCount = prevDrones[resource] || 0;
          if (currentCount < level) {
            const updatedDrones = {
              ...prevDrones,
              [resource]: currentCount + 1,
            };
            return updatedDrones;
          } else {
            addLog(`Maximum drones for ${resource} reached.`);
            return prevDrones;
          }
        });

        addLog(`Purchased ${resource} drone.`);
      }

      return newResources;
    });
  };

  return (
    <div className="room">
      <HomeButton />
      <h1>Drone Room</h1>
      <p>This room enables you to unlock drones that will automatically be sent out to harvest resources of that specific drone.</p>
      <p>Each level up will provide you +1 capacity for each drone and each drone can gather 5 units of a resource per 10 seconds.</p>

      {unlockedResources.length === 0 ? (
        <p>No resources available to purchase drones.</p>
      ) : (
        unlockedResources.map((resource) => (
          <div key={resource}>
            <p>
              {resource.charAt(0).toUpperCase() + resource.slice(1)} Drones: {dronesFromApp[resource] || 0}
            </p>
            <button
              onClick={() => addDrone(resource)}
              disabled={dronesFromApp[resource] >= level} // Disable if max drones reached for this resource
            >
              Buy {resource.charAt(0).toUpperCase() + resource.slice(1)} Drone
              {` (Cost: ${JSON.stringify(droneCosts[resource])})`}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default DroneRoom;
