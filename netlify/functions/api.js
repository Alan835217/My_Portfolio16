import serverless from 'serverless-http';
import app from '../../server/index.js';

const serverlessHandler = serverless(app);

export const handler = async (event, context) => {
  try {
    return await serverlessHandler(event, context);
  } catch (err) {
    console.error('Netlify Function Error:', err);
    return {
      statusCode: 200, // Return 200 so the frontend doesn't crash, but sends error info
      body: JSON.stringify({ error: 'Internal Server Error', details: err.message, status: 'safe-fail' })
    };
  }
};
