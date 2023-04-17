const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/getDistance', async (req, res) => {
    try {
        const response = await axios.post(
            `https://api.particle.io/v1/devices/300021001447393334363636/getDistance?access_token=35d645843f2816063b4b3e060ac6eed52b3955cf`
        );
        res.json({ distance: response.data.return_value });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la distancia' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});