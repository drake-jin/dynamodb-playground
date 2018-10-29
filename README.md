# dynamodb-playground

 > 다이나모 CRUD예제를 만들어봅니다.

이 예제는 작성자의 프로그래밍 스타일과 소스코드 관리 구조 전략이 녹아져 있지만 제법 허접합니다.
허접한 만큼 피드백이나 다양한 구조에 대한 제안은 언제나 환영입니다.

부족한만큼 배울게 많다는것이구 배운다는것은 언제나 즐거운일입니다. :) 피드백은 언제나 환영입니다.

# requirements

1. docker & docker-compose
2. pm2
3. postman2

# 예제: 주소록 관리 API - POSTMAN

파일 dynamodb-playground.postman_collection.v.2.1.json 로 작성해놓음

- GET - /users
- POST - /users
- GET - /users/:id
- PUT - /users/:id
- PATCH - /users/:id
- DELETE - /users/:id

# 소스코드 구성

- dynamodb - Dockerfile로 요구되는 dynamodb의 스펙을 작성해놓음
- src/lib - 소스코드에서 공통으로 사용하는 부분을 따로 빼 놓았다.
- src/lib/utils - 유틸의 성격을 띄는 녀석을 분리해두었다.
- src/scripts/dynamodb.init.js - DynamoDB TABLE의 Schema의 내용을 토대로 TABLE을 생성한다. 
- src/scripts/dynamodb.reset.js - DynamoDB의 TABLE을 날리는 스크립트가 작성되어있다.
- src/scripts/dynamodb.schema.js - Dynamodb의 TABLE에 대한 Schema가 들어있다. 
- src/routes - URI에 대한 작업을 담당하는 녀석들이 들어 있다.
- src/routes/${domain}/index.js - 라우팅에 대한 미들웨어들을 지정한다.
- src/routes/${domain}/${domain}.validation.js - 요청값들에 대한 validation만 검증한다.
- src/routes/${domain}/${domain}.ctrl.js - validation이 끝난 값들을 이용하여 service로 연결해주는 역할을 하며 formatting의 역할도 함께 담당한다. 
- src/routes/${domain}/${domain}.service.js - controller를 통해 들어온 입력값들을 이용하여 business logic을 수행한다. 그리고 예제의 규모상 데이터(resoueces)들의 접근 역할도 함께한다.

# 후기

아. dynamoDBClient.get예제 안썻다.

DynamoDB 테이블 셋팅 이것저것 다 쓰는거 보여줄라고 스키마를 저래 정의해놓았는데.. get대신에 query로 대체해버린 코드가 있다. 해당 문제는.. DynamoDB 설계에 대한 문제이기 때문에... 하핳...

``` js
const userModelGetUserById = id => dynamoDBClient.query({
  TableName: 'CONTACT',
  IndexName: 'GSI_id',
  KeyConditionExpression: '#id = :id',
  ExpressionAttributeNames: {
    '#id': 'id',
  },
  ExpressionAttributeValues: {
    ':id': id,
  },
}).promise()
```