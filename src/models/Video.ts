export class Video {
  private videoId: string;
  private watchTime: number;
  private creatorId: number;

  constructor(videoId: string, creatorId: number) {
    this.videoId = videoId;
    this.watchTime = 0;
    this.creatorId = creatorId;
  }

  getVideoId(): string {
    return this.videoId;
  }

  getWatchTime(): number {
    return this.watchTime;
  }

  setWatchTime(time: number): void {
    this.watchTime = time;
  }

  incrementWatchTime(duration: number): void {
    this.watchTime += duration;
  }

  getCreatorId(): number {
    return this.creatorId;
  }

  setCreatorId(creatorId: number): void {
    this.creatorId = creatorId;
  }

  resetWatchTime(): void {
    this.watchTime = 0;
  }
}
