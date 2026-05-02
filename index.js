const express = require("express");
const app = express();

const methodOverride = require("method-override");

const port = 8080;
const path = require("path");

const { v4: uuidv4 } = require("uuid");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {id: uuidv4(), username: "shoaibraza", content: "I got selected for my first internship" },
    {id: uuidv4(), username: "shoaib7570", content: "hardwork is key of success" },
    {id: uuidv4(), username: "code with raza", content: "I love coding" },
    {id: uuidv4(), username: "rshoaib869", content: "hard work is important to acheive success" },
    {id: uuidv4(), username: "shoaib", content: "I got selected for my first job!" }
];

app.get("/posts/", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
});

app.post("/posts/", (req, res)=>{
    let id = uuidv4();
    let {username, content} = req.body;
    posts.push({ id, username, content});
    res.redirect("/posts/");
});


app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });   
});


app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});


app.get("/posts/:id/edit", (req, res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

app.delete("/posts/:id", (req, res)=>{
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})


app.listen(port, () => {
    console.log(`app is listening : ${port}`);
});