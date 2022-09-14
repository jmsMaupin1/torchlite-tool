import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AppContextProvider} from './context/AppContext';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Legendary from './pages/Legendary.js';
import Base from './pages/Base.js';
import Skills from './pages/Skills.js';
import Home from './pages/Home.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />} >
                  <Route index element={<Home />} />
                  <Route path="legendary" element={<Legendary />} />
                  <Route path="base" element={<Base />}/>
                  <Route path="skills" element={<Skills/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
    </AppContextProvider>
  </React.StrictMode>
);
/*basename="/torchlight-helper" */
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
