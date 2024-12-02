import { parseArgs } from "util";
import { calculateDistanceFirst, calculateSimilarityScore } from "./firstDay";

const { values } = parseArgs({
    args: Bun.argv,
    options: {
      sessionToken: {
        type: 'string',
      },
    },
    strict: true,
    allowPositionals: true,
});

if (!values.sessionToken) {
    console.warn("Please provide your session Token for cookie to get task input");
    process.exit();
}

console.log("--------Day 1 tasks---------");
console.log("|-------Task 1--------------")
console.log(` |------Answer: ${await calculateDistanceFirst(values.sessionToken)}`);
console.log("|-------Task 2--------------")
console.log(` |------Answer: ${await calculateSimilarityScore(values.sessionToken)}`);