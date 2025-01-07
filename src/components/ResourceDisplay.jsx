import React from 'react';

// Modify ResourceDisplay to accept the resources prop
const ResourceDisplay = ({ resources }) => {
    console.log(resources);
    return (
      <div className="resource-display">
        {/* Loop through the resources passed down from the parent */}
        {Object.entries(resources).map(([name, amount]) => (
          <div key={name} className="resource-item">
            <span>{name}: </span>
            <span>{amount}</span>
          </div>
        ))}
      </div>
    );
  };
  
  export default ResourceDisplay;
