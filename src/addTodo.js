import {v4} from 'uuid'
import AWS from 'aws-sdk'

const addTodo = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient()

  const id  = v4()
  const createdAt = new Date()
  const { todo } = JSON.parse(event.body)

  const newTodo = {
    id,
    todo,
    createdAt,
    completed:false
  }

  await dynamodb.put({
    TableName:"TodoTable",
    Item:newTodo
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};

export  { addTodo as handler }