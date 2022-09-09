import logo from './logo.svg';
import './App.css';
import {Outlet } from "react-router-dom";
import Base from './pages/Base';

function App() {
  return (
    <div className="container mx-auto">
      <header>
        
      </header>
      <Outlet />
    </div>
  );
}

export default App;
