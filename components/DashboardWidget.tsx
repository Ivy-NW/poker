// components/DashboardWidget.tsx
import React from 'react';

interface DashboardWidgetProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode; // Allow passing an SVG icon or similar
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({ title, value, description, icon }) => {
  return (
    <div className="bg-slate-800 shadow-lg rounded-lg p-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-semibold text-primary-gold">{title}</h4>
        {icon && <div className="text-secondary-light-blue">{icon}</div>}
      </div>
      <p className="text-3xl font-bold text-secondary-white mb-1">{value}</p>
      {description && <p className="text-sm text-gray-400">{description}</p>}
    </div>
  );
};

export default DashboardWidget;
