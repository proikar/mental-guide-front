import './App.css';
import LogReg from './components/login_register.js';
import Home from './components/Home';
import Chat from './components/Chat';
import Profile from './components/Profile';
import Resources from './components/Resources';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App" id="raleway-font">
        <Routes>
          <Route path="/" element={<LogReg />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
