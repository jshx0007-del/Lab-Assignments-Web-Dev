const isEven = require("./isEven")
const logger = require("./logger")
const number = parseInt(process.argv[2])

const result = []
for (let i = 1; i <= number; i++) {
    if (isEven(i)) {
        result.push(i)
    }
}

logger(`Even numbers from 1 to ${number} are: ${result}`)