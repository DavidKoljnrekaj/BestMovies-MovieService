const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;
const movieRoutes = require('./routes/movieRoutes');

app.use('/movie', movieRoutes);
app.use(express.static('build'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });