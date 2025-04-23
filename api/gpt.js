export default async function handler(req, res) {
    const apiKey = process.env.VITE_OPENAI_API_KEY;
  
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { messages } = req.body;
  
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid or missing messages array' });
    }
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: messages,
          temperature: 0.7
        })
      });
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong', details: err.message });
    }
  }
  