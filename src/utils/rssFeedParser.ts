// type TCategory = "" | "NEWS - 새소식" | "STORY+" | "월간 오든" | "기업 공지";

// const category: TCategory = "";

export const getRssFeed = (
  array: React.Dispatch<
    React.SetStateAction<{
      title: string[];
      guid: string[];
      description: string[];
      pubDate: string[];
    }>
  >
) => {
  // XMLHttpRequest 객체 생성
  const xhr = new XMLHttpRequest();

  // XMLHttpRequest 메서드와 대상 링크 설정
  const method = "POST";
  // require -> "url=<your_url>"
  const cors_api = process.env.REACT_APP_CORS_URL as string;

  xhr.open(method, cors_api);

  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // post에 사용되는 body
  xhr.send("url=https://rss.blog.naver.com/odnus");

  xhr.onload = () => {
    // 1. 결과 값은 response를 통해 저장
    // 2. xml 값을 파싱으로 분할
    let data = xhr.response;
    let xmlDocs = new DOMParser().parseFromString(data, "text/xml");

    // 3. 각 item을 태그 이름으로 검색
    // 4. 타입 문제 해결을 위해 Array 형태로 변수 정의
    let items = xmlDocs.getElementsByTagName("item");
    let itemArray = Array.from(items);

    // 5. prop으로 받아온 태그에 따른 내용 불러오기 (최신 8개만)
    const getFeedContents = (tag: string) => {
      return itemArray
        .map((item) => item.getElementsByTagName(tag)[0].textContent)
        .slice(0, 8);
    };

    // 6. state 값 변경
    array({
      title: getFeedContents("title") as string[],
      guid: getFeedContents("guid") as string[],
      description: getFeedContents("description") as string[],
      pubDate: getFeedContents("pubDate") as string[],
    });
  };
};
