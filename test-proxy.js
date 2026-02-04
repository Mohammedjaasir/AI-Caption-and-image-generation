const main = async () => {
    try {
        const prompt = encodeURIComponent("futuristic eye");
        const url = `http://localhost:3000/api/image-proxy?prompt=${prompt}`;
        console.log('Testing URL:', url);
        const res = await fetch(url);
        console.log('Status:', res.status);
        console.log('Content-Type:', res.headers.get('content-type'));
        if (!res.ok) {
            console.log('Error Text:', await res.text());
        } else {
            const buffer = await res.arrayBuffer();
            console.log('Success! Image size:', buffer.byteLength);
        }
    } catch (e) {
        console.error('Fetch failed:', e);
    }
};
main();
