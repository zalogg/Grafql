const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs'); 
app.use(express.static('public')); 

app.get('/', async (req, res) => {
  try {
    const { data } = await axios.post('https://rickandmortyapi.com/graphql', {
      query: `
        query {
          characters(page: 1, filter: { name: "Rick" }) {
            results {
              name
              image
            }
          }
        }
      `
    });

    const characters = data.data.characters.results;

    res.render('index', { characters });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
