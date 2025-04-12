const BASE_URL = 'http://localhost:8081';

export async function startInterview(studentName = '') {
  const userToken = localStorage.getItem('userToken');
  try {
    console.log('Starting interview at:', `${BASE_URL}/interview`);
    const response = await fetch(`${BASE_URL}/interview`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(userToken && { Authorization: `Bearer ${userToken}` }),
      },
      body: JSON.stringify(studentName ? { studentName } : {}),
    });
    if (!response.ok) {
      throw new Error(`Failed to start interview: ${response.statusText}`);
    }
    const data = await response.json();
    if (!data.userId || !data.sessionId || !data.initialQuestion) {
      throw new Error('Invalid response structure from startInterview');
    }
    return data;
  } catch (error) {
    console.error('Error starting interview:', error);
    throw error;
  }
}

export async function submitAnswer(studentName, chatId, question, answer) {
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
      body: JSON.stringify({ studentName, question, answer }),
    });
    if (!response.ok) {
      throw new Error(`Failed to submit Q/A: ${response.statusText}`);
    }
    const data = await response.json();
    if (!data.question) {
      throw new Error('Invalid response structure from submitAnswer');
    }
    return data;
  } catch (error) {
    console.error('Error submitting Q/A:', error);
    throw error;
  }
}