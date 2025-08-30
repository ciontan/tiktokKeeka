import { useState, useEffect } from "@lynx-js/react";
import "./App.css";
import addLogo from "./assets/add.png";
import homeLogo from "./assets/home.png";
import friendsLogo from "./assets/friends.png";
import inboxLogo from "./assets/inbox.png";
import profileLogo from "./assets/profile.png";
import sellerLogo from "./assets/seller.png";

interface TikTokStats {
  followers: number;
  likes: number;
  verified: boolean;
}

interface CreatorTier {
  name: string;
  minFollowers: number;
  minLikes: number;
  color: string;
  benefits: string[];
}

const CREATOR_TIERS: CreatorTier[] = [
  {
    name: "Starter",
    minFollowers: 0,
    minLikes: 0,
    color: "bg-gray-500",
    benefits: ["Basic profile", "Standard support"],
  },
  {
    name: "Rising",
    minFollowers: 1000,
    minLikes: 10000,
    color: "bg-blue-500",
    benefits: [
      "Verification eligible",
      "Priority support",
      "Analytics dashboard",
    ],
  },
  {
    name: "Established",
    minFollowers: 10000,
    minLikes: 100000,
    color: "bg-purple-500",
    benefits: ["Auto verification", "Monetization tools", "Brand partnerships"],
  },
  {
    name: "Elite",
    minFollowers: 100000,
    minLikes: 1000000,
    color: "bg-gold-500",
    benefits: ["Premium features", "Dedicated manager", "Exclusive events"],
  },
];

export function App() {
  const [tiktokStats, setTiktokStats] = useState<TikTokStats>({
    followers: 19,
    likes: 0,
    verified: false,
  });

  const [currentTier, setCurrentTier] = useState<CreatorTier>(CREATOR_TIERS[0]);
  const [nextTier, setNextTier] = useState<CreatorTier | null>(
    CREATOR_TIERS[1]
  );
  const [verificationStatus, setVerificationStatus] = useState<
    "none" | "pending" | "verified"
  >("none");

  useEffect(() => {
    const tier =
      CREATOR_TIERS.slice()
        .reverse()
        .find(
          (tier) =>
            tiktokStats.followers >= tier.minFollowers &&
            tiktokStats.likes >= tier.minLikes
        ) || CREATOR_TIERS[0];
    setCurrentTier(tier);
    const currentIndex = CREATOR_TIERS.indexOf(tier);
    setNextTier(
      currentIndex < CREATOR_TIERS.length - 1
        ? CREATOR_TIERS[currentIndex + 1]
        : null
    );
  }, [tiktokStats]);

  useEffect(() => {
    if (currentTier.name === "Rising" && verificationStatus === "none") {
      setVerificationStatus("verified");
    }
  }, [currentTier, verificationStatus]);

  const calculateProgress = () => {
    if (!nextTier) return 100;
    const followerProgress =
      (tiktokStats.followers / nextTier.minFollowers) * 100;
    const likeProgress = (tiktokStats.likes / nextTier.minLikes) * 100;
    return Math.min(Math.min(followerProgress, likeProgress), 100);
  };

  const handleVerificationRequest = () => {
    if (verificationStatus === "none") {
      setVerificationStatus("pending");
      setTimeout(() => {
        setVerificationStatus("verified");
      }, 3000);
    }
  };

  return (
    <view className="w-full min-h-screen bg-white">
      <view className="flex justify-between items-center p-4 text-sm font-medium"></view>
      <view className="px-4 py-6 text-center">
        <view className="relative inline-block mb-4">
          <image
            src={sellerLogo}
            className="w-24 h-24 mx-auto rounded-full border"
          />
        </view>

        <view className="flex flex-col items-center justify-center gap-2 mb-2">
          <view className="flex flex-row">
            <text className="text-xl font-bold">creator1</text>
            {verificationStatus === "verified" && (
              <view className="flex items-center gap-1 px-2 py-1 rounded bg-gray-200">
                <text>✔️</text>
                <text>Verified</text>
              </view>
            )}
          </view>
          <text className="text-gray-400 mb-4">@contentcreator</text>
        </view>
        <view className="p-4 mb-4 border rounded-lg bg-white">
          <view className="flex items-center justify-between mb-2">
            <view
              className={`${currentTier.color} text-white px-2 py-1 rounded`}
            >
              <text>{currentTier.name} Creator</text>
            </view>
            {verificationStatus === "pending" && (
              <view className="px-2 py-1 rounded border text-yellow-600">
                <text>Verification Pending</text>
              </view>
            )}
          </view>

          {nextTier && (
            <view className="space-y-2">
              <view className="flex justify-between text-sm">
                <text>Progress to {nextTier.name}</text>
                <text>{Math.round(calculateProgress())}%</text>
              </view>
              <view className="h-2 w-full bg-gray-200 rounded">
                <view
                  className="h-2 rounded bg-blue-400"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </view>
              <text className="text-xs text-gray-400">
                Need {nextTier.minFollowers.toLocaleString()} followers &{" "}
                {nextTier.minLikes.toLocaleString()} likes
              </text>
            </view>
          )}
        </view>

        <view className="flex justify-center gap-8 mb-6">
          <view className="flex flex-col items-center">
            <text className="text-2xl font-bold">99</text>
            <text className="text-gray-400 text-sm">Following</text>
          </view>
          <view className="flex flex-col items-center">
            <text className="text-2xl font-bold flex items-center gap-1">
              {tiktokStats.followers}
            </text>
            <text className="text-gray-400 text-sm">Followers</text>
          </view>
          <view className="flex flex-col items-center">
            <text className="text-2xl font-bold flex items-center gap-1">
              {tiktokStats.likes}
            </text>
            <text className="text-gray-400 text-sm">Likes</text>
          </view>
        </view>

        <view className="space-y-3">

          {verificationStatus === "none" && currentTier.name !== "Starter" && (
            <view
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground border rounded py-2 text-center"
              bindtap={handleVerificationRequest}
            >
              <text className="mr-2">🛡️</text>
              <text>Request Verification</text>
            </view>
          )}

        </view>
      </view>

      <view className="flex justify-center gap-8 px-4 py-2 border-b">
        <text>🔎</text>
        <text>🔒</text>
        <text>🔗</text>
        <text>💬</text>
        <text>⋯</text>
      </view>

      <view className="relative h-48 bg-gradient-to-b from-amber-100 to-amber-200">
        <view className="absolute inset-0 flex items-center justify-center">
        </view>
        <view className="absolute bottom-4 left-4 text-white font-medium">
          Tuzi
        </view>
      </view>

      <view className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white border-t border-gray-500">
        <view className="flex justify-around items-center py-2">
          <view className="flex flex-col items-center gap-1">
            <image src={homeLogo} className="w-6 h-6" />
            <text className="text-xs">Home</text>
          </view>
          <view className="flex flex-col items-center gap-1 relative">
            <image src={friendsLogo} className="w-6 h-6" />
            <text className="text-xs">Friends</text>
            <view className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></view>
          </view>
          <view className="flex items-center">
            <image src={addLogo} className="w-11 h-8" />
          </view>
          <view className="flex flex-col items-center gap-1 relative">
            <image src={inboxLogo} className="w-6 h-6" />
            <text className="text-xs">Inbox</text>
            <view className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <text className="text-xs text-white">34</text>
            </view>
          </view>
          <view className="flex flex-col items-center gap-1">
            <image src={profileLogo} className="w-6 h-6" />
            <text className="text-xs font-medium">Profile</text>
          </view>
        </view>
      </view>
    </view>
  );
}
