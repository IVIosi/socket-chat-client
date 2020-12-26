import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

export const useLocalStorage = <V>(key: string, initialValue: V): [V, (value: V) => void] => {
  const [storedValue, setStoredValue] = useState<V>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as V) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: V) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

interface UseSocket {
  socket: typeof io['Socket'] | null;
  socketStatus: 'loading' | 'success' | 'error';
}

export const useSocket = (): UseSocket => {
  const [socketStatus, setSocketStatus] = useState<UseSocket['socketStatus']>('loading');
  const socketRef = useRef<UseSocket['socket']>(null);

  useEffect(() => {
    const socket = io.connect('/');
    setSocketStatus('success');

    socket.io.on('error', () => {
      setSocketStatus('error');
    });

    socket.io.on('reconnect', () => {
      setSocketStatus('success');
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, []);

  return { socket: socketRef.current, socketStatus };
};
