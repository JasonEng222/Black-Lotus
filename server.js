let express = require("express");
let app = express();
let MongoClient = require("mongodb").MongoClient;
let reloadMagic = require("./reload-magic.js");
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads/" });
reloadMagic(app);
app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets
let dbo = undefined;
let url =
  "mongodb+srv://Jeng:wwUz6Nzh4G2guegT@cluster0-yrzu4.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  dbo = db.db("CardDB");
});
app.post("/signup", upload.none(), (req, res) => {
  console.log("signup endpoint hit");
  let username = req.body.username;
  let password = req.body.password;
  dbo.collection("users").findOne({ username }, (error, user) => {
    if (error) {
      console.log("/signup error", error);
      res.send(JSON.stringify({ success: false, error }));
      return;
    }
    if (user !== null) {
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user === null) {
      dbo
        .collection("users")
        .insertOne({ username, password })
        .then(() => res.send({ success: true }))
        .catch(error =>
          res.send(
            JSON.stringify({
              success: false,
              error
            })
          )
        );
    }
  });
});
app.post("/my-cards", upload.none(), (req, res) => {
  console.log("mycards endpoint hit");
  let username = req.body.user;
  dbo.collection("users").findOne({ username }, (error, document) => {
    res.send(JSON.stringify(document));
    return;
  });
});
app.post("/new-deck", upload.none(), (req, res) => {
  console.log("new deck endpoint hit");
  let deckname = req.body.deckname;
  let username = req.body.username;
  dbo
    .collection("decks")
    .findOne({ username: username, deckname: deckname }, (error, user) => {
      console.log(deckname, username);
      if (user === null) {
        dbo
          .collection("decks")
          .insertOne({ deckname: deckname, username: username, cards: [] });
        res.send(JSON.stringify({ success: true }));
      }
    });
});
app.post("/my-decks", upload.none(), (req, res) => {
  let username = req.body.username;
  dbo
    .collection("decks")
    .find({ username: username })
    .toArray((error, decks) => {
      res.send(JSON.stringify({ decks }));
    });
});
app.post("/login", upload.none(), (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  console.log("login endpoint hit");
  dbo.collection("users").findOne({ username: username }, (error, user) => {
    if (error) {
      console.log("/login error", error);
      res.send(JSON.stringify({ success: false, error }));
      return;
    }
    if (user === null) {
      res.send(JSON.stringify({ success: false }));
      return;
    }
    if (user.password === password) {
      res.send(JSON.stringify({ success: true }));
    }
  });
});
app.get("/all-cards", upload.none(), (req, res) => {
  console.log("my collection endpoint hit");
  dbo
    .collection("cards")
    .find({})
    .toArray((error, cards) => {
      if (error) {
        console.log("error", error);
        res.send(JSON.stringify({ success: false }));
        return;
      }
      res.send(JSON.stringify({ cards }));
    });
});
app.post("/add-to-all", upload.none(), (req, res) => {
  let cardId = req.body.id;
  let colorIdentity = req.body.coloridentity;
  let colors = req.body.colors;
  let cmc = req.body.cmc;
  let img = req.body.img;
  let name = req.body.name;
  let oracleText = req.body.oracletext;
  let price = req.body.price;
  let priceF = req.body.price;
  let affiliate = req.body.affiliate;
  dbo.collection("cards").findOne({ cardId: cardId }, (error, card) => {
    if (!card) {
      dbo.collection("cards").insertOne({
        cardId,
        colorIdentity,
        cmc,
        colors,
        img,
        name,
        oracleText,
        price,
        priceF,
        affiliate
      });
    }
  });
  res.send(JSON.stringify({ success: true }));
});
app.post("/retrieve-decklist", upload.none(), (req, res) => {
  console.log("retrieve decklist");
  let deckname = req.body.deckname;
  let username = req.body.username;
  dbo
    .collection("decks")
    .find({ username: username, deckname: deckname })
    .toArray((error, card) => {
      res.send(JSON.stringify({ card }));
    });
});
app.post("/add-card-to-decklist", upload.none(), (req, res) => {
  let username = req.body.username;
  let cardId = req.body.cardId;
  let deckname = req.body.deckname;
  console.log(username, cardId, deckname);
  dbo
    .collection("decks")
    .findOne({ deckname: deckname, username: username }, (error, card) => {
      {
        dbo
          .collection("decks")
          .updateOne(
            { deckname: deckname, username: username },
            { $push: { cards: cardId } }
          );
        res.send(JSON.stringify({ success: true }));
      }
      // if (!card) {
      //   dbo
      //     .collection("decks")
      //     .updateOne(
      //       { deckname: deckname, username: username },
      //       { $push: { decklist: cardId } }
      //     );
      //   res.send(JSON.stringify({ success: true }));
      // }
    });
});
app.post("/add-card-to-collection", upload.none(), (req, res) => {
  let username = req.body.username;
  let cardId = req.body.id;
  dbo
    .collection("users")
    .updateOne({ username: username }, { $push: { collection: cardId } });
  res.send(JSON.stringify({ success: true }));
});
app.get("/users", (req, res) => {
  dbo
    .collection("users")
    .find({})
    .toArray((error, users) => {
      if (error) {
        res.send(JSON.stringify({ success: false }));
        return;
      }
      res.send(JSON.stringify({ success: true }));
    });
});
app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
