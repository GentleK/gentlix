import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Movies from './pages/Movies'
import MovieDetailPrivate from './Route/MovieDetailPrivate';
import Navigation from './components/Navigation';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div style={{ backgroundColor: 'black', color: 'white' }}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetailPrivate />} />
      </Routes>
    </div>
  );
}

export default App;
