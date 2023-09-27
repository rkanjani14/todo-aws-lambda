import AWS from 'aws-sdk'

const updateTodo = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient()
    const { id } = event.pathParameters
    const { completed } = JSON.parse(event.body)

    let todo
    try{
        const result = await dynamodb.update({
            TableName:"TodoTable",
            Key:{
                id:id
            },
            UpdateExpression: 'SET completed = :completed',
            ExpressionAttributeValues:{
                ":completed":completed
            },
            ReturnValues:"ALL_NEW"
        }).promise()
        console.log(result)
        todo = result.Attributes
    }catch(error){
        console.log(error)
    }

    return {
        statusCode:200,
        body: JSON.stringify(todo)
    }
}

export { updateTodo as handler }