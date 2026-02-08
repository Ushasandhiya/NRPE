import React from 'react';

interface SidebarProps {
  selectedGrade: string;
  selectedYear: string;
  onGradeChange: (grade: string) => void;
  onYearChange: (year: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedGrade,
  selectedYear,
  onGradeChange,
  onYearChange,
}) => {
  const menuItems = [
    { icon: '📊', label: 'Dashboard', active: true },
    { icon: '👨‍🎓', label: 'Students' },
    { icon: '📈', label: 'Analytics' },
    { icon: '⚠️', label: 'Risk Analysis' },
    { icon: '🏫', label: 'Classes' },
    { icon: '📋', label: 'Reports' },
    { icon: '⚙️', label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Filters
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => onYearChange(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Grade
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => onGradeChange(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Grades</option>
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Navigation
          </h3>
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Last Updated</span>
            <span className="text-sm font-medium text-green-400">3min ago</span>
          </div>
          <div className="text-xs text-gray-500">
            Real-time data monitoring active
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;