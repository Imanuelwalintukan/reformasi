import React, { useState } from 'react';

const questions = [
  {
    question: "Pilih palet warna yang paling menarik bagi Anda:",
    options: [
      { text: "Netral dan kalem (putih, krem, abu-abu)", style: "Minimalist" },
      { text: "Hangat dan earthy (terakota, cokelat, zaitun)", style: "Bohemian" },
      { text: "Klasik dan dalam (biru tua, hijau zamrud, emas)", style: "Classic" },
    ],
  },
  {
    question: "Gaya dekorasi rumah mana yang paling Anda sukai?",
    options: [
      { text: "Modern, bersih, dan tidak berantakan", style: "Minimalist" },
      { text: "Nyaman, eklektik, dan penuh dengan tanaman", style: "Bohemian" },
      { text: "Elegan, abadi, dan sedikit formal", style: "Classic" },
    ],
  },
  {
    question: "Pilih tekstur yang paling Anda sukai:",
    options: [
      { text: "Halus dan matte", style: "Minimalist" },
      { text: "Kasar, alami, dan tidak rata", style: "Bohemian" },
      { text: "Mengkilap dan berglasir", style: "Classic" },
    ],
  },
];

const StyleQuiz = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (style) => {
    const newAnswers = [...answers, style];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = determineStyle(newAnswers);
      onComplete(result);
    }
  };

  const determineStyle = (userAnswers) => {
    const styleCounts = userAnswers.reduce((acc, style) => {
      acc[style] = (acc[style] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(styleCounts).reduce((a, b) => styleCounts[a] > styleCounts[b] ? a : b);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-serif text-yellow-400 mb-6">Kuis Gaya Tembikar</h2>
      <div className="mb-6">
        <p className="font-serif text-lg">{questions[currentQuestion].question}</p>
      </div>
      <div className="space-y-4">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option.style)}
            className="w-full text-left bg-gray-700 p-4 rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition-colors duration-300"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleQuiz;