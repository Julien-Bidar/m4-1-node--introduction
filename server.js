"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const randomTime = Math.floor(Math.random() * 3000);
let jokeMode = false;

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  //cat endpoint

  .get("/cat-message", (req, res) => {
    const message = { author: "cat", text: "meow" };
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  //Monkey-chat

  .get("/monkey-message", (req, res) => {
    const text = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];
    const randomIndex = Math.floor(Math.random() * text.length);
    const message = { author: "Monkey", text: text[randomIndex] };
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  //parrot Chat
  .get("/parrot-message", (req, res) => {
    let message = { author: "Parrot", text: req.query.message };
    if (req.query.message === "") {
      message.text = "Polly want a cracker";
    }
    console.log(req.query);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  //bot chat
  .get("/bot-message", (req, res) => {
    const getBotMessage = (text) => {
      //const text = req.query.message.toLowerCase()
      const commonGreetings = ["hi", "hello", "howdy", "hey"];
      const commonBye = ["bye", "goodbye", "ciao"];
      const jokeTrigger = "something funny";
      const random = Math.floor(Math.random() * 4);
      const jokes = [
        "You know why you never see elephants hiding up in trees? Because they’re really good at it.",
        "A dyslexic man walks into a bra.",
        "What is red and smells like blue paint? Red paint.",
        "I have an EpiPen. My friend gave it to me when he was dying, it seemed very important to him that I have it.",
      ];

      let botMsg = `Bzzt ${text}`;
      //cases Hello, Bye, Joke
      commonGreetings.filter((greet) => {
        if (text.toLowerCase().includes(greet)) {
          botMsg = "Bonjour Hi";
        }
      });
      commonBye.filter((bye) => {
        if (text.toLowerCase().includes(bye)) {
          botMsg = "Ciao";
        }
      });
      if (text.toLowerCase().includes(jokeTrigger)) {
        jokeMode = true;
        botMsg = "Would you like me to tell you a joke? Answer by Yes or No";
      } else if (text === "Yes" && jokeMode) {
        botMsg = `${jokes[random]} \n would you like me to tell you another joke? Answer Yes or No`;
      } else if (text === "No" && jokeMode) {
        jokeMode = false;
        botMsg = "Ok bye then!";
      } else {
        jokeMode = false;
      }
      console.log(jokeMode);
      return botMsg;
    };
    let message = { author: "bot", text: getBotMessage(req.query.message) };
    //console.log(req.query.message);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get("/", (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not the page you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
