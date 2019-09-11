import React, { Component } from 'react';
import axios from 'axios';


// API key
import apiKey from '../config';


// Components
import Image from './Image';
import loading from '../loading.svg';
import NotFound from './NotFound';


export default class Gallery extends Component {


  state = {
    images: [],
    isLoading: false,
  };


  performSearch = (query) => {  
    this.setState({ isLoading: true });
    
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          images: response.data.photos.photo,
          isLoading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
    });
  }

  componentDidMount() {
    this.performSearch(this.props.match.params.name);  
  }



  componentDidUpdate(prevProps){
    if(this.props.location.key !== prevProps.location.key) {
      this.performSearch(this.props.match.params.name);
  }
  }

  render(){
    return (
      <div className="photo-container">
        <ul>
          {
            ( this.state.isLoading ) ? <img className="loading" src={loading} alt="loading" /> : 
            ( this.state.images.length > 0 ) ? this.state.images.map( image =>
              <Image
                url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
                alt={image.title} 
                key={image.id}
              />
          )
          : <NotFound />
          }
        </ul>
      </div>
    );
  }
}











