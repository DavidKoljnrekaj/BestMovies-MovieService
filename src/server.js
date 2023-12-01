const express = require('express');
const cors = require('cors');

const app = express();

const allowedOrigins = ['http://localhost:3000', 'http://localhost'];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

const PORT = process.env.PORT || 5001;
const movieRoutes = require('./routes/movieRoutes');

app.use('/movies', movieRoutes);
app.use(express.static('build'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });