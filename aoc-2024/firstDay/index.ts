type Data = {left: number[], right: number[]};

const zip = (a, b) => a.map((k, i) => [k, b[i]]);

function parse(input: string) {
    return input
        .split("\n")
        .filter((line) => !!line)
        .map(line => line.split("   ").map(num => parseInt(num)))
        .reduce((acc: Data, nums: number[]) => {
            acc.left.push(nums[0]);
            acc.right.push(nums[1]);
            return acc;
        }, {left: [], right: []});
}

function processDistance(parsedData: Data) {
    const left = parsedData.left.sort();
    const right = parsedData.right.sort();
    return zip(left, right).reduce((acc, nums) => {
        return acc + ((nums[0] > nums[1])?nums[0] - nums[1]:nums[1]-nums[0]);
    }, 0);
}

export async function calculateDistanceFirst(sessionToken: string) {
    const response = await fetch("https://adventofcode.com/2024/day/1/input", {
        "headers": {
            "cookie": `session=${sessionToken}`,
        },
    });

    const initData = await response.text();

    const parsedData = parse(initData);

    return processDistance(parsedData);
}

function processSimilarity(parsedData: Data) {
    const left = new Set(parsedData.left);
    const right = parsedData.right.sort();
    return left.values().reduce((acc, num) => acc + num * right.filter(x => x === num).length, 0);
}

export async function calculateSimilarityScore(sessionToken: string) {
    const response = await fetch("https://adventofcode.com/2024/day/1/input", {
        "headers": {
            "cookie": `session=${sessionToken}`,
        },
    });

    const initData = await response.text();

    const parsedData = parse(initData);

    return processSimilarity(parsedData);
}