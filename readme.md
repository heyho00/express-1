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
