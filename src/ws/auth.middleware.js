import jwt from 'jsonwebtoken';

function wsAuth(socket, next) {
  const token = socket.handshake.auth?.token || socket.handshake.query?.token;
  if (!token) return next(new Error('No token'));
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload.uid) return next(new Error('Invalid token'));
    socket.data.uid = payload.uid;
    next();
  } catch (err) {
    next(new Error('Invalid token'));
  }
}

export { wsAuth };
