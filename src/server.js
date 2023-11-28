const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));//add origin when deployed

const PORT = process.env.PORT || 5001;
const movieRoutes = require('./routes/movieRoutes');

app.use('/movies', movieRoutes);
app.use(express.static('build'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });