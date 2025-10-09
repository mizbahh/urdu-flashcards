import { useState } from 'react';

export default function UrduFlashcards() {
  const cardSet = [
    { urdu: "السلام علیکم", english: "hello / peace be upon you", pronunciation: "assalamu alaikum" },
    { urdu: "شکریہ", english: "thank you", pronunciation: "shukriya" },
    { urdu: "پانی", english: "water", pronunciation: "paani" },
    { urdu: "کھانا", english: "food", pronunciation: "khana" },
    { urdu: "دوست", english: "friend", pronunciation: "dost" },
    { urdu: "محبت", english: "love", pronunciation: "mohabbat" },
    { urdu: "کتاب", english: "book", pronunciation: "kitab" },
    { urdu: "گھر", english: "home", pronunciation: "ghar" },
    { urdu: "خوبصورت", english: "beautiful", pronunciation: "khubsurat" },
    { urdu: "خدا حافظ", english: "goodbye", pronunciation: "Allah hafiz" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < cardSet.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setUserGuess('');
      setFeedback('');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setUserGuess('');
      setFeedback('');
    }
  };

  const handleShuffle = () => {
    const shuffled = [...cardSet].sort(() => Math.random() - 0.5);
    cardSet.splice(0, cardSet.length, ...shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setUserGuess('');
    setFeedback('');
  };

  const checkAnswer = () => {
    const currentCard = cardSet[currentIndex];
    const correctAnswer = currentCard.english.toLowerCase().trim();
    const guess = userGuess.toLowerCase().trim();

    // ADD THESE 3 LINES:
    if (guess === '') {
      return;
    }

    const cleanCorrect = correctAnswer.replace(/[^\w\s]/g, '');
    const cleanGuess = guess.replace(/[^\w\s]/g, '');



    if (cleanCorrect === cleanGuess || cleanCorrect.includes(cleanGuess) || cleanGuess.includes(cleanCorrect)) {
      setFeedback('correct');
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }
    } else {
      setFeedback('incorrect');
      setCurrentStreak(0);
    }
  };

  const getCardClass = () => {
    if (isFlipped) return 'flashcard flashcard-back';
    if (feedback === 'correct') return 'flashcard flashcard-correct';
    if (feedback === 'incorrect') return 'flashcard flashcard-incorrect';
    return 'flashcard flashcard-front';
  };

  const currentCard = cardSet[currentIndex];

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div className="header">
          <h1 className="title">learn urdu</h1>
          <p className="subtitle">master 10 essential urdu words</p>
          <div className="streak-container">
            <p className="streak-text">current streak: {currentStreak}</p>
            <p className="streak-text">longest streak: {longestStreak}</p>
          </div>
          <p className="card-counter">card {currentIndex + 1} of {cardSet.length}</p>
        </div>

        <div className={getCardClass()} onClick={handleFlip}>
          {!isFlipped ? (
            <div className="card-content">
              <div className="urdu-text">{currentCard.urdu}</div>
              <div className="pronunciation-text">{currentCard.pronunciation}</div>
            </div>
          ) : (
            <div className="card-content">
              <div className="english-text">{currentCard.english}</div>
            </div>
          )}
        </div>

        <div className="input-container">
          <input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder="type your answer here..."
            className="answer-input"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                checkAnswer();
              }
            }}
          />
          <button onClick={checkAnswer} className="submit-button">
            submit
          </button>
        </div>

        <div className="navigation-buttons">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="nav-button"
          >
            ← previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === cardSet.length - 1}
            className="nav-button"
          >
            next →
          </button>
        </div>

        <div className="shuffle-container">
          <button onClick={handleShuffle} className="shuffle-button">
            🔀 shuffle cards
          </button>
        </div>
      </div>
    </div>
  );
}