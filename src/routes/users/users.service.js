const { dynamoDBClient } = require('lib/dynamodb')
const { v4 } = require('uuid')
const { BusinessLogicError } = require('lib/utils/error')

// models 로 빼버려서 DB, HTTP Resouece, ThirdParty API 에 대한 자원들을 관리하는것을 directory로 만들어버린다.
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


module.exports.getUserListService = (params) => dynamoDBClient.scan({
  TableName: 'CONTACT',
  ProjectionExpression: '#phone, #name, #id, #status',
  FilterExpression: '#status = :status',
  ExpressionAttributeNames: {
    '#status': 'status',
    '#phone': 'phone',
    '#id': 'id',
    '#name': 'name',
  },
  ExpressionAttributeValues: {
    ':status': 'display',
  },
  Limit: 10,
}).promise()

module.exports.postUserService = params => {
  const id = v4()
  return dynamoDBClient.put({
    TableName: 'CONTACT',
    Item: {
      id,
      status: 'display',
      ...params,
      cr_dt: Math.floor((new Date).getTime()/1000),
      cr_user: id,
      ud_dt: Math.floor((new Date).getTime()/1000),
      ud_user: id,
    },
    ConditionExpression: 'attribute_not_exists(id)'
  }).promise()
}

module.exports.getUserService = ({ id }) => new Promise(async (resolve, reject) => {
  try {
    const { Items } = await userModelGetUserById(id)

    if (Items.length === 0) {
      reject(new BusinessLogicError({ httpStatusCode: 404, message: 'patchUserService' }))
      // throw new BusinessLogicError({ httpStatusCode: 404, message: 'patchUserService' })
      // throw new 는 로그가 runtime error처럼 찍혀서 마음에 안들어서 바꿈.
      // 이는 취향과 전략 차이라고 생각함.
      return
    }
    const [getUser] = Items
    resolve(getUser)
  } catch (e) {
    reject(e)
  }
})


module.exports.putUserService = ({ id, phone, nickname, age, job, location, groups }) => new Promise(async (resolve, reject) => {
  try {
    const { Items } = await userModelGetUserById(id)

    if (Items.length === 0) {
      reject(new BusinessLogicError({ httpStatusCode: 404, message: 'patchUserService' }))
      return
    }
    const [getUserResult] = Items

    const putUserResult = await dynamoDBClient.update({
      TableName: 'CONTACT',
      Key: {
        id,
        name: getUserResult.name,
        // parameter에서 name값을 가져오지만, 예제를 위해 getUser로 데이터를 가져옴, 실제 사례에서는.. 이런 경우는 없을것임... 
        // key로 쓸 항목이 부족해서 name을 선택함.
      },
      UpdateExpression: [
        'SET #phone = :phone',
        '#nickname = :nickname',
        '#age = :age',
        '#job = :job',
        '#location = :location',
        '#groups = :groups',
      ].join(', '),
      // ValidationException: Invalid UpdateExpression: Syntax error; token:
      // 쿼리를 한줄로 입력 하지 않으면 Syntax Error를 뿜는다.
      ConditionExpression: '#id = :id',
      ExpressionAttributeNames: {
        '#phone': 'phone',
        '#nickname': 'nickname',
        '#age': 'age',
        '#job': 'job',
        '#location': 'location',
        '#groups': 'groups',
        '#id': 'id',
      },
      ExpressionAttributeValues: {
        ':phone': phone,
        ':nickname': nickname,
        ':age': age,
        ':job': job,
        ':location': location,
        ':groups': groups,
        ':id': id,
      }
    }).promise()
    resolve(putUserResult)
  } catch (e) {
    reject(e)
  }
})

module.exports.patchUserService = ({ id, status }) => new Promise(async (resolve, reject) => {
  try {
    const { Items } = await userModelGetUserById(id)

    if (Items.length === 0) {
      reject(new BusinessLogicError({ httpStatusCode: 404, message: 'patchUserService' }))
      return
    }
    const [getUser] = Items

    const patchStateToUserResult = await dynamoDBClient.update({
      TableName: 'CONTACT',
      Key: {
        id: getUser.id,
        name: getUser.name,
      },
      UpdateExpression: [
        'SET #status = :status',
      ].join(', '),
      // ValidationException: Invalid UpdateExpression: Syntax error; token:
      // 쿼리를 한줄로 입력 하지 않으면 Syntax Error를 뿜는다.
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':status': status,
      }
    }).promise()

    resolve(patchStateToUserResult)
  } catch (e) {
    reject(e)
  }
})

module.exports.deleteUserService = ({ id }) => new Promise(async (resolve, reject) => {
  try {
    const { Items } = await userModelGetUserById(id)
    if (Items.length === 0) {
      reject(new BusinessLogicError({ httpStatusCode: 404, message: 'deleteUserService' }))
      return
    }
    const [getUser] = Items

    const deleteUserResult = await dynamoDBClient.delete({
      TableName: 'CONTACT',
      Key: {
        id,
        name: getUser.name
      }
    }).promise()
    resolve(deleteUserResult)
  } catch (e) {
    reject(e)
  }
})