// client/src/components/VideoCall.jsx
import React, { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const VideoCall = ({ roomId }) => {
  const userVideoRef = useRef();
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(process.env.REACT_APP_API_URL);
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideoRef.current.srcObject = stream;
        socketRef.current.emit('join-room', roomId);
      })
      .catch((err) => console.error('WebRTC error:', err));

    return () => socketRef.current.disconnect();
  }, [roomId]);

  return (
    <div className="card">
      <h3>Video Call</h3>
      <video ref={userVideoRef} autoPlay playsInline muted style={{ width: '300px' }} />
    </div>
  );
};

export default VideoCall;