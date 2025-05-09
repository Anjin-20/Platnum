import React, { useState } from "react";

const MovieChatbotOffline = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  // Hardcoded responses for specific keywords
  const responses = {
    "favorite movie":
      "My favorite movie is 'Inception'. I love the concept of dreams within dreams!",
    "hi ":
      "hi ! Am Anjin how may i be of assistance ! , What do you want to watch today",
    "director of inception":
      "'Inception' was directed by Christopher Nolan, known for his mind-bending plots!",
    "cast of avengers":
      "The cast of 'Avengers' includes some great actors like Robert Downey Jr., Chris Hemsworth, Scarlett Johansson, and many others.",
    "best action movie":
      "I’d say 'Mad Max: Fury Road' is one of the best action movies with non-stop thrills and fantastic cinematography.",
    "horror movies":
      "If you're into horror, I'd recommend 'The Conjuring' series. It's full of spine-chilling moments!",
    "best comedy movie":
      "For a good laugh, 'Superbad' is a classic. It’s one of the funniest high school comedies ever made.",
    "what is the godfather about":
      "'The Godfather' is about the powerful Corleone mafia family. It's a deep, emotional film about loyalty, family, and power.",
    "marvel or dc":
      "Marvel and DC both have their strengths! Marvel has a connected universe, while DC's 'The Dark Knight' trilogy is iconic in its own right.",
    "who won oscar for best picture 2023":
      "The Oscar for Best Picture in 2023 went to 'Everything Everywhere All at Once'. It's a mind-bending, multi-dimensional movie!",
    "romantic movies":
      "For a great romance, 'The Notebook' is a timeless classic. If you want something more recent, 'La La Land' is perfect.",
    "pixar movies":
      "Pixar has made some amazing animated movies, including 'Toy Story', 'Up', 'Inside Out', and 'Coco'. They’re known for heartwarming stories.",
    "who is james bond":
      "James Bond is a British spy, famously known for being suave and stylish. The character has been portrayed by several actors, including Sean Connery, Daniel Craig, and more.",
    "sci-fi movies":
      "If you're into sci-fi, I'd recommend 'Blade Runner 2049' or 'Interstellar' for some visually stunning and thought-provoking stories.",
    "animation movies":
      "Animation has come a long way! 'Spider-Man: Into the Spider-Verse' is a great example of how animation can create something truly unique and cinematic.",
    "star wars":
      "'Star Wars'—a legendary space opera! The original trilogy, with Luke Skywalker, Darth Vader, and Princess Leia, is iconic.",
    "movie soundtrack":
      "Some movie soundtracks are unforgettable! 'The Dark Knight' by Hans Zimmer or 'Interstellar' are great examples of powerful scores.",
    "who is harry potter":
      "Harry Potter is a young wizard who goes on magical adventures with his friends Hermione Granger and Ron Weasley. The series is beloved worldwide.",
    "time travel movies":
      "Time travel is always a fun concept! 'Back to the Future' and 'Looper' are some of the best time travel movies ever made.",
    "best actor of all time":
      "This is tough to answer because there are so many incredible actors, but many consider Robert De Niro, Meryl Streep, and Daniel Day-Lewis as some of the greatest of all time.",
    "best animated movie":
      "There are plenty of animated masterpieces! 'The Lion King' is a classic, but 'Toy Story 3' and 'Spider-Man: Into the Spider-Verse' also deserve a mention.",
    default:
      "Sorry, I don't understand that question. Can you try asking about movies?",
  };

  // Handle sending a message to the chatbot
  const handleSendMessage = () => {
    if (userMessage.trim() === "") return; // Prevent sending empty messages

    const userMessageObj = {
      type: "user",
      message: userMessage,
    };

    setMessages((prevMessages) => [...prevMessages, userMessageObj]);
    setUserMessage(""); // Clear input field

    // Process the bot response based on user input
    let botResponse = responses["default"]; // Default response
    const userMessageLower = userMessage.trim().toLowerCase();

    // Check if user message matches any predefined question (case-insensitive)
    for (const key in responses) {
      if (userMessageLower.includes(key)) {
        botResponse = responses[key];
        break;
      }
    }

    const botMessageObj = {
      type: "bot",
      message: botResponse,
    };

    setMessages((prevMessages) => [...prevMessages, botMessageObj]);
  };

  return (
    <div
      className="chatbot-container"
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <div className="chatbot-header">
        <h2>Movie Chatbot</h2>
      </div>
      <div
        className="chatbot-messages"
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          padding: "10px",
          borderBottom: "1px solid #ddd",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.type === "user" ? "user-message" : "bot-message"}
            style={{
              textAlign: msg.type === "user" ? "right" : "left",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                backgroundColor: msg.type === "user" ? "#DCF8C6" : "#E4E6EB",
                padding: "8px 12px",
                borderRadius: "20px",
                maxWidth: "70%",
                display: "inline-block",
              }}
            >
              {msg.message}
            </p>
          </div>
        ))}
      </div>
      <div
        className="chatbot-input"
        style={{ padding: "10px", display: "flex" }}
      >
        <input
          type="text"
          placeholder="Ask me about movies..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          style={{
            width: "85%",
            padding: "8px",
            borderRadius: "20px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            marginLeft: "10px",
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MovieChatbotOffline;
