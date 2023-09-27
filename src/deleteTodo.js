import AWS from 'aws-sdk'

const deleteTodo = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient()

    const { id } = event.pathParameters

    try{
        await dynamodb.delete({
            TableName:"TodoTable",
            Key:{
                id:id
            }
        }).promise()
        
    }catch(error){
        console.log(error)
    }

    return {
        statusCode:200,
        body: JSON.stringify("Deleted .............")
    }
}

export { deleteTodo as handler }