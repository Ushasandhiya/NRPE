import { Bell, Settings, Activity } from "lucide-react";

export default function Navbar() {
  return (
    <div className="w-full bg-purple-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Left Section */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-purple-700 rounded-full flex items-center justify-center text-lg font-bold">
            🎓
          </div>

          <div>
            <h1 className="text-lg font-semibold">
              Jasper Elite School
            </h1>
            <p className="text-sm text-purple-200">
              Student Performance Dashboard
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">

          {/* Icons */}
          <div className="flex items-center gap-5 text-purple-200">
            <Bell className="w-5 h-5 cursor-pointer hover:text-white transition" />
            <Activity className="w-5 h-5 cursor-pointer hover:text-white transition" />
            <Settings className="w-5 h-5 cursor-pointer hover:text-white transition" />
          </div>

          {/* Last Updated */}
          <div className="text-sm text-purple-200">
            Last updated 3 min ago
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3 bg-purple-800 px-4 py-2 rounded-full">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium">
              Principal Carter
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}