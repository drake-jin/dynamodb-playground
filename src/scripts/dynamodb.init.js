const schema = require('scripts/dynamodb.schema')
const { dynamoDB } = require('lib/dynamodb')


const app = async () => {
  // create Tables on local dynamoDB
  const createTablePromises = schema.map(item => new Promise((resolve, reject) => {
    dynamoDB.createTable(item, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  }))

  try {
    const resultOfCreateTable = await Promise.all(createTablePromises)
    console.log(resultOfCreateTable)

  } catch (e) {
    console.log(e)
    process.exit()
  }

  const { TableNames: completeTables } = await new Promise((resolve, reject) => {
    dynamoDB.listTables({}, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
  console.log(completeTables)

  process.exit()
}

app()
