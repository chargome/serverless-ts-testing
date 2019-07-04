require('./config.ts');
import { DynamoDB } from 'aws-sdk';
import { assert } from 'chai';
import * as controllerService from '../lambda/core/ContainerService';
import { Container } from '../lambda/types/Container';

const testContainer: Container = {
  containerId: 'KKKK1111111',
  lotId: 'lot1',
  box: false,
};

beforeAll(() => {
  const dynamo: DynamoDB.DocumentClient = new DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  });
  controllerService.setNewDynamoClient(dynamo);
});

afterAll(() => {
  const dynamo: DynamoDB.DocumentClient = new DynamoDB.DocumentClient();
  controllerService.setNewDynamoClient(dynamo);
});

describe('Test database save and get item', () => {

  it('should save a container', async(done: jest.DoneCallback) => {
    try {
      await controllerService.saveContainer(testContainer);
      done();  
    } 
    catch (error) {
      console.log(error);
    }
  });

  it('should get a container by id', async(done: jest.DoneCallback) => {
    try {
      let res = await controllerService.getContainerById(testContainer.containerId, testContainer.lotId);
      assert.equal(res.Item.containerId, testContainer.containerId);
      done();
    } 
    catch (error) {
      console.log(error);
    }
  });
});