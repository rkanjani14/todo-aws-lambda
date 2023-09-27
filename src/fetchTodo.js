import AWS from 'aws-sdk'

const fetchTodo = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient()
    const { id } = event.pathParameters

    let todo;
    try{
        const result = await dynamodb.get({
            TableName:"TodoTable",
            Key:{
                id:id
            }
        }).promise()
        todo = result.Item
    }catch(error){
        console.log(error)
    }

    return {
        statusCode:200,
        body: JSON.stringify(todo)
    }
}

export { fetchTodo as handler }