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
    name: "Unverified",
    minFollowers: 0,
    minLikes: 0,
    color: "bg-gray-400",
    benefits: ["Basic profile"],
  },
  {
    name: "Bronze",
    minFollowers: 100,
    minLikes: 1000,
    color: "bg-yellow-700",
    benefits: ["Bronze badge", "Access to analytics"],
  },
  {
    name: "Silver",
    minFollowers: 1000,
    minLikes: 10000,
    color: "bg-gray-300",
    benefits: ["Silver badge", "Priority support"],
  },
  {
    name: "Gold",
    minFollowers: 10000,
    minLikes: 100000,
    color: "bg-yellow-400",
    benefits: ["Gold badge", "Monetization tools"],
  },
  {
    name: "Platinum",
    minFollowers: 100000,
    minLikes: 1000000,
    color: "bg-blue-400",
    benefits: ["Platinum badge", "Exclusive events"],
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

  // Page navigation state
  const [currentPage, setCurrentPage] = useState<"profile" | "verification">(
    "profile"
  );
  const [verificationForm, setVerificationForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    category: "",
    description: "",
  });
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);

  const categories = [
    "Entertainment",
    "Education",
    "Music",
    "Comedy",
    "Sports",
    "Fashion",
    "Food",
    "Travel",
    "Tech",
    "Gaming",
    "Art",
    "Business",
    "Other",
  ];

  useEffect(() => {
    let tier =
      CREATOR_TIERS.slice()
        .reverse()
        .find(
          (tier) =>
            tiktokStats.followers >= tier.minFollowers &&
            tiktokStats.likes >= tier.minLikes
        ) || CREATOR_TIERS[0];
    if (verificationStatus === "verified" && tier.name === "Unverified") {
      tier = CREATOR_TIERS[1];
    }
    setCurrentTier(tier);
    let currentIndex = CREATOR_TIERS.indexOf(tier);

    if (verificationStatus === "verified" && tier.name === "Bronze") {
      setNextTier(CREATOR_TIERS[2]);
    } else {
      setNextTier(
        currentIndex < CREATOR_TIERS.length - 1
          ? CREATOR_TIERS[currentIndex + 1]
          : null
      );
    }
  }, [tiktokStats, verificationStatus]);

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
    setCurrentPage("verification");
  };

  const handleFormSubmit = () => {
    if (
      !verificationForm.fullName ||
      !verificationForm.email ||
      !verificationForm.category
    ) {
      return;
    }

    setVerificationStatus("pending");
    setCurrentPage("profile");
    setTimeout(() => {
      setVerificationStatus("verified");
      setTiktokStats((prev) => ({ ...prev, verified: true }));
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setVerificationForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const selectCategory = (category: string) => {
    handleInputChange("category", category);
    setShowCategoryOptions(false);
  };

  const isFormValid =
    verificationForm.fullName &&
    verificationForm.email &&
    verificationForm.category;

  // Verification Page
  if (currentPage === "verification") {
    return (
      <view className="w-full min-h-screen bg-white">
        <view className="flex items-center justify-between p-4 border-b">
          <view
            className="flex items-center cursor-pointer"
            bindtap={() => setCurrentPage("profile")}
          >
            <text className="text-lg mr-2">←</text>
            <text>Back</text>
          </view>
          <text className="text-lg font-bold">Request Verification</text>
          <view></view>
        </view>
        <view className="px-4 py-6">
          <view className="mb-6 text-center">
            <text className="text-2xl mb-2">🛡️</text>
            <text className="text-lg font-bold mb-2">Get Verified</text>
            <text className="text-gray-600 text-sm">
              Verification helps build trust with your audience and unlocks
              additional features.
            </text>
          </view>

          <view className="space-y-4">
            <view>
              <text className="block text-sm font-medium mb-2">
                Full Name *
              </text>
              <view
                className="w-full border border-gray-300 rounded px-3 py-3 bg-white cursor-pointer"
                bindtap={() => handleInputChange("fullName", "Mary Creator")}
              >
                <text
                  className={
                    verificationForm.fullName ? "text-black" : "text-gray-500"
                  }
                >
                  {verificationForm.fullName || "Tap to enter your full name"}
                </text>
              </view>
            </view>

            <view>
              <text className="block text-sm font-medium mb-2">Email *</text>
              <view
                className="w-full border border-gray-300 rounded px-3 py-3 bg-white cursor-pointer"
                bindtap={() =>
                  handleInputChange("email", "creator1@example.com")
                }
              >
                <text
                  className={
                    verificationForm.email ? "text-black" : "text-gray-500"
                  }
                >
                  {verificationForm.email || "Tap to enter your email"}
                </text>
              </view>
            </view>

            <view>
              <text className="block text-sm font-medium mb-2">
                Phone Number
              </text>
              <view
                className="w-full border border-gray-300 rounded px-3 py-3 bg-white cursor-pointer"
                bindtap={() => handleInputChange("phoneNumber", "+1234567890")}
              >
                <text
                  className={
                    verificationForm.phoneNumber
                      ? "text-black"
                      : "text-gray-500"
                  }
                >
                  {verificationForm.phoneNumber ||
                    "Tap to enter your phone number"}
                </text>
              </view>
            </view>

            <view>
              <text className="block text-sm font-medium mb-2">
                Content Category *
              </text>
              <view
                className="w-full border border-gray-300 rounded px-3 py-3 bg-white cursor-pointer"
                bindtap={() => setShowCategoryOptions(!showCategoryOptions)}
              >
                <view className="flex justify-between items-center">
                  <text
                    className={
                      verificationForm.category ? "text-black" : "text-gray-500"
                    }
                  >
                    {verificationForm.category ||
                      "Select your content category"}
                  </text>
                  <text className="text-gray-400">
                    {showCategoryOptions ? "▲" : "▼"}
                  </text>
                </view>
              </view>

              {showCategoryOptions && (
                <view className="mt-2 border border-gray-300 rounded bg-white max-h-48 overflow-y-auto">
                  {categories.map((category, index) => (
                    <view
                      key={index}
                      className="px-3 py-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
                      bindtap={() => selectCategory(category)}
                    >
                      <text>{category}</text>
                    </view>
                  ))}
                </view>
              )}
            </view>

            <view>
              <text className="block text-sm font-medium mb-2">
                Description
              </text>
              <view
                className="w-full border border-gray-300 rounded px-3 py-3 bg-white min-h-20 cursor-pointer"
                bindtap={() =>
                  handleInputChange(
                    "description",
                    "I create engaging content about technology and lifestyle."
                  )
                }
              >
                <text
                  className={
                    verificationForm.description
                      ? "text-black"
                      : "text-gray-500"
                  }
                >
                  {verificationForm.description ||
                    "Tap to add description about your content"}
                </text>
              </view>
            </view>

            <view className="bg-blue-50 p-4 rounded">
              <text className="text-sm text-blue-800">
                💡 We'll review your application within 24-48 hours. Make sure
                all information is accurate.
              </text>
            </view>
          </view>

          <view className="mt-8">
            <view
              className={`w-full rounded py-3 text-center ${
                isFormValid
                  ? "bg-blue-500 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500"
              }`}
              bindtap={isFormValid ? handleFormSubmit : undefined}
            >
              <text className="font-medium">Submit Verification Request</text>
            </view>
          </view>
        </view>
      </view>
    );
  }

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
            <text
              className="text-2xl font-bold flex items-center gap-1 cursor-pointer"
              bindtap={() => {
                if (currentTier.name !== "Unverified" && nextTier) {
                  setTiktokStats((prev) => ({
                    ...prev,
                    followers: nextTier.minFollowers,
                  }));
                }
              }}
            >
              {tiktokStats.followers}
            </text>
            <text className="text-gray-400 text-sm">Followers</text>
          </view>
          <view className="flex flex-col items-center">
            <text
              className="text-2xl font-bold flex items-center gap-1 cursor-pointer"
              bindtap={() => {
                if (currentTier.name !== "Unverified" && nextTier) {
                  setTiktokStats((prev) => ({
                    ...prev,
                    likes: nextTier.minLikes,
                  }));
                }
              }}
            >
              {tiktokStats.likes}
            </text>
            <text className="text-gray-400 text-sm">Likes</text>
          </view>
        </view>

        <view className="space-y-3">
          {currentTier.name === "Unverified" && (
            <view
              className="w-full bg-blue-300 text-white rounded py-2 px-2 items-center"
              bindtap={handleVerificationRequest}
            >
              <text className="text-bold text-base">Request Verification</text>
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
        <view className="absolute inset-0 flex items-center justify-center"></view>
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
