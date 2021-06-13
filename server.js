const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const config = require("./config/database");
const passport = require('passport');
const cors = require('cors');
const fileUpload = require('express-fileupload')

const app = express();

// database connection
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(config.database, {
    useNewUrlParser: true, // Need this for API support
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

//fileupload middleware use
app.use(fileUpload())

// use of cors
app.use(cors())

// body-parser middleware use
app.use(bodyparser.json());

//use express static folder
app.use(express.static("./client/src/assets/"));


// passport middleware
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport);


// Routes
app.get('/',(req,res) => {
    res.send("hello");
})

//app.use("/QA",require('./routes/queans'));
//app.use("/user",require('./routes/userPost'));

app.use("/auth",require("./routes/auth"))
app.use("/QA",require("./routes/question"))
app.use("/post",require("./routes/post"))
app.use("/developers",require("./routes/developer"))
app.use("/profile",require("./routes/profile"))











const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>`server is running at port ${PORT}`);