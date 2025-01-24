import { useEffect, useState } from "react";
import { getRssFeed } from "../utils/rssFeedParser";

const Feed = () => {
  const [feeds, setFeeds] = useState({
    title: [""],
    guid: [""],
    description: [""],
    pubDate: [""],
  });

  useEffect(() => {
    getRssFeed(setFeeds);
  }, []);

  const getRssFeedForm = () => {
    const result = [];

    for (let i = 0; i < feeds.title.length; i++) {
      const date = new Date(feeds.pubDate[i]);
      const localeDateString = new Date(date.getTime()).toLocaleDateString();

      result.push(
        <div
          key={i}
          style={{
            display: "flex",
            width: "45%",
          }}>
          <div
            style={{
              overflow: "hidden",
            }}>
            <a href={feeds.guid[i]} target="_blank" rel="noreferrer">
              {feeds.title[i]}
            </a>{" "}
            | <span>{localeDateString}</span>
            <p
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                wordBreak: "break-all",
                width: "100%",
              }}>
              {feeds.description[i]}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-around",
          width: "80%",
          flexWrap: "wrap",
          alignItems: "center",
          margin: "0 auto",
        }}>
        {result}
      </div>
    );
  };

  return (
    <>
      {feeds.title.length < 1 ? (
        <div>Loading...</div>
      ) : (
        <div>{getRssFeedForm()}</div>
      )}
    </>
  );
};

export default Feed;
