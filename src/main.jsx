import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import './index.css'
import App from './App'
import { ToastContainer } from 'react-toastify'
import { AIProvider } from './context/AIContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AIProvider>
          <App />
          <ToastContainer />
        </AIProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
