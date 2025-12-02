import { pool } from '../db.js';
import { Server as IOServer } from 'socket.io';

async function ensureRoomExists(roomName) {
  try {
    const { rows } = await pool.query('SELECT id FROM rooms WHERE name = $1', [roomName]);
    if (rows.length === 0) {
      const result = await pool.query(
        'INSERT INTO rooms (name) VALUES ($1) RETURNING id',
        [roomName]
      );
      console.log('Created new room:', roomName);
      return result.rows[0].id;
    }
    return rows[0].id;
  } catch (error) {
    console.error('Error ensuring room exists:', error);
    throw error;
  }
}

export function registerHandlers(io) {
  io.on('connection', (socket) => {
    console.log('WS connected uid:', socket.data.uid);

   
    socket.on('join', async (room, ack) => {
      socket.join(room);
      console.log(socket.data.uid, 'joined room', room);
      ack(true);
    });

    socket.on('send_message', async ({ room, text }) => {
      try {
        const uid = socket.data.uid;
        if (!uid) return socket.emit('error', { message: 'Authentication required' });

        const roomId = await ensureRoomExists(room);

        const result = await pool.query(
          'INSERT INTO messages (room_id, user_id, body, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, created_at',
          [roomId, uid, text]
        );

        const messageData = {
          user: uid,
          text,
          at: result.rows[0].created_at
        };

        io.in(room).emit('new_message', messageData);

        socket.emit('message_stored', messageData);

      } catch (error) {
        console.error('Error sending message:', error);
        socket.emit('error', { message: 'Failed to send message', details: error.message });
      }
    });

    socket.on('history', async (room, ack) => {
      try {
        const { rows } = await pool.query(
          `SELECT u.username AS user, m.body AS text, m.created_at AS at
           FROM messages m
           JOIN users u ON u.id = m.user_id
           JOIN rooms r ON r.id = m.room_id
           WHERE r.name=$1
           ORDER BY m.created_at DESC
           LIMIT 50`,
          [room]
        );
        ack(rows.reverse());
      } catch (err) {
        console.error('Error fetching history:', err);
        ack([]);
      }
    });
  });
}


export function allroomsHandler(req, res) {
  pool.query('SELECT name FROM rooms ORDER BY name ASC')
    .then(result => {
      res.json({ rooms: result.rows.map(r => r.name) });
    })
    .catch(err => {
      console.error('Error fetching rooms:', err);
      res.status(500).json({ error: 'Failed to fetch rooms' });
    }); 
}
