export interface CreatorStats {
  duration_watched: number;
  percentage_watched: number;
  amount: number;
}

export class Creator {
  private creatorId: number;
  private stats: CreatorStats;

  constructor(creatorId: number) {
    this.creatorId = creatorId;
    this.stats = {
      duration_watched: 0,
      percentage_watched: 0.0,
      amount: 0.0,
    };
  }

  getCreatorId(): number {
    return this.creatorId;
  }

  getStats(): CreatorStats {
    return { ...this.stats };
  }

  updateDurationWatched(duration: number): void {
    this.stats.duration_watched += duration;
  }

  setDurationWatched(duration: number): void {
    this.stats.duration_watched = duration;
  }

  setPercentageWatched(percentage: number): void {
    this.stats.percentage_watched = percentage;
  }

  setAmount(amount: number): void {
    this.stats.amount = amount;
  }

  getDurationWatched(): number {
    return this.stats.duration_watched;
  }

  getPercentageWatched(): number {
    return this.stats.percentage_watched;
  }

  getAmount(): number {
    return this.stats.amount;
  }
}
