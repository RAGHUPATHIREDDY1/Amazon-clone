import { BrowserRouter,  Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Popular from './components/Popular'
import Search from './components/Search'
import MovieItemDetails from './components/MovieItemdetails'
import './App.css'
const App = () => {
  return (
    <BrowserRouter className="app">
      <Routes>
        <Route path='/' element={<Home />} />
         <Route path='/popular' element={<Popular />} />
        <Route path='/login' element={<Login />} />
        <Route path='/search' element={<Search />} />
        <Route path='/movie/:id' element={<MovieItemDetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;