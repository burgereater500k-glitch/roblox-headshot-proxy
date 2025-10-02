const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/headshot/:userId', async (req, res) => {
  const userId = req.params.userId;
  const apiUrl = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=false`;

  try {
    const response = await axios.get(apiUrl);
    const imageUrl = response.data.data[0].imageUrl;
    res.json({ avatarUrl: imageUrl });
  } catch (error) {
    console.error('Failed to fetch avatar:', error.message);
    res.status(500).json({ error: 'Failed to fetch avatar' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
