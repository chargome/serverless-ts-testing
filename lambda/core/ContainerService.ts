import { DynamoDB, AWSError } from 'aws-sdk';
import { Container } from '../types/Container';
import { PromiseResult } from 'aws-sdk/lib/request';
// import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context } from 'aws-lambda';

let dbClient: DynamoDB.DocumentClient = new DynamoDB.DocumentClient();

export const saveContainer = async(_container: Container): Promise<PromiseResult<DynamoDB.DocumentClient.PutItemOutput, AWSError>> => {

  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: process.env.CONTAINER_TABLE_NAME,
    Item: {
      'containerId': _container.containerId,
      'lotId': _container.lotId,
      'box': _container.box
    }
  };

  return dbClient.put(params).promise();

};

export const getContainerById = async(_containerId: String, _lotId: String): Promise<PromiseResult<DynamoDB.DocumentClient.GetItemOutput, AWSError>> => {

  const params: DynamoDB.DocumentClient.GetItemInput = {
    TableName: process.env.CONTAINER_TABLE_NAME,
    Key: {
      'containerId': _containerId,
      'lotId': _lotId
    }
  };

  return dbClient.get(params).promise();
};

// Helper method for testing on local dynamo node
export const setNewDynamoClient = (newDynamo: DynamoDB.DocumentClient) => {
  dbClient = newDynamo;
};