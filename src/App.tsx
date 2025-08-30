import { useState, useEffect } from "@lynx-js/react";
import "./App.css";
import addLogo from "./assets/add.png";
import homeLogo from "./assets/home.png";
import friendsLogo from "./assets/friends.png";
import inboxLogo from "./assets/inbox.png";
import profileLogo from "./assets/profile.png";
import sellerLogo from "./assets/seller.png";
import platinumBg from "./assets/platinum.png";
import bronzeBg from "./assets/bronze.png";
import silverBg from "./assets/silver.png";
import goldBg from "./assets/gold.png";
import Popup from "./Popup.js";

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
    color: "bg-white",
    benefits: ["Basic profile"],
  },
  {
    name: "Bronze",
    minFollowers: 100,
    minLikes: 1000,
    color: "bronze-bg",
    benefits: ["Bronze badge", "Access to analytics"],
  },
  {
    name: "Silver",
    minFollowers: 1000,
    minLikes: 10000,
    color: "silver-bg",
    benefits: ["Silver badge", "Priority support"],
  },
  {
    name: "Gold",
    minFollowers: 10000,
    minLikes: 100000,
    color: "gold-bg",
    benefits: ["Gold badge", "Monetization tools"],
  },
  {
    name: "Platinum",
    minFollowers: 100000,
    minLikes: 1000000,
    color: `platinum-bg`,
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

  const [showPopup, setShowPopup] = useState(true);

  if (currentPage === "verification") {
    return (
      <view className="w-full min-h-screen bg-white">
        <view className="flex items-center justify-start gap-x-[50px] p-4 border-b">
          <view
            className="flex items-center cursor-pointer"
            bindtap={() => setCurrentPage("profile")}
          >
            <text className="text-lg mr-2 text-black">←</text>
            <text className="text-black">Back</text>
          </view>
          <text className="text-lg font-bold text-black ">
            Request Verification
          </text>
          <view></view>
        </view>
        <view className="px-4 py-6">
          <view className="mb-6 text-center">
            <text className="text-lg font-bold mb-2 text-black">
              Get Verified
            </text>
            <text className="text-gray-600 text-sm">
              Verification helps build trust with your audience and unlocks
              additional features.
            </text>
          </view>

          <view className="space-y-4">
            <view>
              <text className="text-black block text-sm font-medium mt-2">
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
              <text className="text-black block text-sm font-medium mt-2">
                Email *
              </text>
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
              <text className="text-black block text-sm font-medium mt-2">
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
              <text className="block text-black text-sm font-medium mt-2">
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
                <scroll-view
                  scroll-y
                  className="mt-2 border border-gray-300 rounded bg-white"
                  style={{ maxHeight: "12rem" }}
                >
                  {categories.map((category, index) => (
                    <view
                      key={index}
                      className="px-3 py-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
                      bindtap={() => selectCategory(category)}
                    >
                      <text className="text-black">{category}</text>
                    </view>
                  ))}
                </scroll-view>
              )}
            </view>

            <view>
              <text className="block text-black text-sm font-medium mt-2">
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

            <view className="bg-blue-50 p-4 mt-2 rounded">
              <text className="text-sm text-blue-800">
                We'll review your application within 24-48 hours. Make sure all
                information is accurate.
              </text>
            </view>
          </view>

          <view className="mt-8">
            <view
              className={`flex w-full rounded py-3 justify-center ${
                isFormValid
                  ? "bg-[#fa2d6c] text-white"
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
            <text className="text-xl font-bold text-black">creator1</text>
            {verificationStatus === "verified" && (
              <view className="flex items-center gap-1 px-2">
                <image
                  src={require("./assets/verified.png")}
                  className="w-6 h-6"
                />
              </view>
            )}
          </view>
          <text className="text-gray-400 mb-4">@contentcreator</text>
        </view>
        <view className="flex justify-center gap-x-[50px] mb-6">
          <view className="flex flex-col items-center">
            <text className="text-2xl font-bold text-black">99</text>
            <text className="text-gray-400 text-sm">Following</text>
          </view>
          <view className="flex flex-col items-center">
            <text
              className="text-2xl font-bold flex items-center gap-1 cursor-pointer text-black"
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
              className="text-2xl text-black font-bold flex items-center gap-1 cursor-pointer"
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
        <view className="p-4 mb-4 border rounded-lg bg-black">
          <view className="flex items-center justify-between mb-2">
            {currentTier.name === "Platinum" ? (
              <view
                className="font-bold px-2 py-1 rounded flex items-center justify-center w-full"
                style={{
                  backgroundImage: `url(${platinumBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "white",
                  minWidth: "120px",
                  minHeight: "40px",
                }}
              >
                <text className="text-black font-bold">
                  {currentTier.name} Creator
                </text>
              </view>
            ) : currentTier.name === "Gold" ? (
              <view
                className="font-bold px-2 py-1 rounded flex items-center justify-center w-full"
                style={{
                  backgroundImage: `url(${goldBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "black",
                  minWidth: "120px",
                  minHeight: "40px",
                }}
              >
                <text className="text-black font-bold">
                  {currentTier.name} Creator
                </text>
              </view>
            ) : currentTier.name === "Bronze" ? (
              <view
                className="font-bold px-2 py-1 rounded flex items-center justify-center w-full"
                style={{
                  backgroundImage: `url(${bronzeBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "white",
                  minWidth: "120px",
                  minHeight: "40px",
                }}
              >
                <text className="text-black font-bold">
                  {currentTier.name} Creator
                </text>
              </view>
            ) : currentTier.name === "Silver" ? (
              <view
                className="font-bold px-2 py-1 rounded flex items-center justify-center w-full"
                style={{
                  backgroundImage: `url(${silverBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "black",
                  minWidth: "120px",
                  minHeight: "40px",
                }}
              >
                <text className="text-black font-bold">
                  {currentTier.name} Creator
                </text>
              </view>
            ) : currentTier.name === "Unverified" ? (
              <view
                className={`${currentTier.color} font-bold px-2 py-1 rounded flex items-center justify-center w-full`}
              >
                <text className="text-black font-bold">
                  {currentTier.name} Creator
                </text>
              </view>
            ) : (
              <view
                className={`${currentTier.color} text-black font-bold px-2 py-1 rounded`}
              >
                <text className="text-black font-bold">
                  {currentTier.name} Creator
                </text>
              </view>
            )}
            {verificationStatus === "pending" && (
              <view className="px-2 py-1 rounded border text-white">
                <text>Verification Pending</text>
              </view>
            )}
          </view>

          {nextTier && (
            <view className="space-y-2">
              <view className="flex justify-between text-sm pb-1 text-white">
                <text className="text-white">Progress to {nextTier.name}</text>
                <text className="text-white">
                  {Math.round(calculateProgress())}%
                </text>
              </view>
              <view className="h-2 w-full bg-gray-200 rounded">
                <view
                  className="h-2 rounded bg-blue-400"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </view>
              <text className="text-xs text-gray-400 pt-1">
                Need {nextTier.minFollowers.toLocaleString()} followers &{" "}
                {nextTier.minLikes.toLocaleString()} likes
              </text>
            </view>
          )}
        </view>

        <view className="space-y-3">
          {currentTier.name === "Unverified" && (
            <view
              className="w-full bg-[#fa2d6c] text-white rounded-md py-4 px-4 items-center"
              bindtap={handleVerificationRequest}
            >
              <text className="font-bold text-white">Request Verification</text>
            </view>
          )}
        </view>
      </view>

      <view className="relative h-48 bg-gradient-to-b from-amber-100 to-amber-200">
        <view className="absolute inset-0 flex items-center justify-center"></view>
        <view className="absolute bottom-4 left-4 text-white font-medium">
          Tuzi
        </view>
      </view>

      <view className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white border-t border-gray-500 pb-5">
        <view className="flex justify-around items-center py-2">
          <view className="flex flex-col items-center gap-1">
            <image src={homeLogo} className="w-6 h-6" />
            <text className="text-xs text-gray-500">Home</text>
          </view>
          <view className="flex flex-col items-center gap-1 relative">
            <image src={friendsLogo} className="w-6 h-6" />
            <text className="text-xs text-gray-500">Friends</text>
            <view className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></view>
          </view>
          <view className="flex items-center">
            <image src={addLogo} className="w-11 h-8" />
          </view>
          <view className="flex flex-col items-center gap-1 relative">
            <image src={inboxLogo} className="w-6 h-6" />
            <text className="text-xs text-gray-500">Inbox</text>
            <view className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <text className="text-xs text-white">34</text>
            </view>
          </view>
          <view className="flex flex-col items-center gap-1">
            <image src={profileLogo} className="w-6 h-6" />
            <text className="text-xs text-gray-500">Profile</text>
          </view>
        </view>
      </view>

      {showPopup && (
        <Popup
          title="Introducing Karma Points"
          onClose={() => setShowPopup(false)}
        >
          <view style={{ marginBottom: 32 }}>
            <text className="block text-white text-base mb-4">
              Turn your watch time into real support for creators.
            </text>
            <view className="space-y-4 text-left">
              <view>
                <text className="text-white font-bold">
                  1. Your Daily Micro-Tipping Power:
                </text>
                <text className="pl-4 block text-white pb-4">
                  You receive a small, daily allowance of Karma Points (e.g.,
                  worth 1¢) that is automatically dedicated to supporting
                  creators.
                </text>
              </view>
              <view>
                <text className="text-white font-bold">
                  2. You Support Just By Watching:
                </text>
                <text className="pl-4 block text-white pb-4">
                  We track your watch time. The longer you genuinely engage with
                  a creator’s content, the more of your daily Karma Points they
                  earn.
                </text>
              </view>
              <view>
                <text className="text-white font-bold">
                  3. It’s Automatic and Free for You:
                </text>
                <text className="pl-4 block text-white pb-4">
                  There’s no button to click. When a creator hits engagement
                  goals through audience watch time, your allocated points are
                  released to them as real money—you never spend your own cash.
                </text>
              </view>
              <view>
                <text className="text-white font-bold">
                  4. Your Attention Has Value:
                </text>
                <text className="pl-4 block text-white">
                  Karma Points directly reward the creators you love most—simply
                  by giving them your attention.
                </text>
              </view>
            </view>
          </view>
        </Popup>
      )}
    </view>
  );
}
