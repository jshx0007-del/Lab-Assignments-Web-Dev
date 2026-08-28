const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>Welcome to Smart Utility Toolkit</h1>");
        res.end();
    } else if (req.url === "/about") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>About Page</h1>");
        res.end();
    } else if (req.url === "/contact") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>Contact Page</h1>");
        res.end();
    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write("<h1>404 Not Found Page</h1>");
        res.end();
    }
    console.log("Response sent! Status: " + res.statusCode);
});


server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})