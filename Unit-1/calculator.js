console.log("CLI Calculator");
const args = process.argv.slice(2);
const operation = args[0]
const num1 = parseFloat(args[1])
const num2 = parseFloat(args[2])

console.log("Operation Requested:", operation)
console.log("First Number:", num1)
console.log("Second Number:", num2)

if (!operation || isNaN(num1) || isNaN(num2)) {
    console.log("Error: Invalid Input")
    process.exit(1)
}
let result;

if (operation === "add") {
    result = num1 + num2
} else if (operation === "subtract") {
    result = num1 - num2
} else if (operation === "multiply") {
    result = num1 * num2
} else if (operation === "divide") {
    if (num2 === 0) {
        console.log("Error: Cannot divide by zero")
    }
    result = num1 / num2
} else {
    console.log("Error: Invalid opertion!")
    process.exit(1)
}
console.log("Result:", result)