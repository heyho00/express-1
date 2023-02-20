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
```
