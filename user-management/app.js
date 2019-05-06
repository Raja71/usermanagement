let express  = require('express')
let app      = express()
let mongoose = require('mongoose')
let cors     = require('cors')

mongoose.connect('mongodb://localhost:27017/userManagement', {useNewUrlParser: true, useCreateIndex: true});

mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
  });

  app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(require('./controllers/userCtrl'));
app.use(require('./controllers/userDetailsCtrl'));

//   app.get('/amruta' ,(req, res)=>{
//       console.log('hello raj')
//       res.send("hello amruta")
//   })

  app.listen('3000', function(){
	console.log('Server running on port ' + '3000');
});