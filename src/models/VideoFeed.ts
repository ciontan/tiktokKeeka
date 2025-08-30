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
    this.activeVideoIndex = 0;
    this.activeVideo = this.videos[0];
    this.activeCreator =
      this.creators.get(this.activeVideo.getCreatorId()) || null;
    this.startWatching();
  }

  private startWatching(): void {
    this.isWatching = true;
    this.watchStartTime = Date.now();
    this.duration = 0;
  }

  private updateWatchTime(): void {
    if (this.isWatching && this.watchStartTime > 0) {
      const currentTime = Date.now();
      this.duration = (currentTime - this.watchStartTime) / 1000; // Convert to seconds

      if (this.activeVideo) {
        this.activeVideo.setWatchTime(this.duration);
      }
    }
  }

  nextVideo(): void {
    this.updateWatchTime();

    // Update creator stats
    if (this.activeCreator && this.duration > 0) {
      this.activeCreator.updateDurationWatched(this.duration);
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
    this.updateWatchTime();

    // Final update for current video
    if (this.activeCreator && this.duration > 0) {
      this.activeCreator.updateDurationWatched(this.duration);
    }

    this.isWatching = false;
    this.calculatePercentagesAndRewards();
  }

  private calculatePercentagesAndRewards(): void {
    // Calculate total watch time across all creators
    let totalWatchTime = 0;
    this.creators.forEach((creator) => {
      totalWatchTime += creator.getDurationWatched();
    });

    if (totalWatchTime === 0) {
      return; // No watch time recorded
    }

    // Calculate percentages and coin distribution
    this.creators.forEach((creator) => {
      const percentage = (creator.getDurationWatched() / totalWatchTime) * 100;
      creator.setPercentageWatched(percentage);

      const coinAmount = (percentage / 100) * this.coinCounter;
      creator.setAmount(coinAmount);
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
    this.updateWatchTime();
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
    return this.isWatching;
  }

  // Method to get creator stats
  getCreatorStats(): Map<number, CreatorStats> {
    const stats = new Map<number, CreatorStats>();
    this.creators.forEach((creator, id) => {
      stats.set(id, creator.getStats());
    });
    return stats;
  }
}
