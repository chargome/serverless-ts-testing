import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context } from 'aws-lambda';
import 'source-map-support/register';
import { saveContainer, getContainerById } from '../../core/ContainerService';
import { Container } from '../../types/Container';

/*
    POST: ADD CONTAINER
*/
export const addContainer: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context: Context) => {

  console.log(event);
  
  const container: Container = JSON.parse(event.body).container;

  try {
    let res = await saveContainer(container);
    console.log('saveContainerRes: ', res.$response.data);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Success',
//        container: res.$response,
      }, null, 2),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Error',
      }, null, 2),
    };
  }

  
}


/*
    GET: GET CONTAINER BY ID
*/
export const getContainer: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context: Context) => {
  console.log(event);
  const containerId: String = event.queryStringParameters.containerId;
  const lotId: String = event.queryStringParameters.lotId;

  try {
    let res = await getContainerById(containerId, lotId);
    console.log('getContainerRes: ', res.$response.data);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Success',
//        container: res.$response,
      }, null, 2),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Error',
      }, null, 2),
    };
  }
}
