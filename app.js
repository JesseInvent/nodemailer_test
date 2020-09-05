require('dotenv').config();
const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const mailer = require('./mailer');

const app = express();

// View engine setup
app.engine('handlebars', exphbs({ defaultLayout: false }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.render('contact');
});

app.post('/send', (req, res) => {
  const output = `
    <p> You have a new contact request </p>
    <h3>Contact  details</h3>
    <ul>
      <li>Name: ${req.body.name} </li>
      <li>Company: ${req.body.company} </li>
      <li>Email: ${req.body.email} </li>
      <li>Phone: ${req.body.phone} </li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  mailer.sendMail(output);

  res.render('contact', { msg: 'Email has been sent' });
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server stated on PORT ${PORT}`));
