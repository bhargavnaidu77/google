const express = require('express');
const axios = require('axios');
const router = express.Router();

const REDIRECT_URI = 'http://localhost:3000/auth/google/callback';

// Initiates the Google Login flow
router.get('/auth/google', (req, res) => {
  // const url = https:accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email&prompt=consent;
  res.json({url:url});
});

// Callback URL for handling the Google Login response
router.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  try {
    // Exchange authorization code for access token
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const { access_token, id_token } = data;
    // Use access_token or id_token to fetch user profile
    const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: { Authorization: `Bearer ${access_token} `},
    });

    // Code to handle user authentication and retrieval using the profile data
    console.log("profile",profile);

    res.json("success");
  } catch (error) {
    console.error('Error:', error.response.data.error);
    res.redirect('/');
  }
});


module.exports = router;