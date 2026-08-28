const isEven = require("./isEven")

const number = parseInt(process.argv[2])

const result = []
for (let i = 1; i <= number; i++) {
    if (isEven(i)) {
        result.push(i)
    }
}

console.log(`Even numbers from 1 to ${number} are: ${result}`)