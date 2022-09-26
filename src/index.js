import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AppContextProvider} from './context/AppContext';
import {BuildContextProvider} from './context/BuildContext';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Legendaries from './pages/Legendaries.js';
import Base from './pages/Base.js';
import Skills from './pages/Skills.js';
import Home from './pages/Home.js';
import Modifier from './pages/Modifier.js';
import Talent from './pages/Talent.js';
import Build from './pages/Build.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />} >
                  <Route index element={<Home />} />
                  <Route path="legendary" element={<Legendaries />} />
                  <Route path="base" element={<Base />}/>
                  <Route path="skills" element={<Skills/>}/>
                  <Route path="mod" element={<Modifier/>}/>
                  <Route path="talent" element={<Talent/>}/>
                  <Route path="build" element={<BuildContextProvider><Build/></BuildContextProvider>}/>
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
