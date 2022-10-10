import { useEffect } from 'react';
import { MESSAGE_TYPE, NETWORK_STATE, BC_NAME } from '../CONSTANTS';
import EE from './event-emitter';
import Message from '../dto/Message';
import FetchResponseMessageData from '../dto/FetchResponseMessageData';
import FetchResponseEventName from '../dto/FetchResponseEventName';

export default function HOC({ children }) {
  const bc = new BroadcastChannel(BC_NAME);

  const onOnline = () => {
    if ('serviceWorker' in navigator) {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage(
          Message.create({
            type: MESSAGE_TYPE.NETWORK_STATE,
            data: NETWORK_STATE.ONLINE,
          }).toObject()
        );
      }
    }
  };

  const onOffline = () => {
    if ('serviceWorker' in navigator) {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage(
          Message.create({
            type: MESSAGE_TYPE.NETWORK_STATE,
            data: NETWORK_STATE.OFFLINE,
          }).toObject()
        );
      }
    }
  };

  const handleFetchResponseMessage = (message) => {
    const messageData = FetchResponseMessageData.fromObject(message.data);

    EE.emit(
      FetchResponseEventName.create({ url: messageData.url, method: messageData.method }).toString(),
      message.data
    );
  };

  const onSWMessage = (e) => {
    const message = Message.fromObject(e.data);

    switch (message.type) {
      case MESSAGE_TYPE.FETCH_RESPONSE:
        return handleFetchResponseMessage(message);
    }
  };

  useEffect(() => {
    bc.onmessage = onSWMessage;
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  return children;
}
