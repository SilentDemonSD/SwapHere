import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const VideoCall = ({ roomId }) => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideoRef = useRef();
  const peersRef = useRef([]);

  useEffect(() => {
    socketRef.current = io.connect(process.env.REACT_APP_API_URL);
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      userVideoRef.current.srcObject = stream;
      socketRef.current.emit('join-room', roomId);

      socketRef.current.on('user-connected', (userId) => {
        const peer = createPeer(userId, socketRef.current.id, stream);
        peersRef.current.push({ peerID: userId, peer });
        setPeers((prev) => [...prev, peer]);
      });

      socketRef.current.on('signal', (data) => {
        const item = peersRef.current.find((p) => p.peerID === data.from);
        if (item) item.peer.signal(data.signal);
      });
    });

    return () => socketRef.current.disconnect();
  }, [roomId]);

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on('signal', (signal) => {
      socketRef.current.emit('signal', { to: userToSignal, from: callerID, signal });
    });
    return peer;
  };

  return (
    <div>
      <video ref={userVideoRef} autoPlay playsInline muted />
      {peers.map((peer, index) => (
        <video 
          key={index} 
          ref={(ref) => {
            if (ref) peer.on('stream', (stream) => (ref.srcObject = stream));
          }} 
          autoPlay 
          playsInline 
        />
      ))}
    </div>
  );
};

export default VideoCall;