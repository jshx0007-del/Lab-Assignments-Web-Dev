const fs = require('fs');

const args = process.argv.slice(2);
console.log("CLI Arguments:", args);

const filepath = 'demo.txt';

console.log("Start of script");

fs.writeFileSync(filepath, "Hello from sync write!");
console.log("File written synchronously");

console.log("Calling readFile (async)...");
fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
        console.log("Error reading file:", err.message);
        return;
    }
    console.log("File read asynchronously:", data);
    fs.unlink(filepath, (err) => {
        if (err) {
            console.log("Error deleting file:", err.message);
            return;
        }
        console.log("File deleted successfully");
    });
});

console.log("End of script (this runs before the async callback above)");