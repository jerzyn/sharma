var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/pre-register', function (req, res) {
  // res.json([
  //   {
  //     username: 'dickeyxxx',
  //     body: 'node rocks!'
  //   }
  // ])
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var birthdate = req.body.birthdate;
	var email = req.body.email;
	var status = req.body.status.replace(/\s/g,'');
	var street = req.body.street;
	var postcode = req.body.postcode;
	var city = req.body.city;
	var telephone = req.body.telephone;
  // Normal;;LAST NAME;NAME;DATEOFBIRTH(DDMMYYY);STREET;CODIGOPOSSTAL;PHONENUMBER;MAIL
	var user = status + ';' + last_name  + ';' + first_name + ';' + birthdate + ';' +  street + ';' + postcode + ';' + telephone + ';' + city + ';' + email + '\n';
  fs.readFile('./register.csv', function (err, data) {
  	if (err) {
	  	fs.writeFile('register.csv', user , function (err) {
        if (err) {
          console.log(err);
          return res.sendStatus(err.status);
        }
      });
  	} else {
      fs.appendFile('register.csv', user , function (err) {
        if (err) {
          console.log(err);
          return res.sendStatus(err.status);
        }
      });  	  
  	}
  });
  res.sendStatus(201);
});

app.get('/register.csv', function (req, res) {
  var options = {
    root: __dirname + '/',
    // headers: {
    //     'x-timestamp': Date.now(),
    //     'x-sent': true
    // }
  };	
  res.sendFile('register.csv', options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', 'register.csv');
      res.status(200);

    }
  });
});



app.listen(3000, function () {
  console.log('Server listening on', 3000)
})