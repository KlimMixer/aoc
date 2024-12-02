function parse(input: string) {
    return input.split("\n")
        .filter((line) => line)
        .map((line) => line
            .split(" ")
            .map((num) => parseInt(num))
        );
}

function checkReportSafe(report: number[]): boolean {
    let previousLevel = report[0];
    let targetDirection = (previousLevel - report[1]) / Math.abs(previousLevel - report[1]);
    for (let i = 1; i < report.length; i += 1) {
        const level = report[i];
        
        const direction = (previousLevel - level) / Math.abs(previousLevel - level);
        const levelDifference = Math.abs(previousLevel - level);

        if (targetDirection != direction || levelDifference > 3 || levelDifference < 1 ) {
            return false;
        }

        previousLevel = level;
    }

    return true;
}

export async function countSafeReports(sessionToken: string) {
    const response = await fetch("https://adventofcode.com/2024/day/2/input", {
        "headers": {
            "cookie": `session=${sessionToken}`,
        },
    });

    const initData = await response.text();

    const parsedData = parse(initData);

    return parsedData.map(checkReportSafe).filter((isSafe) => isSafe).length;
}

function checkReportSafeWithDamper(report: number[]): boolean {
    let previousLevel = report[0];
    let targetDirection = (previousLevel - report[1]) / Math.abs(previousLevel - report[1]);
    let fixUsed = false;

    for (let i = 1; i < report.length; i += 1) {
        const level = report[i];
        
        const direction = (previousLevel - level) / Math.abs(previousLevel - level);
        const levelDifference = Math.abs(previousLevel - level);

        if (targetDirection != direction || levelDifference > 3 || levelDifference < 1) {
            const nextLevel = report[i + 1];

            if (nextLevel && !fixUsed) {
                const nextDirection = (previousLevel - nextLevel) / Math.abs(previousLevel - nextLevel);
                const nextLevelDifference = Math.abs(previousLevel - nextLevel);

                if (targetDirection == nextDirection || (nextLevelDifference > 1 && nextLevelDifference < 3)) {
                    // fixUsed = true;
                    continue;
                }
            }

            return false;
        }

        previousLevel = level;
    }

    return true;
}

export async function countSafeReportsWithDamper(sessionToken: string) {
    const response = await fetch("https://adventofcode.com/2024/day/2/input", {
        "headers": {
            "cookie": `session=${sessionToken}`,
        },
    });

    const initData = await response.text();

    const parsedData = parse(initData);

    return parsedData.map(checkReportSafeWithDamper).filter((isSafe) => isSafe).length;
}