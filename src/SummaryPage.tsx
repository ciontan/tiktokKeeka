import { useEffect } from "@lynx-js/react";
import BottomNavBar from "./BottomNavBar.tsx";

interface SummaryPageProps {
  rewardSummary: string;
  onHomeClick: () => void;
  onProfileClick: () => void;
}

export default function SummaryPage({
  rewardSummary,
  onHomeClick,
  onProfileClick,
}: SummaryPageProps) {
  // Debug logging
  useEffect(() => {
    console.log("SummaryPage rendered with summary:", rewardSummary);
    console.log("Summary length:", rewardSummary.length);
  }, [rewardSummary]);

  return (
    <view className="w-full min-h-screen bg-white flex flex-col relative">
      {/* Header */}
      <view className="flex flex-row justify-between items-center w-full px-8 py-6 border-b border-gray-200">
        <text className="text-2xl font-bold text-gray-800">Reward Summary</text>
      </view>
      
      {/* Content */}
      <view className="flex-1 w-full px-8 py-6 overflow-auto">
        {rewardSummary ? (
          <view className="bg-gray-50 p-4 rounded-lg">
            <text className="text-sm font-mono whitespace-pre-wrap leading-relaxed text-gray-700">
              {rewardSummary}
            </text>
          </view>
        ) : (
          <view className="flex items-center justify-center h-40">
            <text className="text-lg text-gray-500">No reward data available</text>
          </view>
        )}
        
        {/* Debug info - remove this in production */}
        <view className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <text className="text-xs text-yellow-800">
            Debug: Summary length: {rewardSummary.length} characters
          </text>
        </view>
      </view>
      
      {/* Action buttons */}
      <view className="px-8 py-4 border-t border-gray-200">
        <view className="flex flex-row gap-4">
          <view
            className="flex-1 bg-blue-500 text-white px-4 py-3 rounded-lg cursor-pointer"
            bindtap={onHomeClick}
          >
            <text className="text-center font-medium text-white">Back to Home</text>
          </view>
          <view
            className="flex-1 bg-green-500 text-white px-4 py-3 rounded-lg cursor-pointer"
            bindtap={onProfileClick}
          >
            <text className="text-center font-medium text-white">View Profile</text>
          </view>
        </view>
      </view>
      
      {/* Bottom Navigation */}
      <BottomNavBar onHomeClick={onHomeClick} onProfileClick={onProfileClick} />
    </view>
  );
}