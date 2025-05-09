import openAIService from './services/openAIService';

async function testFullFlow() {
  try {
    
    // Step 2: Get transcript from call data
    const transcript = `
    AI: How was your day?
    User: My day was good. I actually got an offer letter today for the role of software engineer for a company called Espresso AI. So I'm really excited for that. I'm joining on June second. 
    AI: That's fantastic news. Congratulations on receiving the offer for the software engineer role at Espresso AI. It sounds like an exciting opportunity. How are you feeling about starting this new chapter in your career?
    User: It's very exciting. I mean, uh, the market situation is very tough right now. So, uh, it's, uh, reassuring feeling. And, also, I'm pretty excited to start the new new team, new work, And, yeah, all in all, feeling really good. 
    AI: Absolutely. It's completely understandable to feel reassured and excited about this new opportunity. Especially during uncertain times in the job market. Starting with a new team and engaging in new projects can be invigorating. Is there anything specific you're looking forward to as you prepare to join Espresso AI?
    `
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