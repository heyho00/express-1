# Express 실습

## settting

실습할 디렉토리에 들어와서 시작.

```bash
npm init -y

npm i -D typescript
npx tsc --init

npm i -D eslint
npx eslint --init
# 아래 단계로 설정

# ------------------------------------------------------------------------
# $ npx eslint --init
# You can also run this command directly using 'npm init @eslint/config'.
# √ How would you like to use ESLint? · style       
# √ What type of modules does your project use? · esm
# √ Which framework does your project use? · none
# √ Does your project use TypeScript? · No / Yes
# √ Where does your code run? · node
# √ How would you like to define a style for your project? · guide
# √ Which style guide do you want to follow? · xo-typescript
# √ What format do you want your config file to be in? · JavaScript
# Checking peerDependencies of eslint-config-xo-typescript@latest
# Checking peerDependencies of eslint-config-xo@latest
# The config that you've selected requires the following dependencies:

# eslint-config-xo@latest eslint@>=8.0.0 eslint-config-xo-typescript@latest @typescript-eslint/eslint-plugin@>=5.43.0 @typescript-eslint/parser@>=5.43.0 typescript@>=4.4
# √ Would you like to install them now? · No / Yes
# √ Which package manager do you want to use? · npm
# Installing eslint-config-xo@latest, eslint@>=8.0.0, eslint-config-xo-typescript@latest, @typescript-eslint/eslint-plugin@>=5.43.0, @typescript-eslint/parser@>=5.43.0, typescript@>=4.4

# added 35 packages, and audited 151 packages in 4s

# 36 packages are looking for funding
#   run `npm fund` for details

# found 0 vulnerabilities
# Successfully created .eslintrc.js file in C:\Users ~~~~

# ------------------------------------------------------------------------



npm i -D ts-node 
# typescript를 변환없이 바로 실행할 수 있다.

npm i express
npm i -D @types/express

package.json script에 
 "lint": "eslint --fix ."
 추가해주면 린트 자동 적용
```

<br>

## nodemon

코드에 수정이 있을때, 제가 알아서 HOT reload 해주지 않는다.

매번 재실행 해야 하는 문제를 피하기 위해 nodemon을 사용.

앞에 설치한 ts-node에 대한 의존성이 있기 때문에 꼭 설치해주자.

```bash
npm i -D nodemon

npx nodemon app.ts
```

이러면 서버가 떠있게 됨.

<br>

## Rest API

대개는 “필딩 제약 조건” 4가지를 모두 만족하지 않고, Resource와 HTTP Verb만 도입하는 수준으로 사용.

GET/POST/PUT/PATCH/DELETE 등을 이용한다.

PUT은 덮어쓰기
PATCH는 일부 수정.

- 이렇게 안 하고: /write-post
- 이렇게 하자: /posts → 뭔가를 한다 (CRUD)

기본 리소스 URL: /products

1. Read (Collection) → GET /products ⇒ 상품 목록 확인
2. Read (Item) → GET /products/{id} ⇒ 특정 상품 정보 확인
3. Create (Collection Pattern 활용) → POST /products ⇒ 상품 추가 (JSON 정보 함께 전달)
4. Update (Item) → PUT 또는 PATCH /products/{id} ⇒ 특정 상품 정보 변경 (JSON 정보 함께 전달)
5. Delete (Item) → DELETE /products/{id} ⇒ 특정 상품 삭제

<br>

## fetch api

여기까지 node를 이용해 백엔드를 만든거라면, fetch api 를 이용해 frontend와 연결해준다.

개발자 도구에서 fetch('http://localhost:3000/') 입력하면

```js
fetch('http://localhost:3000/') 
-> Promise {<pending>}   

// 프로미스 객체가 나온다.
```

```js
fetch('http://localhost:3000/').then(x => console.log(x))
-> Promise {<pending>}
-> Response {type: 'basic', url: 'http://localhost:3000/', redirected: false, status: 200, ok: true, …}
```

