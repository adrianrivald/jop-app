import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import { FetchQueueHOC } from 'fetch-queue/hoc';
import './services/axios';
import Router from './Router';

function App() {
  return (
    <FetchQueueHOC>
      {/* <ToastContainer autoClose={3000} /> */}
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    </FetchQueueHOC>
  );
}

export default App;
