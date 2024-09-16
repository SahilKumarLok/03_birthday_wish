'use client' // Enables client-side rendering for this component

// Import necessary dependencies
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { FaBirthdayCake, FaGift } from 'react-icons/fa'
import { GiBalloons } from 'react-icons/gi'

// Define type for Confetti component props
type ConfettiProps = {
  width: number
  height: number
}

// Dynamically import Confetti component
const DynamicConfetti = dynamic(() => import('react-confetti'), { ssr: false })

// Define color arrays for candles, balloons, and confetti
const candleColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
const balloonColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
const confettiColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE']

export default function BirthdayWish() {
  // State variables for user input
  const [userName, setUserName] = useState<string>('') // User's name
  const [userBirthday, setUserBirthday] = useState<string>('') // User's birthday (date)
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false) // Form submission state

  // State variables for birthday celebration
  const [candlesLit, setCandlesLit] = useState<number>(0) // Number of lit candles
  const [balloonsPoppedCount, setBalloonsPoppedCount] = useState<number>(0) // Number of popped balloons
  const [showConfetti, setShowConfetti] = useState<boolean>(false) // Whether to show confetti
  const [windowSize, setWindowSize] = useState<ConfettiProps>({ width: 0, height: 0 }) // Window size for confetti
  const [celebrating, setCelebrating] = useState<boolean>(false) // Whether celebration has started

  // Constants
  const totalCandles: number = 5 // Total number of candles
  const totalBalloons: number = 5 // Total number of balloons

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Effect to show confetti when all candles are lit and balloons are popped
  useEffect(() => {
    if (candlesLit === totalCandles && balloonsPoppedCount === totalBalloons) {
      setShowConfetti(true)
    }
  }, [candlesLit, balloonsPoppedCount])

  // Function to light a candle
  const lightCandle = (index: number) => {
    if (index === candlesLit) {
      setCandlesLit(prev => prev + 1)
    }
  }

  // Function to pop a balloon
  const popBalloon = (index: number) => {
    if (index === balloonsPoppedCount) {
      setBalloonsPoppedCount(prev => prev + 1)
    }
  }

  // Function to start celebration
  const celebrate = () => {
    setCelebrating(true)
    setShowConfetti(true)
    const interval = setInterval(() => {
      setCandlesLit(prev => {
        if (prev < totalCandles) return prev + 1
        clearInterval(interval)
        return prev
      })
    }, 500)
  }

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userName && userBirthday) {
      setFormSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Form for user input if not submitted */}
      {!formSubmitted ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg p-6 bg-gray-100 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-black">Enter Your Birthday Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 text-black"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">Birthday</label>
              <input
                type="date"
                className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 text-black"
                value={userBirthday}
                onChange={(e) => setUserBirthday(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 transition-all duration-300">
              Start Celebration
            </Button>
          </form>
        </motion.div>
      ) : (
        // Birthday card after form submission
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="mx-auto overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl border-2 border-black">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold text-black">Happy Birthday!</CardTitle>
              <CardDescription className="text-2xl font-semibold text-gray-600">{userName}</CardDescription>
              <p className="text-lg text-gray-500">{new Date(userBirthday).toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              {/* Candles section */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-2">Light the candles:</h3>
                <div className="flex justify-center space-x-2">
                  {[...Array(totalCandles)].map((_, index) => (
                    <AnimatePresence key={index}>
                      {(celebrating && index <= candlesLit) || (!celebrating && index < candlesLit) ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.5, delay: celebrating ? index * 0.5 : 0 }}
                        >
                          <FaBirthdayCake
                            className={`w-8 h-8 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                            style={{ color: candleColors[index % candleColors.length] }}
                            onClick={() => lightCandle(index)}
                          />
                        </motion.div>
                      ) : (
                        <FaBirthdayCake
                          className={`w-8 h-8 text-gray-300 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                          onClick={() => lightCandle(index)}
                        />
                      )}
                    </AnimatePresence>
                  ))}
                </div>
              </div>
              {/* Balloons section */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-2">Pop the balloons:</h3>
                <div className="flex justify-center space-x-2">
                  {[...Array(totalBalloons)].map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 1 }}
                      animate={{ scale: index < balloonsPoppedCount ? 0 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <GiBalloons
                        className={`w-8 h-8 cursor-pointer hover:scale-110`}
                        style={{ color: index < balloonsPoppedCount ? '#D1D5DB' : balloonColors[index % balloonColors.length] }}
                        onClick={() => popBalloon(index)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                className="bg-black text-white hover:bg-gray-800 transition-all duration-300"
                onClick={celebrate}
                disabled={celebrating}
              >
                Celebrate! <FaGift className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          {showConfetti && (
            <DynamicConfetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={500}
              colors={confettiColors}
            />
          )}
        </motion.div>
      )}
    </div>
  )
}
