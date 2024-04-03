import { Tweet } from "./Main";
interface TweetsProps {
    tweets: Tweet[]
}
const Tweets = ({tweets}: TweetsProps) => {
    return (
      <div id="tweetsContainer">
        {tweets.map((tweet: Tweet) => (
          <div key={tweet.id} className="tweet">
        
            <div className="tweet-inner">
              <div className="author">{tweet.author}</div>
              <div className="content">{tweet.content}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default Tweets;
  