import { Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Home from './Pages/Home'
import CustomisedSaree from './Pages/CustomisedSaree';
import HandloomSaree from './Pages/HandloomSaree';
import PattuSaree from './Pages/PattuSaree';
import Acessosaries from './Pages/Acessosaries';
import FamilyCombo from './Pages/FamilyCombo';

function App() {

  return (
    <>
    <Navbar className="fixed top-0 w-full z-50" />
      <Routes>
        <Route path='/' element={<Home/>}/>
         <Route path='/customised-sarees' element={<CustomisedSaree/>}/>
          <Route path='/handloom-saree' element={<HandloomSaree/>}/>
           <Route path='/pattu-saree' element={<PattuSaree/>}/>
             <Route path='/family-combo' element={<FamilyCombo/>}/>
            <Route path='/accessaries' element={<Acessosaries/>}/>
              
      </Routes>
    <Footer/>
    </>
  )
}

export default App;
