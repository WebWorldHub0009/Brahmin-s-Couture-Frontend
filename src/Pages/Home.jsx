import React from 'react'
import CustomizeDressSlider from '../Components/CustomizeDressSlider'
import TrendingWearSlider from '../Components/TrendingWearSlide'
import SareeCollection from '../Components/SareeCollection'
import SareeCollection2 from '../Components/SareeCollection2'
import JewellerySection from '../Components/JewellerySection'
import Showcase from '../Components/Showcase'

const Home = () => {
  return (
   <>
   <CustomizeDressSlider/>
   <TrendingWearSlider/>
   <SareeCollection/>
   <Showcase/>
   <SareeCollection2/>
   {/* <JewellerySection/> */}
   </>
  )
}

export default Home
