import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/homepage';
import ChatPage from './Pages/chatPage';
import  './App.css';
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chats" element={<ChatPage />} />
        </Routes>
    </div>
  );
}

export default App;
