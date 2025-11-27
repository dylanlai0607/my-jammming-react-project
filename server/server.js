import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import querystring from 'querystring';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let userAccessToken;

// Load .env from root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = 8888;

// Spotify credentials
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;
const user_id = process.env.SPOTIFY_USER_ID;

// Sanity check
if (!clientId || !clientSecret || !redirectUri) {
  console.error('Missing Spotify credentials or redirect URI!');
  process.exit(1);
}

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// ---------- Step 1: Login endpoint ----------
app.get('/login', (req, res) => {
  const scope = [
    'playlist-read-private',
    'playlist-modify-private',
    'playlist-modify-public'
  ].join(' ');

  const authUrl = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      client_id: clientId,
      response_type: 'code',
      redirect_uri: redirectUri,
      scope: scope
    });

    res.redirect(authUrl);
});

// ---------- Step 2: Callback endpoint ----------
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  if (!code) return res.send('No code received from Spotify.');

  try {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
      },
      body: querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri
      })
    });

    const tokenData = await tokenResponse.json();
    userAccessToken = tokenData.access_token;
    res.redirect(`http://localhost:5173?access_token=${tokenData.access_token}`);

  } catch (err) {
    console.error('Error fetching access token:', err);
    res.send('Error getting access token from Spotify.');
  }
});

app.get('/api/my-playlists', async (req, res) => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        'Authorization': `Bearer ${userAccessToken}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).send(text);
    }

    const data = await response.json();

    res.json(data); 
  } catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).json({ error: 'Failed to fetch playlists' });
  }
});

app.post('/api/create-playlist', async (req, res) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
      method: "POST", headers: {
      'Authorization': `Bearer ${userAccessToken}`,
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": req.body.playlistName,
        "description": "New playlist description",
        "public": false
      })
    });
    
    const raw = await response.text();
    
    if (!response.ok) {
      return res.status(response.status).send(raw);
    }

    const data = JSON.parse(raw);
    res.json({ playlistId: data.id, name: data.name });

  } catch (error) {
    console.error('Error creating playlists:', error);
    res.status(500).json({ error: 'Failed to create playlists' });
  }
});

app.post('/api/add-tracks', async (req, res) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${req.body.playlistId}/tracks`, {
      method: "POST", headers: {
      'Authorization': `Bearer ${userAccessToken}`,
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "uris": req.body.trackUris
      })
    });
  } catch (error) {
    console.error('Error adding tracks:', error);
    res.status(500).json({ error: 'Failed to add tracks' });
  }
});

// Start backend server
app.listen(PORT, () => console.log(`Server running on http://127.0.0.1:${PORT}`));
