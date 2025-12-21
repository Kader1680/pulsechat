import { useState, useEffect } from 'react';
import useChat from './useChat';
import { Users, Hash, Lock, Globe } from 'lucide-react';

function ChatPage({ token, onLogout }) {
  const { messages, send } = useChat(token);
  const [msg, setMsg] = useState('');
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/rooms")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data.rooms);  
        console.log("Fetched rooms:", data.rooms);
      })
      .catch((err) => console.error("Error fetching rooms:", err));
  }, []);

  const getRoomIcon = (roomType) => {
    switch(roomType) {
      case 'private':
        return <Lock className="w-5 h-5" />;
      case 'public':
        return <Globe className="w-5 h-5" />;
      default:
        return <Hash className="w-5 h-5" />;
    }
  };

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

                <div
                  className={`py-3 px-4 max-w-xs shadow-md ${
                    m.user == 1
                      ? "bg-blue-500 text-white rounded-2xl rounded-br-none"
                      : "bg-gray-300 text-black rounded-2xl rounded-bl-none"
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
          </div>
        </div>

        {/* Right Sidebar - Rooms List */}
        <div className="w-2/5 border-l-2 px-5 overflow-y-auto">
          <div className="flex flex-col">
            <div className="font-semibold text-xl py-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-500" />
              Available Rooms
            </div>

            {/* Rooms List */}
            <div className="space-y-2">
              {rooms.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No rooms available</p>
                </div>
              ) : (
                rooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all border-2 ${
                      selectedRoom?.id === room.id
                        ? 'bg-blue-50 border-blue-400'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      selectedRoom?.id === room.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}>
                      {getRoomIcon(room.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 truncate">
                        {room.name}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-2">
                        {room.description || 'No description'}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          room.type === 'private' 
                            ? 'bg-red-100 text-red-600'
                            : 'bg-green-100 text-green-600'
                        }`}>
                          {room.type || 'general'}
                        </span>
                        {room.members_count && (
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {room.members_count}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Selected Room Details */}
            {selectedRoom && (
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <div className="font-semibold text-lg mb-2 text-blue-900">
                  {selectedRoom.name}
                </div>
                <div className="text-sm text-blue-700 mb-3">
                  {selectedRoom.description || 'No description available'}
                </div>
                <div className="flex items-center justify-between text-xs text-blue-600">
                  <span className="flex items-center gap-1">
                    {getRoomIcon(selectedRoom.type)}
                    {selectedRoom.type || 'general'}
                  </span>
                  {selectedRoom.created_at && (
                    <span>
                      Created: {new Date(selectedRoom.created_at).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    console.log('Joining room:', selectedRoom.id);
                    // Add your join room logic here
                  }}
                  className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Join Room
                </button>
              </div>
            )}

            {/* Info Section */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-600">
                <div className="font-semibold mb-2">💡 Tips</div>
                <ul className="space-y-1 text-xs">
                  <li>• Click on a room to view details</li>
                  <li>• Join rooms to start chatting</li>
                  <li>• Private rooms require permission</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ChatPage;