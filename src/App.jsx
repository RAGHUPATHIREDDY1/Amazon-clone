import { BrowserRouter,  Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Popular from './components/Popular'
import TopRated from './components/toprated'
import Originals from './components/orginals'
import Search from './components/Search'
import MovieItemdetails from './components/MovieItemdetails'
import './App.css'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/popular' element={<Popular />} />
          <Route path='/top-rated' element={<TopRated />} />
          <Route path='/originals' element={<Originals />} />
        <Route path='/login' element={<Login />} />
        <Route path='/search' element={<Search />} />
        <Route path='/movie/:id' element={<MovieItemdetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;