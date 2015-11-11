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
	var user = first_name + ';' + last_name + ';' + birthdate + ';' + email + ';' + status + ';' + street + ';' + postcode + ';' + city + ';' + telephone + '\n';
  console.log('post received!');
  console.log(first_name);
  console.log(last_name);
  console.log(birthdate);
  console.log(email);
  console.log(status);
  console.log(street);
  console.log(postcode);
  console.log(city);
  console.log(telephone);
  fs.readFile('/register.csv', function (err, data) {
  	if (data) {
	  	fs.appendFile('register.csv', user , function (err) {
			  if (err) {
			  	console.log(err);
			  	return res.sendStatus(err.status);
			  }
			});
  	} else {
  	  fs.writeFile('register.csv', user , function (err) {
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
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };	
	res.sendFile('register.csv', options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
      res.sendStatus(200);
    }
  });
})



app.listen(3000, function () {
  console.log('Server listening on', 3000)
})