
function SpotifyLogin() {
  const handleLogin = () => {
    // Redirect the browser to your backend /login endpoint
    window.location.href = "http://127.0.0.1:8888/login";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div>
        <h1>Jammming Spotify Login</h1>
        <button
            onClick={handleLogin}
            style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "5px",
            backgroundColor: "#1DB954",
            color: "white",
            border: "none",
            }}
        >
            Connect to Spotify
        </button>
      </div>
    </div>
  );
}

export default SpotifyLogin;

