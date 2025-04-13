const BASE_URL = 'http://localhost:8081';

export async function startInterview() {
  const userToken = localStorage.getItem('userToken');
  try {
    console.log('Starting interview at:', `${BASE_URL}/interview`);
    const response = await fetch(`${BASE_URL}/interview`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(userToken && { Authorization: `Bearer ${userToken}` }),
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to start interview: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error starting interview:', error);
    throw error;
  }
}

export async function submitAnswer(q, ans, chatId) {
  const userToken = localStorage.getItem('userToken');

  if (!chatId || !userToken) {
    throw new Error('Missing chatId or userToken');
  }
  
  try {
    console.log('Submitting to:', `${BASE_URL}/interview/${chatId}`);
    const response = await fetch(`${BASE_URL}/interview/${chatId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({  
        question: q,
        answer: ans,
        }),
    });
    if (!response.ok) {
      throw new Error(`Failed to submit Q/A: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    if (!data.next_question || !data.name) {
      throw new Error('Invalid response structure from submitAnswer');
    }
    return data;
  } catch (error) {
    console.error('Error submitting Q/A:', error);
    throw error;
  }
}