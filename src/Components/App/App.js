import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Playlist from '../Playlist/playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/searchresults';
import Spotify from '../../util/Spotify';


class App extends Component {
  constructor(props){
    super(props);
    this.state.searchResults = {
      name: 'First Result',
      artist: 'myself',
      album: 'birdjungle',
      id: '1'
    };

    this.state.playlistName = 'New Playlist';

    let track1 = {
      name: 'Check Yes, Juliet',
      artist: 'We The Kings',
      album: 'We The Kings',
      id: '0wVluBsVAVzBKrqspuCcwR'
    }
    let track2 = {
      name: 'Your Guardian Angel',
      artist: 'The Red Jumpsuit Apparatus',
      album: "Don't you Fake it",
      id: '2Guz1b911CbpG8L92cnglI'
    }
    let track3 = {
      name: 'One Of the Drunks',
      artist: 'Panic! At The Disco',
      album: 'Pray For The Wicked',
      id: '5trCWbYtza0QUxdmF9HAPX'
    }

    this.state.playlistTracks = [track1, track2, track3];

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id===track.id)){
      return;
    }
    this.state.playlistTracks.push(track);
  }

  removeTrack(track){

    this.setState({
      playlistTracks : this.playlistTracks.filter(function(val, ind, arr){
        return val.id!==track.id;
      })
    })
  }


  updatePlaylistName(name){
    this.state.playlistName = name;
  }

  savePlaylist(){
    const trackURIs = [];
    for(let i = 0; i<this.state.playlistTracks.length; i++){
      trackURIs.push(this.state.playlistTracks[i].id);
    }
  }

  search(term){
    Spotify.search(term).then(searchTracks => {
      this.setState({searchResults: searchTracks});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack()}/>
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove = {this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
