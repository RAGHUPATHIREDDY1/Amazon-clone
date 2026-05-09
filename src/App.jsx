import { BrowserRouter,  Routes, Route } from 'react-router-dom'
import Home from './components/home'
import NotFound from './components/NotFound'
import Login from './components/login'
import Popular from './components/popular'
import Search from './components/search'
import MovieItemDetails from './components/MovieItemdetails'
import './App.css'
const APP = () => {
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
export default APP;