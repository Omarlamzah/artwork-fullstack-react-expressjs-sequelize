import { useEffect } from 'react';
import io from 'socket.io-client';

const Socket = ({ onMessage }) => {
  useEffect(() => {
    const socket = io('http://localhost:2000'); // Update with your server's URL

    // Listen for incoming messages
    socket.on('chat message', (data) => {
      onMessage(data);
    });

    // Clean up the socket connection on component unmount
    return () => socket.disconnect();
  }, [onMessage]);

  return null; // No need to render anything
};

export default Socket;
