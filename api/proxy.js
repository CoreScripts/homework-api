export default async function handler(req, res) {
    const { q } = req.query; // This is the search word (like "funny cat")
    const KLIPY_KEY = "pMRxya1JxKHz9vlAz0IrbCiyYIxsAXvXNgJnEafo0OyXqpUmTGUyIMCHjiqwpM9F"; 

    // This is the Klipy search address
    const url = `https://api.klipy.com/v1/gifs/search?q=${encodeURIComponent(q)}&per_page=12`;

    try {
        const response = await fetch(url, {
            headers: { 'x-api-key': KLIPY_KEY }
        });
        const data = await response.json();

        // These "headers" tell your iPad it's safe to load this data
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to connect to Klipy" });
    }
}
