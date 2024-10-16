import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Toaster } from './components/ui/toaster.jsx'
import './index.css'
import { Provider } from 'react-redux'; // Redux Provider
import store from './redux/store.js'; // Redux store
import { PersistGate } from 'redux-persist/integration/react'; // PersistGate for redux-persist
import { persistStore } from 'redux-persist'; // For persisting the store

let persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Redux Provider wrapping the whole app */}
    <Provider store={store}>
      {/* PersistGate ensures that the persisted state is rehydrated */}
      <PersistGate loading={null} persistor={persistor}>
        <App /> {/* Your App component */}
        <Toaster /> {/* Notification Toaster component */}
      </PersistGate>
    </Provider>
  </StrictMode>
);
