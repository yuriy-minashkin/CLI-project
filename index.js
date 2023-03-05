#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

const welcome = async () => {
  const rainbowTitle = chalkAnimation.rainbow(
    "Who Wants To Be A JavaScript Millionaire? \n"
  );
  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed("killed")}
    So get all the questions right...
  `);
};

const askName = async () => {
  const answer = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answer.player_name;
};

const handleAnswer = async (isCorrect) => {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    process.exit(1);
  }
};

const winner = () => {
  console.clear();
  const msg = `Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
};

const question1 = async () => {
  const answer = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "JavaScript was created in 10 days then released on \n",
    choices: [
      "May 23rd, 1995",
      "Nov 24th, 1995",
      "Dec 4th, 1995",
      "Dec 17, 1996",
    ],
  });

  return handleAnswer(answer.question_1 === "Dec 4th, 1995");
};

const question2 = async () => {
  const answer = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: 'What is x? var x = 1_1 + "1" + Number(1)\n',
    choices: ["4", '"4"', '"1111"', "69420"],
  });
  return handleAnswer(answer.question_2 === '"1111"');
};

const question3 = async () => {
  const answer = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: `What is the first element in the array? ['🐏', '🦙', '🐍'].length = 0\n`,
    choices: ["0", "🐏", "🐍", "undefined"],
  });

  return handleAnswer(answer.question_3 === "undefined");
};

const question4 = async () => {
  const answer = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: "Which of the following is NOT a primitive type?\n",
    choices: ["boolean", "number", "null", "object"],
  });
  return handleAnswer(answer.question_4 === "object");
};

const question5 = async () => {
  const answer = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message:
      "JS is a high-level single-threaded, garbage-collected,\n" +
      "interpreted(or just-in-time compiled), prototype-based,\n" +
      "multi-paradigm, dynamic language with a ____ event loop\n",
    choices: ["multi-threaded", "non-blocking", "synchronous", "promise-based"],
  });

  return handleAnswer(answer.question_5 === "non-blocking");
};

// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();
