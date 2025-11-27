// getAccessToken.js
import fs from "fs";

import dotenv from "dotenv";

dotenv.config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

async function getToken() {
  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();

  if (data.access_token) {
    console.log("🔑 New Spotify token generated!");
    console.log("Token:", data.access_token);

    // Save token to .env.local for your React app
    fs.writeFileSync(
      ".env.local",
      `VITE_SPOTIFY_ACCESS_TOKEN=${data.access_token}\n`,
      { encoding: "utf8" }
    );

    console.log("📁 Token saved to .env.local");
  } else {
    console.error("❌ Failed to get token:", data);
  }
}

getToken();
