let accessToken;
let expireTime;

const CLIENT_ID = 'd930049e7c6d4da3bc465c16969a794f';
const REDIRECT_URI = "http://localhost:3000/";

const Spotify = {
  getAccessToken(){
    if(accessToken){
      return accessToken;
    }
    let accessTokenMatch = window.location.href.match(/access_token=([^*]*)/);
    let expireTimeMatch = window.location.href.match(/expires_in=([^&]*)/);

    if(accessTokenMatch && expireTimeMatch){
      accessToken = accessTokenMatch[1];
      expireTime = expireTimeMatch[1];
      window.setTimeout(() => accessToken = '', expireTime*1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }

    window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
  },

  search(TERM){
    fetch(`https://api.spotify.com/v1/search?type=track&q=${TERM}`,{
      headers: {Authroization: `Bearer ${accessToken}`}
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if(jsonResponse.tracks.items){
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.urk
        }));
      }
    });
  },

  savePlaylist(playlistName, trackURIs){
    if(!playlistName || !trackURIs){
      return;
    }
    accessToken = this.getAccessToken();
    let headers = {
      Authorization: accessToken
    }
    let userID;

    return fetch('https://api.spotify.com/v1/me', {headers:headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userID = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: playlistName})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackURIs})
        });
      });
  });
  }
};

export default Spotify;
