import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoadingSpinner from './components/ui/LoadingSpinner.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>

        <Suspense fallback={<LoadingSpinner />}>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </BrowserRouter>
        </Suspense>

      </Provider>


  </React.StrictMode>,
)
