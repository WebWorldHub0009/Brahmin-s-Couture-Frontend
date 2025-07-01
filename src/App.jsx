import { Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Home from './Pages/Home'

function App() {

  return (
    <>
    <Navbar className="fixed top-0 w-full z-50" />
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    <Footer/>
    </>
  )
}

export default App;
