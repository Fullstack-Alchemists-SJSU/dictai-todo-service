import vapiService from './services/vapiService';
import openAIService from './services/openAIService';

async function testFullFlow() {
  try {
    // Replace with an actual call ID from your Vapi account
    const callId = '8ebb6d93-5012-45eb-bc44-bb433ab3f3e0';
    console.log('Testing full flow...');
    
    // Step 1: Get call data from Vapi
    console.log('\n1. Fetching call data from Vapi...');
    const callData = await vapiService.getCall(callId);
    console.log('Call data received successfully');
    
    // Step 2: Get transcript from call data
    const transcript = callData.transcript || callData.artifact?.transcript;
    if (!transcript) {
      throw new Error('No transcript found in call data');
    }
    console.log('\n2. Transcript:', transcript);
    
    // Step 3: Extract todos using OpenAI
    console.log('\n3. Extracting todos using OpenAI...');
    const todos = await openAIService.extractTodos(transcript);
    console.log('\nExtracted Todos:', JSON.stringify(todos, null, 2));
    
    console.log('\nTest completed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testFullFlow(); 