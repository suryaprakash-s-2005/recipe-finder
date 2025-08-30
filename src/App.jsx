import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import Favorites from './pages/Favorites.jsx';
import RecipeDetails from './pages/RecipeDetails.jsx';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;