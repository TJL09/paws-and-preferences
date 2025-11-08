import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Spinner from './components/Spinner'
import { getCats } from './services/catApi';
import SwipeDeck from './components/SwipeDeck';
import type { Cat } from './types/catTypes';
import Summary from './components/Summary';
import { motion, AnimatePresence } from "framer-motion";
import Button from './components/Button';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [cats, setCats] = useState<Cat[]>([]);
  const [likedCats, setLikedCats] = useState<Cat[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dislikedCats, setDislikedCats] = useState<Cat[]>([]);
  const [remainingCats, setRemainingCats] = useState<Cat[]>(cats);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSwipe = (id: string, direction: "left" | "right") => {
    //Check if cats exist in array
    const cat = remainingCats.find((c) => c.id === id);
    if (!cat) return;

    if (direction === "right") setLikedCats((likes) => [...likes, cat]);
    else if (direction === "left") setDislikedCats((dislikes) => [...dislikes, cat]);

    //Remove cat from remaining stack
    setRemainingCats((prev) => prev.filter((c) => c.id !== id));
  };

  const fetchCats = async () => {
    try {
      //Modify number of cats as needed
      const data = await getCats(10);
      setCats(data);
      setRemainingCats(data);
      setLikedCats([]);
      setDislikedCats([]);
      setShowResults(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCats();
  }, [])

  useEffect(() => {
    if (remainingCats.length === 0 && cats.length > 0) {
      setShowResults(true);
    }
  }, [remainingCats, cats]);

  if (loading) {
    return (
      <div className="bg-linear-to-br from-pink-200 via-rose-100 to-amber-50 min-h-screen flex flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="bg-linear-to-br from-pink-200 via-rose-100 to-amber-50 min-h-screen">
        <div className="flex flex-col items-center justify-center">
          <Header title='Welcome to Paws and Preferences!' subHeader='Match with your favourite furry friends!' />

          <AnimatePresence mode="wait">
            {showResults ? (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-4 mt-6"
              >
                <Summary cats={likedCats} amount={likedCats.length} />
                <p className='text-gray-600 p-5 font-roboto'>Want to try again? Click the button below!</p>
                <Button title='Restart' onClick={fetchCats} />
              </motion.div>
            ) : (
              <motion.div
                key="deck"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center mt-6"
              >
                <SwipeDeck cats={remainingCats} onSwipe={handleSwipe} />
                <p className="mt-6 text-gray-700 text-sm italic font-roboto">
                  Swipe right if you like a cat 😻, left if not 👋
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

export default App
