# [Jest Install](https://jestjs.io/docs/en/getting-started)

###  Jest Install

* Install Jest unsing ``yarn`` or ``npm``

  ```bash
  yarn add --dev jest
  ```

  ```bash
  npm install --save-dev jest
  ```

### Create Test Javascript file

* Test할 source code의 파일 명이 ``sum.js``라고 가정하자.

  ```javascript
  function sum(a, b) {
    return a + b;
  }
  module.exports = sum;
  ```

* Test Source code file을 다음과 같은 이름으로 작성 ``sum.test.js``

  ```javascript
  const sum = require('./sum');
  
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
  ```

* ``package.json`` 추가하기

  ```
  {
  	...,
    "scripts": {
      "test": "jest"
    }
  }
  ```

### Run Test

* 다음과 같은 cmd로 test를 돌릴 수 있다.

  ```bash
  yarn test
  ```

  ```bash
  npm run test
  ```

  ```bash
  ./node_modules/.bin/jest
  ```

* coverage를 확인 하는 방법은 아래 cmd이다

  ```bash
  ./node_modules/.bin/jest --coverage
  ```
### 예시

<center><img src="/Users/jeonsang-gyu/Desktop/Coding-Hour/Docs/src/Screen Shot 2020-05-20 at 2.56.35 PM.png" alt="Screen Shot 2020-05-20 at 2.56.35 PM" style="zoom:50%;" /></center>

> * 아무래도 해당 repo에 있는 모든 파일 중 ``*.test.js``에 대하여 모두 실행하는 것 같다
> * 고로, ``App.test.js``처러 jest에서 지원하지않는 test는 실행할 수 없기에 참고하자!