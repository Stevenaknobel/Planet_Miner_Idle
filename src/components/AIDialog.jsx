import React, { useRef, useEffect } from 'react';

const AIDialog = ({ logs }) => {
  const latestMessageRef = useRef(null);  // Ref to the last message

  useEffect(() => {
    // Scroll the last message into view every time logs change
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [logs]);  // Trigger effect when logs change (i.e., a new message is added)

  return (
    <div className="ai-dialog">
      <div className="log-container">
        {logs.map((log, index) => (
          <p
            key={index}
            ref={index === logs.length - 1 ? latestMessageRef : null} // Set ref to last message
          >
            {log}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AIDialog;
