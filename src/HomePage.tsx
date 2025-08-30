import { useState, useEffect, useRef } from "@lynx-js/react";
import BottomNavBar from "./BottomNavBar.tsx";
import SummaryPage from "./SummaryPage.tsx";
import { Video } from "./models/Video.ts";
import { Creator } from "./models/Creator.ts";
import { VideoFeed } from "./models/VideoFeed.ts";
import { RewardCalculator } from "./models/RewardCalculator.ts";

interface HomePageProps {
  onHomeClick: () => void;
  onProfileClick: () => void;
  onPointsPopupClosed?: () => void;
}

export default function HomePage({
  onHomeClick,
  onProfileClick,
  onPointsPopupClosed,
}: HomePageProps) {
  // Centralized backend simulation state
  const [videoFeed] = useState(() => new VideoFeed());
  const [state, setState] = useState(() => ({
    activeVideo: null as Video | null,
    activeCreator: null as Creator | null,
    activeIndex: 0,
    duration: 0,
    isWatching: false,
    creatorStats: new Map<number, any>(),
    rewardSummary: "",
    showSummary: false,
  }));
  const timerRef = useRef<any>(null);

  // Helper function to clear timer
  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Startup logic
  useEffect(() => {
    videoFeed.startup();
    setState((prev) => ({
      ...prev,
      activeVideo: videoFeed.getActiveVideo(),
      activeCreator: videoFeed.getActiveCreator(),
      activeIndex: 0,
      isWatching: videoFeed.isCurrentlyWatching(),
      duration: 0,
      creatorStats: videoFeed.getCreatorStats(),
      showSummary: false,
      rewardSummary: "",
    }));
  }, [videoFeed]);

  // Simulate watching (increment duration)
  useEffect(() => {
    clearTimer(); // Clear any existing timer first
    if (state.isWatching && !state.showSummary) {
      timerRef.current = setInterval(() => {
        setState((prev) => ({
          ...prev,
          duration: videoFeed.getCurrentDuration(),
        }));
      }, 1000);
    }
    return () => {
      clearTimer();
    };
  }, [state.isWatching, state.showSummary, videoFeed]);

  // Video change handler (simulates swipe)
  const handleSwipe = () => {
    if (state.showSummary) return; // Prevent swipe when showing summary
    videoFeed.nextVideo();
    const currentVideo = videoFeed.getActiveVideo();
    let newIndex = 0;
    if (currentVideo) {
      const videoId = currentVideo.getVideoId();
      const match = videoId.match(/video(\d+)/);
      if (match) {
        newIndex = Number(match[1]) - 1;
      }
    }
    setState((prev) => ({
      ...prev,
      activeVideo: currentVideo,
      activeCreator: videoFeed.getActiveCreator(),
      activeIndex: newIndex,
      isWatching: videoFeed.isCurrentlyWatching(),
      duration: 0,
      creatorStats: videoFeed.getCreatorStats(),
    }));
  };

  // Coin icon click handler: calculate rewards and show summary page
  const handleShowSummary = () => {
    clearTimer();
    videoFeed.exit();
    const rc = new RewardCalculator(videoFeed.getCoinCounter());
    const creators = videoFeed.getCreators();
    const summary = rc.generateRewardSummary(creators);
    setState((prev) => ({
      ...prev,
      isWatching: false,
      creatorStats: videoFeed.getCreatorStats(),
      rewardSummary: summary,
      showSummary: true,
    }));
  };

  // Handle returning from summary page
  const handleReturnFromSummary = () => {
    setState((prev) => ({
      ...prev,
      showSummary: false,
      // Optionally restart watching or stay paused
      // isWatching: true,
    }));
  };

  // Debug: Log when showSummary changes
  useEffect(() => {
    console.log("showSummary state changed:", state.showSummary);
    console.log("rewardSummary content:", state.rewardSummary);
  }, [state.showSummary, state.rewardSummary]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  // Render
  return (
    <view className="w-full min-h-screen bg-white flex flex-col items-center justify-center relative">
      {/* Coin icon at top right */}
      {!state.showSummary && (
        <view
          className="absolute top-4 right-4 z-10 cursor-pointer"
          bindtap={handleShowSummary}
        >
          <image
            src={require("./assets/chart-bar.png")}
            style={{ width: 30, height: 30 }}
          />
        </view>
      )}

      {!state.showSummary ? (
        <view className="mb-8">
          <text className="text-lg text-gray-500">This is your home feed.</text>
          <view className="mt-4">
            <text className="text-base font-bold">
              Current Video: {state.activeVideo?.getVideoId() || ""}
            </text>
            <text className="block">
              Creator ID: {state.activeCreator?.getCreatorId() || ""}
            </text>
            <text className="block">
              Duration Watched: {state.duration.toFixed(2)}s
            </text>
            <text className="block">
              Video Index: {state.activeIndex + 1} / 30
            </text>
            <text className="block">
              Status: {state.isWatching ? "Watching" : "Paused"}
            </text>
            <view className="mt-2 flex items-center justify-center">
              <text className="text-2xl font-bold text-blue-600">
                {`Video Changed! Now: ${state.activeVideo?.getVideoId() || ""}`}
              </text>
            </view>
          </view>
          <view className="flex gap-4 mt-4">
            <view
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer text-center"
              bindtap={handleSwipe}
              style={{ minWidth: "120" }}
            >
              <text>Next Video (Swipe)</text>
            </view>
          </view>
        </view>
      ) : (
        <SummaryPage
          rewardSummary={state.rewardSummary}
          onHomeClick={() => {
            console.log("Home clicked from summary");
            handleReturnFromSummary();
            onHomeClick();
          }}
          onProfileClick={() => {
            console.log("Profile clicked from summary");
            handleReturnFromSummary();
            onProfileClick();
          }}
          onPointsPopupClosed={onPointsPopupClosed}
        />
      )}
      <BottomNavBar onHomeClick={onHomeClick} onProfileClick={onProfileClick} />
    </view>
  );
}
