import React from 'react';
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app-header">
        <h1>🤖 AI Chatbot</h1>
      </div>
      <Chatbot />
    </div>
  );
}

export default App;
