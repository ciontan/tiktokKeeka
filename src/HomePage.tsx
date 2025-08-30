import BottomNavBar from "./BottomNavBar.tsx";

interface HomePageProps {
  onHomeClick: () => void;
  onProfileClick: () => void;
}

export default function HomePage({
  onHomeClick,
  onProfileClick,
}: HomePageProps) {
  return (
    <view className="w-full min-h-screen bg-white flex flex-col items-center justify-center">
      <text className="text-3xl font-bold mb-4">Welcome to Home Page!</text>
      <view className="mb-8">
        <text className="text-lg text-gray-500">This is your home feed.</text>
      </view>
      <BottomNavBar onHomeClick={onHomeClick} onProfileClick={onProfileClick} />
    </view>
  );
}
