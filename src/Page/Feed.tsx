import { useEffect, useState } from "react";
import styled from "styled-components";
import { getRssFeed } from "../utils/rssFeedParser";

const Wrapper = styled.div`
  flex-flow: wrap;
  display: flex;
  justify-content: space-around;
  width: 80%;
  align-items: center;
  margin: 0px auto;
  gap: 20px;
`;

const TwoLineDesc = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  color: gray;
  line-height: 1.8rem;
`;

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
            <a
              href={feeds.guid[i]}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
              }}>
              {feeds.title[i]}
            </a>
            <span
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "gray",
                marginLeft: "1.25rem",
              }}>
              {localeDateString}
            </span>
            <TwoLineDesc
              dangerouslySetInnerHTML={{ __html: feeds.description[i] }}
            />
          </div>
        </div>
      );
    }

    return <Wrapper>{result}</Wrapper>;
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
