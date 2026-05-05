export default async function handler(req, res) {
    const { q } = req.query;
    const KLIPY_KEY = "pMRxya1JxKHz9vlAz0IrbCiyYIxsAXvXNgJnEafo0OyXqpUmTGUyIMCHjiqwpM9F"; 

    // 1. Check if the query is actually there
    if (!q) return res.status(400).json({ error: "Missing search query" });

    const url = `https://api.klipy.com/v1/gifs/search?q=${encodeURIComponent(q)}&per_page=12`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 
                'x-api-key': KLIPY_KEY,
                'Accept': 'application/json',
                // This makes the request look like it's coming from a browser
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://klipy.com/'
            }
        });

        // 2. Get the raw text first to avoid the "JSON end" error
        const text = await response.text();
        
        if (!text) {
            return res.status(500).json({ error: "Klipy sent an empty response. Is the API key active?" });
        }

        // 3. Now try to parse it
        const data = JSON.parse(text);

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);

    } catch (err) {
        res.status(500).json({ 
            error: "Proxy internal error", 
            detail: err.message 
        });
    }
}
