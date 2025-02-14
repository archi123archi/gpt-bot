const generator = require("./textGenerator");
require("dotenv").config({ path: "../.env" });
const tmi = require("tmi.js");
//login na twitch e join nos canais
const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: "taurediano",
    password: process.env.TWITCH_OAUTH_TOKEN,
  },
  channels: [
    "taurediano",
    "k1notv",
    "themalkavianx",
    "granjas",
    "bard0oo0",
    "blacksmith_god",
    "marjoux",
    "xparchon",
    "zeszin",
  ],
  // channels: ["taurediano"],
});

client.connect();

//roda sempre que uma mensagem for enviada no chat
client.on("message", (channel, tags, message, self) => {
  if (self) {
    return;
  }
  const baseg = [
    "👍",
    "🔪",
    "✌️",
    "🤞",
    "🖖",
    "🤘",
    "🤙",
    "💪",
    "👈",
    "👉",
    "☝️",
    "👆",
    "🖕",
    "👇",
    "🖐️",
    "✋",
    "👌",
    "👍",
    "👎",
    "✊",
    "👊",
    "🤛",
    "🤜",
    "🤚",
    "👋",
    "🤟",
    "🤏",
    "✍️",
    "👏",
    "👐",
    "🙌",
    "🤲",
    "🥊",
    "🙏",
    "🤝",
    "💅",
    "🦾",
    "Parabens! Voce encontrou um BASEG SHINY, voce nao ganhou absolutamente nada. BloodTrail ",
  ];
  const diceNumbers = ["1", "2", "3", "4", "5", "6"]

  let $message = message.toLowerCase();

  if ($message === "!dice") {
    client.say(channel, `Baseg 🎲 ${Math.floor(Math.random() *diceNumbers.length)}`)
  }

  if ($message.includes("baseg")) {
    client.say(
      channel,
      `Baseg ${baseg[Math.floor(Math.random() * baseg.length)]}`
    );
  }

  if ($message.includes("@taurediano")) {
    (async () => {
      try {
        client.say(channel, `${tags.username}, ${await generator.generate($message)}`)
      } catch (err) {
        client.say(channel, `${tags.username}, Baseg ${baseg[Math.floor(Math.random() * baseg.length)]} calma la patrao`)
      }
      })();
  }
});
