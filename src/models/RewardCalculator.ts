import { Creator, type CreatorStats } from "./Creator.js";

export interface RewardDistribution {
  creatorId: number;
  watchTime: number;
  percentage: number;
  coinAmount: number;
}

export class RewardCalculator {
  private totalCoins: number;

  constructor(totalCoins: number = 5) {
    this.totalCoins = totalCoins;
  }

  calculateRewards(creators: Map<number, Creator>): RewardDistribution[] {
    const results: RewardDistribution[] = [];

    // Calculate total watch time across all creators
    let totalWatchTime = 0;
    creators.forEach((creator) => {
      totalWatchTime += creator.getDurationWatched();
    });

    if (totalWatchTime === 0) {
      // If no watch time, return empty results
      creators.forEach((creator, id) => {
        results.push({
          creatorId: id,
          watchTime: 0,
          percentage: 0,
          coinAmount: 0,
        });
      });
      return results;
    }

    // Calculate percentages and coin distribution
    creators.forEach((creator, id) => {
      const watchTime = creator.getDurationWatched();
      const percentage = (watchTime / totalWatchTime) * 100;
      const coinAmount = (percentage / 100) * this.totalCoins;

      // Update creator with calculated values
      creator.setPercentageWatched(percentage);
      creator.setAmount(coinAmount);

      results.push({
        creatorId: id,
        watchTime: watchTime,
        percentage: percentage,
        coinAmount: coinAmount,
      });
    });

    return results.sort((a, b) => b.percentage - a.percentage); // Sort by percentage descending
  }

  getTotalCoins(): number {
    return this.totalCoins;
  }

  setTotalCoins(amount: number): void {
    this.totalCoins = amount;
  }

  // Utility method to format reward summary
  generateRewardSummary(creators: Map<number, Creator>): string {
    const rewards = this.calculateRewards(creators);
    let summary = `Reward Distribution Summary (Total Coins: ${this.totalCoins})\n`;
    summary += "=".repeat(50) + "\n";

    rewards.forEach((reward) => {
      summary += `Creator ${reward.creatorId}: ${reward.watchTime.toFixed(
        2
      )}s (${reward.percentage.toFixed(2)}%) = ${reward.coinAmount.toFixed(
        4
      )} coins\n`;
    });

    return summary;
  }

  // Method to validate reward distribution (should sum to total coins)
  validateRewardDistribution(creators: Map<number, Creator>): boolean {
    const rewards = this.calculateRewards(creators);
    const totalDistributed = rewards.reduce(
      (sum, reward) => sum + reward.coinAmount,
      0
    );
    const tolerance = 0.001; // Allow small floating point errors

    return Math.abs(totalDistributed - this.totalCoins) < tolerance;
  }
}
