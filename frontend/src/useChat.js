import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export default function useChat(token) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

const s = io(import.meta.env.VITE_API_URL, { 
  auth: { token },
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  transports: ['websocket', 'polling']
});


    s.on('connect', () => {
      console.log('WS connected');
      setError(null);
      s.emit('join', 'general', (success) => {
        if (success) {
          console.log('Joined general room');
        }
      });
    });

    s.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setError('Connection error: ' + err.message);
    });

    s.on('error', (err) => {
      console.error('Socket error:', err);
      setError(err.message || 'An error occurred');
    });

    s.on('new_message', (msg) => {
      console.log('Received new message:', msg);
      setMessages((m) => [msg, ...m]);
    });

    s.on('message_stored', (msg) => {
      console.log('Message confirmed stored:', msg);
    });

    setSocket(s);

    return () => s.disconnect();
  }, [token]);

  const send = (text) => socket?.emit('send_message', { room: 'general', text });

  return { messages, send };
}
