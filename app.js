//jshint esversion:6
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs"
import _ from "lodash"
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
const __dirname = dirname(fileURLToPath(import.meta.url));
import dotenv from 'dotenv';
dotenv.config();

let port = 3000;
// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 3000;
// }
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.${process.env.DB_CLUSTERNAME}.${process.env.DB_HOST}/postDB`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const postSchema = new mongoose.Schema({
  title: String,
  content: String
})


const Post = new mongoose.model("post", postSchema);




const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



// let posts = [];

app.get("/", (req, res) => {

  Post.find({})
    .then(function (foundPosts) {
      res.render("home.ejs", { txt: homeStartingContent, posts: foundPosts })
      res.redirect("/");

    })
    .catch(function (err) {
      console.log(err);
    })
  //  res.render("home.ejs", { txt: homeStartingContent, posts: posts })


})

app.get("/about", (req, res) => {
  res.render("about.ejs", { txt: aboutContent })

})
app.get("/contact", (req, res) => {
  res.render("contact.ejs", { txt: contactContent })
})

app.get("/compose", (req, res) => {
  res.render("compose.ejs")
})
app.post("/compose", (req, res) => {
  // let postArr = req.body;
  let postTitle = _.capitalize(req.body.title);
  let postContent = req.body.content;
  const postReq = new Post({
    title: postTitle,
    content: postContent
  })
  postReq.save();
  res.redirect("/")

  // console.log(postReq);
  // posts.push(postArr);
})

app.get('/:param', (req, res) => {
  // posts.forEach(i => {
  //   if (_.capitalize(i.title) === _.capitalize(req.params.param)) {
  //     res.render("post.ejs", { title: i.title, content: i.content })
  //   }
  // })

  Post.findOne({ title: _.capitalize(req.params.param) })
    .then(function (post) {
      if (post) {
        console.log("Successfully found it");
        res.render("post.ejs", { title: post.title, content: post.content })
      } else {
        console.log("Not found ");
        res.redirect("/")
      }
    })
    .catch(function (err) {
      console.log(err);
    })
});














app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
