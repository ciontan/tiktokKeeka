import { Video } from "./Video.js";
import { Creator, type CreatorStats } from "./Creator.js";

export class VideoFeed {
  private videos: Video[] = [];
  private creators: Map<number, Creator> = new Map();
  private activeVideoIndex: number = 0;
  private activeVideo: Video | null = null;
  private activeCreator: Creator | null = null;
  private duration: number = 0;
  private coinCounter: number = 5;
  private randomiser: () => number;
  private watchStartTime: number = 0;
  private isWatching: boolean = false;
  private hasExited: boolean = false; // Add flag to prevent further updates

  constructor() {
    this.randomiser = () => Math.floor(Math.random() * 5) + 1; // Random number between 1-5
    this.initializeVideos();
    this.initializeCreators();
  }

  private initializeVideos(): void {
    for (let i = 0; i < 30; i++) {
      const videoId = `video${i + 1}`;
      const creatorId = this.randomiser();
      const video = new Video(videoId, creatorId);
      this.videos.push(video);
    }
  }

  private initializeCreators(): void {
    for (let i = 1; i <= 5; i++) {
      this.creators.set(i, new Creator(i));
    }
  }

  startup(): void {
    this.hasExited = false; // Reset exit flag
    this.activeVideoIndex = 0;
    this.activeVideo = this.videos[0];
    this.activeCreator =
      this.creators.get(this.activeVideo.getCreatorId()) || null;
    this.startWatching();
  }

  private startWatching(): void {
    if (this.hasExited) return; // Don't start watching if already exited
    
    this.isWatching = true;
    this.watchStartTime = Date.now();
    this.duration = 0;
  }

  private updateWatchTime(): void {
    // Don't update if we've exited or not watching
    if (this.hasExited || !this.isWatching || this.watchStartTime <= 0) {
      return;
    }

    const currentTime = Date.now();
    this.duration = (currentTime - this.watchStartTime) / 1000; // Convert to seconds

    if (this.activeVideo) {
      this.activeVideo.setWatchTime(this.duration);
    }
  }

  nextVideo(): void {
    if (this.hasExited) return; // Don't allow video changes after exit
    
    this.updateWatchTime();

    // Update creator stats
    if (this.activeCreator && this.duration > 0) {
      this.activeCreator.updateDurationWatched(this.duration);
      console.log(`Updated Creator ${this.activeCreator.getCreatorId()} with ${this.duration.toFixed(2)}s (Total: ${this.activeCreator.getDurationWatched().toFixed(2)}s)`);
    }

    // Move to next video
    this.activeVideoIndex = (this.activeVideoIndex + 1) % this.videos.length;
    this.activeVideo = this.videos[this.activeVideoIndex];
    this.activeCreator =
      this.creators.get(this.activeVideo.getCreatorId()) || null;

    // Reset duration and start watching new video
    this.duration = 0;
    this.startWatching();
  }

  exit(): void {
    console.log("VideoFeed.exit() called");
    
    // Set exit flag immediately to prevent further updates
    this.hasExited = true;
    this.isWatching = false;
    
    // Final update for current video
    this.updateWatchTime();
    if (this.activeCreator && this.duration > 0) {
      this.activeCreator.updateDurationWatched(this.duration);
      console.log(`Final update for Creator ${this.activeCreator.getCreatorId()} with ${this.duration.toFixed(2)}s (Total: ${this.activeCreator.getDurationWatched().toFixed(2)}s)`);
    }

    this.calculatePercentagesAndRewards();
    
    // Log final creator stats
    console.log("Final creator stats:");
    this.creators.forEach((creator, id) => {
      console.log(`Creator ${id}: ${creator.getDurationWatched().toFixed(2)}s`);
    });
  }

  private calculatePercentagesAndRewards(): void {
    // Calculate total watch time across all creators
    let totalWatchTime = 0;
    this.creators.forEach((creator) => {
      totalWatchTime += creator.getDurationWatched();
    });

    console.log(`Total watch time: ${totalWatchTime.toFixed(2)}s`);

    if (totalWatchTime === 0) {
      return; // No watch time recorded
    }

    // Calculate percentages and coin distribution
    this.creators.forEach((creator) => {
      const percentage = (creator.getDurationWatched() / totalWatchTime) * 100;
      creator.setPercentageWatched(percentage);

      const coinAmount = (percentage / 100) * this.coinCounter;
      creator.setAmount(coinAmount);
      
      console.log(`Creator ${creator.getCreatorId()}: ${percentage.toFixed(2)}% = ${coinAmount.toFixed(4)} coins`);
    });
  }

  // Getter methods for accessing current state
  getActiveVideo(): Video | null {
    return this.activeVideo;
  }

  getActiveCreator(): Creator | null {
    return this.activeCreator;
  }

  getCurrentDuration(): number {
    // Don't update watch time if we've exited
    if (!this.hasExited) {
      this.updateWatchTime();
    }
    return this.duration;
  }

  getVideos(): Video[] {
    return [...this.videos];
  }

  getCreators(): Map<number, Creator> {
    return new Map(this.creators);
  }

  getCoinCounter(): number {
    return this.coinCounter;
  }

  isCurrentlyWatching(): boolean {
    return this.isWatching && !this.hasExited;
  }

  // Method to get creator stats
  getCreatorStats(): Map<number, CreatorStats> {
    const stats = new Map<number, CreatorStats>();
    this.creators.forEach((creator, id) => {
      stats.set(id, creator.getStats());
    });
    return stats;
  }

  // Method to check if the feed has exited (useful for debugging)
  hasExitedSession(): boolean {
    return this.hasExited;
  }

  // Method to reset the session (if you want to start over)
  reset(): void {
    this.hasExited = false;
    this.isWatching = false;
    this.duration = 0;
    this.watchStartTime = 0;
    this.activeVideoIndex = 0;
    
    // Reset all creator stats
    this.creators.forEach((creator) => {
      creator.setDurationWatched(0);
      creator.setPercentageWatched(0);
      creator.setAmount(0);
    });
    
    this.startup();
  }
}