import { useState } from 'react';
import useChat from './useChat';

function ChatPage({ token, onLogout }) {
  const { messages, send } = useChat(token);
  const [msg, setMsg] = useState('');

  return (
    <>
      <h3>chat</h3>
      <button onClick={onLogout}>Logout</button>
      <hr />
      <div>

        {messages.length > 0 ? 
        
       ( 
        
        messages.map((m, i) => (
          <div key={i}>
            <b>{m.user}</b>: {m.text} <small>{new Date(m.at).toLocaleTimeString()}</small>
          </div>
        )) ) : <div>no message </div>


        
        
        }
      </div>
      <hr />
      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && (send(msg), setMsg(''))}
      />
      <button onClick={() => (send(msg), setMsg(''))}>Send</button>
    </>
  );
}

export default ChatPage;
