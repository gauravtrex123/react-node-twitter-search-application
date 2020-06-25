import React from 'react';
import logo from './logo.svg';
import twitter_icon from './iconfinder_twitter_173834.png';
import retweet_icon from './retweet.png';
import './App.css';
import axios from 'axios';

class TwitterSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: []
    };

    this.searchFunction = this.searchFunction.bind(this);
  }



  searchFunction(e) {
    e.preventDefault();
    console.dir(e.target[0].value);
    var that = this;
    axios.get('/twitterSearch', {
      params: {
        q: e.target[0].value,
        count: 10,
        result_type: 'recent',
        lang: 'en'
      }
    }).then(function (params) {
      console.log('success response', params.data.data);
      console.log('sent response', params.data.queryParams);
      that.setState({
        searchQuery: (params.data.queryParams.charAt(0) == '#' ? params.data.data.statuses : params.data.data)
      })
      document.querySelector('.twitter-main-container').classList.add('new-tweet-main-container');
    }).catch(function (params) {
      console.log('error response', params);
    }).finally(function (params) {

    });
  }

  render() {
    return (
      <div className="twitter-main-container">
        <div className="twitter-search-container">
          <div className="twitter-search-title" >TWEET <img className="twitter-image" src={twitter_icon} /> SEARCH</div>
          <form className="twitter-search-form" onSubmit={this.searchFunction}>
            <input type="text" className="twitter-search" />
            <input type="submit" className="twitter-search-submit" value="SEARCH" />
          </form>
        </div>
        <div className="tweet-main-container">
          {
            this.state.searchQuery.map(function (data) {
              var date = new Date((data.created_at == undefined ? data.user.created_at : data.created_at));
              return (
                <div className="tweet-container">
                  <div className="tweet-first-row"> 
                    <div className="tweet-profile-container">
                      <img className="tweet-image" src={(data.profile_image_url == undefined ? data.user.profile_image_url : data.profile_image_url)} />
                      <div className="tweet-u-s-container">
                        <div className="tweet-username">{(data.name == undefined ? data.user.name : data.name)}</div>
                        <div className="tweet-screenname">@{(data.screen_name == undefined ? data.user.screen_name : data.screen_name)}</div>
                      </div>
                    </div>
                    <div className="tweet-creation-date">{date.toLocaleString('default', { month: 'long' }) + ' ' + date.getDay()+ ', ' + date.getFullYear()}</div>
                  </div>
                  <div className="tweet-description">{(data.text == undefined ? (data.status == undefined ? '' : data.status.text) : data.text)}</div>
                  <div className="tweet-like-share-row">
                    <div className="tweet-retweet"><img className="retweet-icon" src={retweet_icon} />{(data.retweet_count == undefined ? (data.status == undefined ? '' : data.status.retweet_count) : data.retweet_count)}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default TwitterSearch;
