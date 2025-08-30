import homeLogo from "./assets/home.png";
import friendsLogo from "./assets/friends.png";
import addLogo from "./assets/add.png";
import inboxLogo from "./assets/inbox.png";
import profileLogo from "./assets/profile.png";

interface BottomNavBarProps {
  onHomeClick: () => void;
  onProfileClick: () => void;
}

export default function BottomNavBar({
  onHomeClick,
  onProfileClick,
}: BottomNavBarProps) {
  return (
    <view className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white border-t border-gray-500 pb-5">
      <view className="flex justify-around items-center py-2">
        <view
          className="flex flex-col items-center gap-1 cursor-pointer"
          bindtap={onHomeClick}
        >
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
        <view
          className="flex flex-col items-center gap-1 cursor-pointer"
          bindtap={onProfileClick}
        >
          <image src={profileLogo} className="w-6 h-6" />
          <text className="text-xs text-gray-500">Profile</text>
        </view>
      </view>
    </view>
  );
}
