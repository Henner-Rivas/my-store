const express = require('express');
const cors= require('cors')
const routerApi  = require('./routes');
const { logErrors, errorHandler, boomErrorHandler}= require('./middleware/errorHandle')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
/*  const whitelist = ['http://localhost:3000', 'http://127.0.0.1:5500'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
} */
app.use(cors());

app.get('/', (req, res) => {
  res.send('hello my sever in express');
});




app.get('/nueva-ruta', (req, res) => {
  res.send('Hello, i am the new ruta');
});

routerApi(app)

app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler);

/*
app.get('/people/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Henner',
    price: 1000,
  });
});



app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
        });

  }else{
    res.send('there is not params ')


  }

});


*/

app.listen(port, () => {
  console.log('MY port ' + port);
});


