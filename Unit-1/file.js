const fs = require('fs')
const filepath = 'file.js'

function createFile(){
    fs.writeFile(filepath, "console.log('Hello World!')", (err) => {
        if (err) {
            console.log("Error creating file:", err.message)
            return
        }
        console.log("File created successfully")
        readFile()
    })
}

function readFile(){
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.log("Error reading file:", err.message)
            return
        }
        console.log("File content:\n", data)
        updateFile()  
    })
}

function updateFile(){
    fs.appendFile(filepath, "\nconsole.log('File updated!')", (err) => {
        if (err) {
            console.log("Error updating file:", err.message);
            return;
        }
        console.log("File updated successfully.");

        fs.readFile(filepath, "utf8", (err, data) => {
            if (err) {
                console.log("Error reading updated file:", err.message);
                return;
            }
            console.log(data);
            deleteFile();
        });
    })
}

function deleteFile(){
    fs.unlink(filepath, (err)=>{
        if (err){
            console.log("Error deleting file:", err.message);
        } else {
            console.log("File deleted successfully.");
        }
    })
}

createFile()