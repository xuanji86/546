const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

const static = express.static(__dirname + '/public')


app.use('/public', static)
app.use(cookieParser());
app.use(express.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session ({
    name: 'AuthCookie',
    secret: 'some secret string',
    resave: false,
    saveUninitialized: true
}))

app.use(express.urlencoded({extended:true}))

app.use('/private', (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).render('login', {no_login_flag: true});
  } else {
    next();
  }
});

app.use('/login', (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/private');
  } else {
    //here I',m just manually setting the req.method to post since it's usually coming from a form
    req.method = 'POST';
    next();
  }
});

app.use(async (req, res, next) => {
  let log_message = new Date().toUTCString() + ": ";
  log_message += req.method + ": ";
  log_message += req.originalUrl + " "
  if(req.session.user) log_message += "(Authenticated User)";
  else log_message += "(Non-Authenticated User)";

  console.log(log_message);
  next()
})

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
