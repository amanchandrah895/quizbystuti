"use client";
import React, { useState } from "react";

function MainComponent() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const questions = [
    {
      question: "Ali and Fatima are siblings. Their parents can afford to send only one of them to school. They ask a teacher for advice. Who has the right to free primary education?",
      options: ["Only boys", "Only girls", "All children", "Only rich families"],
      correctAnswer: 2,
    },
    {
      question: "Your teacher hits students for making mistakes in class. Everyone is afraid to speak up. What should you do?",
      options: [
        "Stay quiet and avoid getting in trouble",
        "Report the teacher to a principal or trusted adult",
        "Accept it because teachers have the right to punish students",
        "Drop out of school to avoid being punished",
      ],
      correctAnswer: 1,
    },
    {
      question: "You meet a girl named prasidhee, who is the same age as you. She tells you that her parents say only boys should go to school, so she has to stay home. What would you say to her?",
      options: [
        "That’s the rule, nothing can be done.",
        "You should secretly go to school without telling anyone.",
        "Every child has the right to education. A teacher or community leader can help.",
        "Maybe you can go when you’re older.",
      ],
      correctAnswer: 2,
    },
    {
      question: "You notice that Sam is being bullied and doesn’t want to come to school anymore. What’s the best thing to do?",
      options: [
        "Tell Sam to fight back.",
        "Report the bullying to a teacher or school counselor.",
        "Ignore it—it’s not your problem.",
        "Laugh along with the bullies to avoid getting bullied yourself.",
      ],
      correctAnswer: 1,
    },
    {
      question: "Your friend Jake says he might leave school because his parents can’t afford supplies. What should you do?",
      options: [
        "Ignore it, it’s not your problem",
        "Tell a teacher or a school counselor",
        "Give Jake your books and hope it helps",
        "Drop out with him so he’s not alone",
      ],
      correctAnswer: 1,
    },
  ];

  const handleAnswer = (selectedIndex) => {
    setSelectedAnswer(selectedIndex);
    const correct = selectedIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setTimeout(() => {
      if (correct) setScore(score + 1);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
      setSelectedAnswer(null);
      setIsCorrect(null);
    }, 1500);
  };

  const restartQuiz = () => {
    setStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-[#0A0F1F] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-2xl rounded-2xl bg-[#1A1A1A]/10 p-8 backdrop-blur-md border border-[#00FFFF]/20">
          <h1 className="text-5xl font-bold text-center mb-4 text-[#00FFFF] animate-pulse">
            Education Rights Quiz!
          </h1>
          <p className="text-center text-gray-300 mb-8">
            Test your knowledge about children's right to education
          </p>
          <button
            onClick={() => setStarted(true)}
            className="w-full py-4 rounded-xl bg-[#00FFFF] text-[#0A0F1F] text-xl font-bold 
                     hover:bg-[#00FFFF]/80 transition-all duration-300 
                     shadow-[0_0_15px_rgba(0,255,255,0.5)]"
          >
            Start Quiz!
          </button>
          <p className="text-center text-sm text-gray-400 mt-4">
            Developed by Stuti Shivhare
          </p>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-[#0A0F1F] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-2xl rounded-2xl bg-[#1A1A1A]/10 p-8 backdrop-blur-md border border-[#00FFFF]/20">
          <h2 className="text-4xl font-bold text-center mb-4 text-[#00FFFF]">
            Quiz Complete!
          </h2>
          <div className="text-center mb-8">
            <p className="text-3xl mb-4">
              Your Score: {score}/{questions.length}
            </p>
            <p className="text-xl text-[#00FFFF]">
              {score === questions.length
                ? "Perfect Score! Amazing!"
                : score >= questions.length * 0.7
                ? "Great job! Well done!"
                : "Good effort! Keep learning!"}
            </p>
          </div>
          <button
            onClick={restartQuiz}
            className="w-full py-4 rounded-xl bg-[#00FFFF] text-[#0A0F1F] text-xl font-bold 
                     hover:bg-[#00FFFF]/80 transition-all duration-300"
          >
            Try Again
          </button>
          <p className="text-center text-sm text-gray-400 mt-4">
            Developed by Stuti Shivhare
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1F] text-white p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="text-[#00FFFF] text-xl">Score: {score}</div>
          <div className="text-[#00FFFF] text-xl">
            Question {currentQuestion + 1}/{questions.length}
          </div>
        </div>
        <div className="w-full bg-[#1A1A1A]/20 rounded-full h-2 mb-6">
          <div
            className="bg-[#00FFFF] h-2 rounded-full transition-all duration-500"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
        <div className="rounded-2xl bg-[#1A1A1A]/10 p-6 backdrop-blur-md border border-[#00FFFF]/20 mb-6">
          <h2 className="text-xl mb-6">{questions[currentQuestion].question}</h2>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-xl text-left transition-all duration-300
                  ${
                    selectedAnswer !== null
                      ? index === questions[currentQuestion].correctAnswer
                        ? "bg-green-500 text-white"
                        : selectedAnswer === index
                        ? "bg-red-500 text-white"
                        : "bg-[#1A1A1A]/30"
                      : "bg-[#1A1A1A]/30 hover:bg-[#00FFFF]/20"
                  }
                  border border-[#00FFFF]/20`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <p className="text-center text-sm text-gray-400 mt-4">
          Developed by Stuti Shivhare
        </p>
      </div>
    </div>
  );
}

export default MainComponent;