```js
const response = await fetch('http://localhost:3000/products');
// await 걸어주면 Response객체가 나오고 그 안의
// → response.body는 ReadableStream이라고만 나온다. 처리를 해줘야 함. 
 
const reader = response.body.getReader();
// 이렇게 reader를 얻는다.

chunk = await reader.read();
// {value:Uint8Array(421), done:false}
// → chunk.value는 Uint8Array 타입.
// → 원래는 chunk.done이 true일 때까지 반복해야 한다.

// 같은거
// {
//     "value": {
//         "0": 91,
//         "1": 123,
//         "2": 34,
//         "3": 99,
//         .
//         .
//         .
//     },
//     "done": false
// }


chunk = await reader.read();
// 한번 더 하면 
// {value:undefined, done:true}
// {
//     "done": true
// }

//데이터가 날아간다.

// ------------------------------------------------------------

// 데이터 날아가지 않도록 
const response = await fetch('http://localhost:3000/products');
const reader = response.body.getReader();
const chunk = await reader.read(); // const로 변수 선언후 담아주면,

// Uint8Array(421) [91, 123, 34, 99, 97, 116, 101, 103, 111, 114, 121, 34, 58, 34, 70, 114, 117, 105, 116, 115, 34, 44, 34, 112, 114, 105, 99, 101, 34, 58, 34, 36, 49, 34, 44, 34, 115, 116, 111, 99, 107, 101, 100, 34, 58, 116, 114, 117, 101, 44, 34, 110, 97, 109, 101, 34, 58, 34, 65, 112, 112, 108, 101, 34, 125, 44, 123, 34, 99, 97, 116, 101, 103, 111, 114, 121, 34, 58, 34, 70, 114, 117, 105, 116, 115, 34, 44, 34, 112, 114, 105, 99, 101, 34, 58, 34, 36, 49, 34, 44, …]
//배열을 얻을 수 있다. 바이트 어레이.. string으로 바꿔주길 원한다.

// 디코더가 필요함

new TextDecoder().decode(chunk.value)
//'[{"category":"Fruits","price":"$1","stocked":true,"name":"Apple"},{"category":"Fruits","price":"$1","stocked":true,"name":"Dragonfruit"},{"category":"Fruits","price":"$2","stocked":false,"name":"Passionfruit"},{"category":"Vegetables","price":"$2","stocked":true,"name":"Spinach"},{"category":"Vegetables","price":"$4","stocked":false,"name":"Pumpkin"},{"category":"Vegetables","price":"$1","stocked":true,"name":"Peas"}]'

JSON.parse(new TextDecoder().decode(chunk.value))
// [
//     {
//         "category": "Fruits",
//         "price": "$1",
//         "stocked": true,
//         "name": "Apple"
//     },
//     {
//         "category": "Fruits",
//         "price": "$1",
//         "stocked": true,
//         "name": "Dragonfruit"
//     },
//     {
//         "category": "Fruits",
//         "price": "$2",
//         "stocked": false,
//         "name": "Passionfruit"
//     },
//     {
//         "category": "Vegetables",
//         "price": "$2",
//         "stocked": true,
//         "name": "Spinach"
//     },
//     {
//         "category": "Vegetables",
//         "price": "$4",
//         "stocked": false,
//         "name": "Pumpkin"
//     },
//     {
//         "category": "Vegetables",
//         "price": "$1",
//         "stocked": true,
//         "name": "Peas"
//     }
// ]
```

복잡하다...

JSON을 기본 지원한다.

```js
const response = await fetch('http://localhost:3000/products')
const data = await response.json()
// 위와 같은 배열
// [
//     {
//         "category": "Fruits",
//         "price": "$1",
//         "stocked": true,
//         "name": "Apple"
//     },
//     {
//         "category": "Fruits",
//         "price": "$1",
//         "stocked": true,
//         "name": "Dragonfruit"
//     },
//  .
//  .
//  .
// ]
```

이거를 쓰도록 클라이언트를 바꿔주기만 하면 된다.

다른 http 메서드를 쓰고싶으면 이런식.. 문서에 있다.

```js
// POST 메서드 구현 예제
async function postData(url = '', data = {}) {
  // 옵션 기본 값은 *로 강조
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE 등
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
  });
  return response.json(); // JSON 응답을 네이티브 JavaScript 객체로 파싱
}

postData('https://example.com/answer', { answer: 42 }).then((data) => {
  console.log(data); // JSON 데이터가 `data.json()` 호출에 의해 파싱됨
});

```

<https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch>

<br>

## 사용해보기

```js
// main.tsx
async function main () {
    const url = 'http://localhost:3000/products'
    const response = await retch(url)
    const data = await response.json()
    const {products} = data

    root.render(...)
}
```

이런식으로 사용하는데,. 연습용 프로젝트에서 실행해보면

`CORS policy` 에러가 난다.

기본적인 웹브라우저의 보안 정책 `동일 출처 정책` 때문이다.

## CORS (cross-origin resource sharing, 교차 출처 리소스 공유)

웹 브라우저는 `Same Origin Policy`에 따라 웹 페이지와 리소스를 요청한 곳(여기서는 REST API 서버)이 서로 다른 출처(포트까지 포함)일 때 서버에서 얻은 결과를 사용할 수 없게 막는다.

서버에 요청하고 응답을 받아오는 것까지는 이미 진행이 다 된 상황이란 점에 유의.

리소스를 주는 곳, 서버에서 이걸 허용해 줄 수 있다.

'여기에서 요청했다면 괜찮아' 하는 걸 준다. ㅋㅋㅋ 허용해주는 경로.

`간단하게 express 에는 CORS 미들웨어가 있고 *로 잡으면 다 허용한다.`

REST API 서버에서 `Headers`에 `“Access-Control-Allow-Origin”` 속성을 추가하면 된다.

Express에선 그냥 [CORS 미들웨어](https://expressjs.com/en/resources/middleware/cors.html)를 설치해서 사용하면 됨.

```bash
npm i cors
npm i -D @types/cors
```

설치 후, express 서버의 app.ts 가서 cors 사용해준다.

```js

import express from 'express';
import cors from 'cors';

const port = 3000;

const app = express();

app.use(cors());// 여러 옵션을 줄 수 있지만 우선 기본으로 사용

app.get('/', (req, res) => {
 res.send('Hello, world!');
});

```

그럼 front에서 잘 나옴.
