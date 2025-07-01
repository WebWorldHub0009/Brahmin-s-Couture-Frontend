import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import 13 images
import img1 from "../assets/images/trending/bkid3.jpg";
import img2 from "../assets/images/trending/bkids4.jpg";
import img3 from "../assets/images/trending/kids1.jpg";
import img4 from "../assets/images/trending/kids2.jpg";
import img5 from "../assets/images/trending/saree.jpg";
import img6 from "../assets/images/trending/saree1.jpg";
import img7 from "../assets/images/smallslider/s3.jpg";
import img8 from "../assets/images/smallslider/s2.jpg";
import img9 from "../assets/images/smallslider/s1.jpg";
import img10 from "../assets/images/smallslider/s4.jpg";
import img11 from "../assets/images/smallslider/s5.jpg";
import img12 from "../assets/images/smallslider/s6.jpg";
import img13 from "../assets/images/smallslider/s1.jpg";

const originalCards = [
  { id: 1, image: img1 },
  { id: 2, image: img2 },
  { id: 3, image: img3 },
  { id: 4, image: img4 },
  { id: 5, image: img5 },
  { id: 6, image: img6 },
  { id: 7, image: img7 },
  { id: 8, image: img8 },
  { id: 9, image: img9 },
  { id: 10, image: img10 },
  { id: 11, image: img11 },
  { id: 12, image: img12 },
  { id: 13, image: img13 },
];

const CARD_WIDTH = 180; // closer cards
const VISIBLE_CARDS = 7;

const TrendingWearSlider = () => {
  const [cards, setCards] = useState(originalCards);
  const [activeIndex, setActiveIndex] = useState(Math.floor(VISIBLE_CARDS / 2));

  const reorderCards = (clickedIndex) => {
    const middle = Math.floor(VISIBLE_CARDS / 2);
    const shift = clickedIndex - middle;

    // Rotate array so clickedIndex becomes center
    const newCards = [...cards];
    for (let i = 0; i < Math.abs(shift); i++) {
      if (shift > 0) {
        newCards.push(newCards.shift());
      } else {
        newCards.unshift(newCards.pop());
      }
    }
    setCards(newCards);
    setActiveIndex(middle);
  };

  return (
    <div className="w-full py-12 overflow-hidden flex items-center justify-center">
      <div className="relative w-full max-w-[95%] md:max-w-[80%] h-[500px] flex justify-center items-center">
        <AnimatePresence initial={false}>
          {cards.slice(0, VISIBLE_CARDS).map((item, idx) => {
            const offset = idx - activeIndex;
            const isActive = idx === activeIndex;

            return (
              <motion.div
                key={item.id}
                onClick={() => reorderCards(idx)}
                className="absolute cursor-pointer"
                animate={{
                  x: offset * CARD_WIDTH,
                  scale: isActive ? 1 : 0.9,
                  zIndex: 99 - Math.abs(offset),
                  opacity: 1,
                }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div
                  className={`rounded-xl shadow-lg overflow-hidden w-[220px] sm:w-[240px] md:w-[250px] xl:w-[260px] transition-all duration-300 border ${
                    isActive ? "border-black" : "border-transparent"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={`Wear ${item.id}`}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TrendingWearSlider;
