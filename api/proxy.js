export default async function handler(req, res) {
    const { q } = req.query;
    const KLIPY_KEY = "pMRxya1JxKHz9vlAz0IrbCiyYIxsAXvXNgJnEafo0OyXqpUmTGUyIMCHjiqwpM9F"; 

    // Try the "v1" search endpoint with a fallback check
    const url = `https://api.klipy.com/v1/gifs/search?q=${encodeURIComponent(q)}&per_page=12`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 
                'x-api-key': KLIPY_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            // This will help us see the SPECIFIC error from Klipy (like "Invalid Key")
            const errorText = await response.text();
            return res.status(response.status).json({ error: "Klipy rejected us", detail: errorText });
        }

        const data = await response.json();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to connect to Klipy", message: err.message });
    }
}
