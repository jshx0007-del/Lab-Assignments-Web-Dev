const crypto = require('crypto');

const rolls = parseInt(process.argv[2])
if (!rolls || rolls < 1) {
    rolls = 1
}
const rollDice = () => {
    return crypto.randomInt(1, 7)
}
console.log(`Rolling the dice ${rolls} time(s)...`);


for (let i = 0; i < rolls; i++) {
    console.log(`Roll ${i + 1}: ${rollDice()}`)
}