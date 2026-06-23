import fs from "fs";
import path from "path";

const reportPath = path.join(process.cwd(), "test-results.json");

if (!fs.existsSync(reportPath)) {
    console.error("test-results.json not found. Run tests first with `npm run test`");
    process.exit(1);
}

const report = JSON.parse(fs.readFileSync(reportPath, "utf-8"));

const formatTime = (ms) => {
    if (ms < 1000) return `${ms.toFixed(0)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
};

const generateReport = () => {
    let output = "\n";
    output += "═".repeat(80) + "\n";
    output += "TEST REPORT\n";
    output += "═".repeat(80) + "\n\n";

    // Summary
    output += "📊 SUMMARY\n";
    output += "─".repeat(80) + "\n";
    output += `Total Tests: ${report.numTotalTests}\n`;
    output += `✅ Passed: ${report.numPassedTests}\n`;
    output += `❌ Failed: ${report.numFailedTests}\n`;
    output += `⏭️  Pending: ${report.numPendingTests}\n`;
    output += `📦 Test Files: ${report.numTotalTestSuites}\n\n`;

    // Results by file
    output += "📋 TEST FILES\n";
    output += "─".repeat(80) + "\n";

    report.testResults.forEach((fileResult) => {
        const fileName = path.basename(fileResult.name);
        const status = fileResult.status === "passed" ? "✅" : "❌";

        output += `\n${status} ${fileName}\n`;
        output += `   Duration: ${formatTime(fileResult.endTime - fileResult.startTime)}\n`;

        fileResult.assertionResults.forEach((test) => {
            const testStatus = test.status === "passed" ? "  ✓" : "  ✗";
            output += `   ${testStatus} ${test.title} (${formatTime(test.duration)})\n`;

            if (test.failureMessages.length > 0) {
                test.failureMessages.forEach((msg) => {
                    output += `      Error: ${msg}\n`;
                });
            }
        });
    });

    output += "\n" + "═".repeat(80) + "\n";
    output += report.success ? "✅ ALL TESTS PASSED\n" : "❌ SOME TESTS FAILED\n";
    output += "═".repeat(80) + "\n\n";

    return output;
};

const formattedReport = generateReport();
console.log(formattedReport);

// Save to file
const reportFile = path.join(process.cwd(), "test-report.txt");
fs.writeFileSync(reportFile, formattedReport);
console.log(`📄 Report saved to: test-report.txt\n`);
