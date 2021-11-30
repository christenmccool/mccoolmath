import { Routes, Route } from 'react-router-dom';
import NavBar from './app/NavBar';
import Menu from './app/Menu';
import ProblemPage from './app/ProblemPage';
import './App.css';

function App() {
  return (
    <div className="App"> 
        <NavBar />
        <Routes>
            <Route path="/" element={<Menu />}/>
            <Route path=":skill" element={<ProblemPage />} />
        </Routes>
    </div>
  );
}

export default App;
