import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [quotesArray, setQuotesArray] = useState(null);

  let url =
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

  const getQuotes = async () => {
    const api_call = await fetch(url);
    const data = await api_call.json();
    setQuotesArray(data.quotes);
  };

  useEffect(() => {
    getQuotes();
  }, []);

  const [author, setAuthor] = useState("");
  const [quote, setQuote] = useState("");
  const [randomColor, setRandomColor] = useState(
    Math.floor(Math.random() * 16777215).toString(16)
  );
  const [randomIndex, setRandomIndex] = useState(null)

  useEffect(() => {
    if (quotesArray && quotesArray.length) {
      setRandomIndex(Math.floor(Math.random() * quotesArray.length))
      setRandomColor(Math.floor(Math.random() * 16777215).toString(16));
    }
  }, [quotesArray]);

  useEffect(() => {
    if (randomIndex) {
      setAuthor(quotesArray[randomIndex].author);
      setQuote(quotesArray[randomIndex].quote);
    }
  }, [randomIndex]);

  const style = {
    color: randomColor,
  };

  const handleClick = () => {
    getQuotes();
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#" + `${style.color}`,
        width: "100%",
        height: "100vh",
      }}
    >
      <div id="quote-box">
        <h3 id="text" style={{ color: "#" + `${style.color}` }}>
          <i className="fa fa-quote-left"> </i> {quote}
        </h3>
        <address id="author" style={{ color: "#" + `${style.color}` }}>
          -{author}
        </address>
        <section className="buttons-section">
          <article className="links">
            <a
              style={{ backgroundColor: "#" + `${style.color}` }}
              href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote}`}
              id="tweet-quote"
              target="_blank"
            >
              <i className="fa fa-twitter"></i>
            </a>
            <a
              style={{ backgroundColor: "#" + `${style.color}` }}
              id="tublr"
              target="_blank"
              href="https://www.tumblr.com/login?redirect_to=https%3A%2F%2Fwww.tumblr.com%2Fwidgets%2Fshare%2Ftool%3Fposttype%3Dquote%26tags%3Dquotes%252Cfreecodecamp%26caption%3DOprah%2BWinfrey%26content%3DYou%2Bbecome%2Bwhat%2Byou%2Bbelieve.%26canonicalUrl%3Dhttps%253A%252F%252Fwww.tumblr.com%252Fbuttons%26shareSource%3Dtumblr_share_button"
            >
              <i className="fa fa-tumblr"></i>
            </a>
          </article>

          <button
            id="new-quote"
            style={{ backgroundColor: "#" + `${style.color}` }}
            onClick={handleClick}
          >
            New quote
          </button>
        </section>
      </div>
    </div>
  );
}

export default App;
