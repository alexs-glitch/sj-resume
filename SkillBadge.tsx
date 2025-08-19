import React from 'react';

interface SkillBadgeProps {
  skill: string;
  onClick: (skill: string) => void;
  isActive: boolean;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, onClick, isActive }) => {
  const baseClasses = "inline-block text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full border transition-all duration-300 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800";
  const inactiveClasses = "bg-gradient-to-br from-slate-700 to-slate-800 text-cyan-200 border-slate-600 hover:shadow-md hover:shadow-cyan-500/30 hover:scale-110 hover:-translate-y-1";
  const activeClasses = "bg-gradient-to-br from-cyan-400 to-blue-500 text-white border-cyan-300 scale-110 -translate-y-1 shadow-lg shadow-cyan-500/40 ring-cyan-400";

  return (
    <button onClick={() => onClick(skill)} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {skill}
    </button>
  );
};

export default SkillBadge;
