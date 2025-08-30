import { VideoFeed } from "./models/VideoFeed.js";
import { RewardCalculator } from "./models/RewardCalculator.js";

export class VideoWatchingApp {
  private videoFeed: VideoFeed;
  private rewardCalculator: RewardCalculator;

  constructor() {
    this.videoFeed = new VideoFeed();
    this.rewardCalculator = new RewardCalculator(5); // 5 coins by default
  }

  // Main function that starts the application
  main(): void {
    console.log("Starting Video Watching App...");
    this.startup();
  }

  // Startup function
  private startup(): void {
    console.log("Initializing video feed...");
    this.videoFeed.startup();
    console.log(
      `Started watching: ${this.videoFeed.getActiveVideo()?.getVideoId()}`
    );
    console.log(
      `Creator: ${this.videoFeed.getActiveCreator()?.getCreatorId()}`
    );
  }

  // Simulate watching videos for a period of time
  simulateWatching(durationSeconds: number): void {
    console.log(`Simulating ${durationSeconds} seconds of watching...`);

    // Wait for the specified duration (in a real app, this would be actual time)
    // For simulation, we'll just wait and then call nextVideo
    setTimeout(() => {
      console.log(`Watched for ${durationSeconds} seconds`);
      this.nextVideo();
    }, durationSeconds * 1000);
  }

  // Next video function
  nextVideo(): void {
    const currentVideo = this.videoFeed.getActiveVideo();
    const currentCreator = this.videoFeed.getActiveCreator();
    const watchTime = this.videoFeed.getCurrentDuration();

    console.log(
      `Finished watching ${currentVideo?.getVideoId()} (Creator ${currentCreator?.getCreatorId()}) for ${watchTime.toFixed(
        2
      )} seconds`
    );

    this.videoFeed.nextVideo();

    const newVideo = this.videoFeed.getActiveVideo();
    const newCreator = this.videoFeed.getActiveCreator();
    console.log(
      `Now watching: ${newVideo?.getVideoId()} (Creator ${newCreator?.getCreatorId()})`
    );
  }

  // Exit function
  exit(): void {
    console.log("Exiting application...");
    this.videoFeed.exit();

    // Calculate and display final rewards
    const creators = this.videoFeed.getCreators();
    const rewards = this.rewardCalculator.calculateRewards(creators);

    console.log("\n" + this.rewardCalculator.generateRewardSummary(creators));

    // Validate the distribution
    const isValid = this.rewardCalculator.validateRewardDistribution(creators);
    console.log(`Reward distribution is valid: ${isValid}`);
  }

  // Getter methods for accessing current state
  getCurrentVideoInfo(): {
    videoId: string | undefined;
    creatorId: number | undefined;
    duration: number;
  } {
    return {
      videoId: this.videoFeed.getActiveVideo()?.getVideoId(),
      creatorId: this.videoFeed.getActiveCreator()?.getCreatorId(),
      duration: this.videoFeed.getCurrentDuration(),
    };
  }

  getVideoFeed(): VideoFeed {
    return this.videoFeed;
  }

  getRewardCalculator(): RewardCalculator {
    return this.rewardCalculator;
  }

  // Method to simulate a full session
  simulateSession(): void {
    this.main();

    // Simulate watching 5 different videos for different durations
    const watchTimes = [10, 15, 8, 20, 12]; // seconds for each video

    watchTimes.forEach((time, index) => {
      setTimeout(() => {
        this.simulateWatching(time);

        // If this is the last video, exit after watching
        if (index === watchTimes.length - 1) {
          setTimeout(() => {
            this.exit();
          }, (time + 1) * 1000);
        }
      }, index * 1000);
    });
  }
}

// Example usage:
// const app = new VideoWatchingApp();
// app.simulateSession();
