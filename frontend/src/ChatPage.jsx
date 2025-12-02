import { useState } from 'react';
import useChat from './useChat';

function ChatPage({ token, onLogout }) {
  const { messages, send } = useChat(token);
  const [msg, setMsg] = useState('');

  const tocken = localStorage.getItem("token")

  const [rooms, setRooms] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:5000") // adjust your API URL
  //     .then(res => res.json())
  //     .then(data => {
  //       setRooms(data.rooms);
  //     })
  //     .catch(err => console.error("Error loading rooms:", err));
  // }, []);

  return (
    <div className="container mx-auto shadow-lg rounded-lg">
      
   
      <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
        <div className="font-semibold text-2xl">Chat App</div>
        <div className="w-1/2">
          <input
            type="text"
            placeholder="search"
            className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
          />
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-xl"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-row justify-between bg-white">

        <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
          <div className="border-b-2 py-4 px-2">
            <input
              type="text"
              placeholder="Search chats"
              className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
            />
          </div>

          
          <div className="flex flex-row py-4 px-2 items-center border-b-2">
            <div className="w-1/4">
              <img
                src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
                className="object-cover h-12 w-12 rounded-full"
                alt=""
              />
            </div>
            <div className="w-full">
              <div className="text-lg font-semibold">Global Chat</div>
              <span className="text-gray-500">Welcome to the chat</span>
            </div>
          </div>
        </div>

        <div className="w-full px-5 flex flex-col justify-between">
          
          <div className="flex flex-col mt-5 h-[70vh] overflow-y-auto">

            {messages.length === 0 && (
              <div className="text-center text-gray-500">
                no message
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex mb-4 ${
                  m.user == 1 ? "justify-end" : "justify-start"
                }`}
              >
                {m.user !== "you" && (
                  <img
                    src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                )}

               sdqd  {m.user}

                <div
                className={`py-3 px-4 max-w-xs shadow-md ${
                  m.user == 1
                    ? "bg-blue-500 text-white rounded-2xl rounded-br-none"     // sent message
                    : "bg-gray-300 text-black rounded-2xl rounded-bl-none"     // received message
                }`}
              >

                  <b>{m.user}</b>: {m.text}
                  <div className="text-[10px] opacity-80 mt-1">
                    {new Date(m.at).toLocaleTimeString()}
                  </div>
                </div>

                {m.user === "you" && (
                  <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                )}
              </div>
            ))}

          </div>

          {/* Send message */}
          <div className="py-5">
            <input
              className="w-full bg-gray-300 py-5 px-3 rounded-xl"
              type="text"
              placeholder="type your message here..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (send(msg), setMsg(""))
              }
            />
            <button
              className="hidden"
              onClick={() => (send(msg), setMsg(""))}
            >
              Send
            </button>
          </div>
        </div>

        <div className="w-2/5 border-l-2 px-5">
          <div className="flex flex-col">
            <div className="font-semibold text-xl py-4">Chat Info</div>
            <img
              src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
              className="object-cover rounded-xl h-64"
              alt=""
            />
            <div className="font-semibold py-4">Created Today</div>
            <div className="font-light">
              This chat is built with your WebSocket logic.  
              Only design changed — NOT the logic.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ChatPage;
