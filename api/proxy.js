export default async function handler(req, res) {
    const { q } = req.query;
    // Make sure there are NO extra spaces in this string!
    const KLIPY_KEY = "pMRxya1JxKHz9vlAz0IrbCiyYIxsAXvXNgJnEafo0OyXqpUmTGUyIMCHjiqwpM9F"; 

    const url = `https://api.klipy.com/v1/gifs/search?q=${encodeURIComponent(q)}&per_page=12`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 
                'x-api-key': KLIPY_KEY,
                'Accept': 'application/json'
            }
        });

        // This part is crucial for Test Keys
        if (response.status === 401) return res.status(401).json({ error: "Key not active yet or invalid." });
        if (response.status === 429) return res.status(429).json({ error: "Slow down! Test key rate limit reached." });

        const data = await response.json();
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    } catch (err) {
        // If it's a network error, Vercel will tell us here
        res.status(500).json({ error: "Connection Timeout", detail: err.message });
    }
}
