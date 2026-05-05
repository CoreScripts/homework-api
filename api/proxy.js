<script>
    async function directSearch() {
        const query = document.getElementById('testInput').value;
        const status = document.getElementById('status');
        const API_KEY = "pMRxya1JxKHz9vlAz0IrbCiyYIxsAXvXNgJnEafo0OyXqpUmTGUyIMCHjiqwpM9F";

        status.innerText = "Connecting...";

        try {
            const response = await fetch(`https://api.klipy.com/v1/gifs/search?q=${encodeURIComponent(query)}&per_page=6`, {
                method: 'GET',
                headers: {
                    'x-api-key': API_KEY,
                    'Accept': 'application/json'
                }
            });

            // STEP 1: Check the status code
            console.log("Status Code:", response.status);

            // STEP 2: Get the raw text instead of JSON
            const rawText = await response.text();
            console.log("Raw Response:", rawText);

            if (!rawText) {
                status.innerText = "FAILED: Klipy sent an empty response. (Key likely pending)";
                return;
            }

            // STEP 3: Only parse if we have text
            const json = JSON.parse(rawText);
            status.innerText = "SUCCESS!";
            // ... (render logic)

        } catch (err) {
            status.innerText = "ERROR: " + err.message;
        }
    }
</script>
