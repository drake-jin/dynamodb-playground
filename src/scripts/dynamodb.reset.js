const { dynamoDB } = require('lib/dynamodb')

const app = async () => {
  // get Tables on local dynamoDB
  const { TableNames: listTables } = await new Promise((resolve, reject) => {
    dynamoDB.listTables({}, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })

  // delete all tables
  const deleteTablesPromise = listTables.map(item => new Promise((resolve, reject) => {
    dynamoDB.deleteTable({ TableName: item }, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  }))

  try {
    await Promise.all(deleteTablesPromise)
  } catch (e) {
    console.log(e)
  } finally {
    process.exit()
  }
}

app()
