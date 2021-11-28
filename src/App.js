import NavBar from './NavBar';
import { Routes, Route } from 'react-router-dom';
import Menu from './Menu';
import ProblemPage from './ProblemPage';
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
