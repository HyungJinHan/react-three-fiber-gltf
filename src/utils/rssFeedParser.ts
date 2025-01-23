export const getRssFeed = (
  array: React.Dispatch<React.SetStateAction<string[]>>
) => {
  // XMLHttpRequest 객체 생성
  const xhr = new XMLHttpRequest();

  // XMLHttpRequest 메서드와 대상 링크 설정
  const method = "GET";
  const url = "/odnus?atom=0.3";

  // 요청 생성
  xhr.open(method, url);
  // xhr이 요청이 완료된 경우 결과를 생성
  xhr.onload = () => {
    // 결과 값은 response를 통해 저장
    var data = xhr.response;
    //xml 값을 파싱으로 분할
    let xmlDocs = new DOMParser().parseFromString(data, "text/xml");
    // 각 item을 태그 이름으로 검색
    let items = xmlDocs.getElementsByTagName("entry");
    // item을 반복문을 통해 접근
    let feedArray = Array.from(items).slice(0, 4);
    let feedTitle = feedArray.map((item) => {
      return item.getElementsByTagName("title")[0].textContent;
    });

    array(feedTitle as string[]);

    for (let item of feedArray) {
      // 각 태그와 그 내부 내용을 받을 수 있다.
      for (let child_node of Array.from(item.children)) {
        if (child_node.tagName === "title") {
          //게시글 내용인 경우 썸네일과 내부 텍스트를 반환
          console.log(child_node.textContent);
        } else {
        }
        // console.log(child_node.tagName);
        // console.log(child_node.textContent);
      }
    }
  };
  // XMLHttpRequest 실행!
  xhr.send();
};
