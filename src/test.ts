import { VideoWatchingApp } from "./VideoWatchingApp.js";

// Simple test to demonstrate the functionality
function runTest(): void {
  console.log("=".repeat(60));
  console.log("VIDEO WATCHING APP TEST");
  console.log("=".repeat(60));

  const app = new VideoWatchingApp();

  // Start the app
  app.main();

  // Simulate watching several videos with different durations
  console.log("\nSimulating video watching session...");

  // Watch first video for 5 seconds
  setTimeout(() => {
    console.log(`\nCurrent video info:`, app.getCurrentVideoInfo());
    app.nextVideo();
  }, 5000);

  // Watch second video for 3 seconds
  setTimeout(() => {
    console.log(`\nCurrent video info:`, app.getCurrentVideoInfo());
    app.nextVideo();
  }, 8000);

  // Watch third video for 7 seconds
  setTimeout(() => {
    console.log(`\nCurrent video info:`, app.getCurrentVideoInfo());
    app.nextVideo();
  }, 15000);

  // Watch fourth video for 2 seconds
  setTimeout(() => {
    console.log(`\nCurrent video info:`, app.getCurrentVideoInfo());
    app.nextVideo();
  }, 17000);

  // Watch fifth video for 4 seconds then exit
  setTimeout(() => {
    console.log(`\nCurrent video info:`, app.getCurrentVideoInfo());
    app.exit();

    console.log("\n=".repeat(60));
    console.log("TEST COMPLETED");
    console.log("=".repeat(60));
  }, 21000);
}

// Alternative quick test that doesn't rely on real timing
function runQuickTest(): void {
  console.log("=".repeat(60));
  console.log("VIDEO WATCHING APP QUICK TEST");
  console.log("=".repeat(60));

  const app = new VideoWatchingApp();

  // Start the app
  app.main();

  console.log("\nQuick simulation (immediate transitions):");

  // Simulate quick transitions between videos
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const info = app.getCurrentVideoInfo();
      console.log(
        `Video ${i + 1}: ${info.videoId} (Creator ${
          info.creatorId
        }) - Duration: ${info.duration.toFixed(2)}s`
      );

      if (i < 4) {
        app.nextVideo();
      } else {
        // Exit on the last iteration
        setTimeout(() => {
          app.exit();
          console.log("\n=".repeat(60));
          console.log("QUICK TEST COMPLETED");
          console.log("=".repeat(60));
        }, 100);
      }
    }, i * 1000);
  }
}

// Export functions for use
export { runTest, runQuickTest };

// Uncomment below to run the test immediately:
// runQuickTest();
