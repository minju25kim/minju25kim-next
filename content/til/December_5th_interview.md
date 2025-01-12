---
date: "2025-01-06T21:14:02+09:00"
dir: "til"
title: "December 5th Interview"
excerpt: ""
keywords: ["interview","nodejs","nextjs"]
coverImage: "/opengraph-image.png"
ogImage:
  url: "/opengraph-image.png"
---

## 어떤 회사?
- 챗봇 만드는 회사

### clojure는 무엇인가
- lexical environment
- 변수가 선언되는 환경 + 어디까지 인식하는지

### hoisting은 무엇인가 
- 선언되지않은 값을 끌어올리는 것

### console log 어떤순서로 출력 되는가
```node
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 1000);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");

// "Start"
// "End"
// "Promise"
// "Timeout"
```
### ==과 ===의 차이
- Null == undefined 그리고 null === undefined 결과
```node
console.log(null == undefined)
//true
console.log(null === undefined)
//false
```

### Null == false
```node
console.log(null==false)
//false
```
### Js 와 nodejs에서 비동기처리를 어떻게 하는가
- js는 timeout interval을 사용함
- nodejs 는 promise와 async/await을 사용함

### callback은 무엇인가
- function에서 부르는 것.

### Callbackhell 그리고 promise는 무엇인가? 
- promise는 object
- callback hell은 callback안에서 callback을 하는 것

### async/await 등 왜 비동기를 사용하는가?
- 간결한 코드를 작성하기 위해 사용한다.

### Nextjs serverside props 그리고 useEffect란?
- serverside props는 서버에서 제공되는 props이다.
- useEffect는 client side 에서 실행된다.

### ISR 그리고 initial props란?
- Incremental? something something.
- 초기에 로딩되는 props