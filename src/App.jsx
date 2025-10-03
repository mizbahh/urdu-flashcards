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

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * cardSet.length);
    setCurrentIndex(randomIndex);
  };

  const currentCard = cardSet[currentIndex];

  return (
    <div style={{ 
      background: '#c9d6c7',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            marginBottom: '15px',
            color: '#4a5f4c'
          }}>
            learn urdu
          </h1>
          <p style={{ fontSize: '18px', color: '#6b8e6f', marginBottom: '8px' }}>
            master 10 essential urdu words
          </p>
          <p style={{ fontSize: '16px', color: '#6b8e6f', fontWeight: '600' }}>
            card {currentIndex + 1} of {cardSet.length}
          </p>
        </div>

        <div 
          onClick={handleFlip}
          style={{
            background: isFlipped ? '#8a9d8b' : 'white',
            border: '3px solid #8a9d8b',
            borderRadius: '15px',
            padding: '80px 40px',
            cursor: 'pointer',
            minHeight: '350px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '30px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          {!isFlipped ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '72px', 
                fontWeight: 'bold', 
                marginBottom: '15px',
                color: '#2d3e2f'
              }}>
                {currentCard.urdu}
              </div>
              <div style={{ 
                fontSize: '36px', 
                fontWeight: 'bold', 
                color: '#4a5f4c'
              }}>
                {currentCard.pronunciation}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: 'white' }}>
              <div style={{ fontSize: '52px', fontWeight: 'bold' }}>
                {currentCard.english}
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleNext}
            style={{
              background: '#8a9d8b',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px',
              padding: '15px 40px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            next card →
          </button>
        </div>
      </div>
    </div>
  );
}