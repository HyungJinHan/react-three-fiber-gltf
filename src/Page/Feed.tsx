import { useEffect, useState } from "react";
import { getRssFeed } from "../utils/rssFeedParser";

const Feed = () => {
  const [feeds, setFeeds] = useState([""]);

  useEffect(() => {
    getRssFeed(setFeeds);
  }, []);

  return (
    <div>
      {feeds.map((feed, index) => (
        <div key={index}>{feed}</div>
      ))}
    </div>
  );
};

export default Feed;
