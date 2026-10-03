import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldAlert, Award, Briefcase, Trash2 } from 'lucide-react';
import { resolveMediaUrl } from '../api/client.js';

export function TeacherCard({
  teacher,
  isAdmin = false,
  onSelect,
  onDelete,
  isSelected = false,
  onToggleSelect,
}) {
  const isAdminRole = teacher.role === 'admin';

  // Generate initials for avatar fallback
  const getInitials = (name = '') => {
    return name
      .replace(/(Dr\.|Prof\.|Engr\.|Atty\.|Ms\.|Mr\.|Mrs\.)/gi, '')
      .trim()
      .split(/\s+/)
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const cardContent = (
    <div
      className={`relative glass-card glass-card-hover rounded-2xl p-5 flex flex-col items-center text-center h-full group transition-all duration-300 border border-slate-300/60 dark:border-slate-700/60 hover:border-celebrate-gold dark:hover:border-celebrate-gold ${
        isSelected ? 'ring-2 ring-celebrate-gold shadow-lg shadow-celebrate-gold/15 bg-celebrate-gold/5 dark:bg-celebrate-gold/10' : ''
      }`}
    >
      {/* Top-Left Selection Checkbox for Bulk Deletion (Admin mode only) */}
      {isAdmin && onToggleSelect && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect(teacher.id);
          }}
          className="absolute top-3 left-3 z-10 cursor-pointer p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={isSelected ? `Deselect ${teacher.name}` : `Select ${teacher.name}`}
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => {}} // State handled by onToggleSelect parent
            className="w-4 h-4 rounded text-imstd-blue-600 focus:ring-celebrate-gold cursor-pointer accent-imstd-blue-600 dark:accent-celebrate-gold"
          />
        </div>
      )}

      {/* Top-Right Delete Action Button (Admin mode only) */}
      {isAdmin && onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(teacher);
          }}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
          title={`Delete ${teacher.name}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      {/* Teacher / Staff Avatar / Photo */}
      <div className="relative mb-3 mt-1">
        {teacher.photo_url ? (
          <img
            src={resolveMediaUrl(teacher.photo_url)}
            alt={teacher.name}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 shadow-md ${
              isAdminRole ? 'border-teal-500' : 'border-celebrate-gold'
            }`}
          />
        ) : (
          <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-xl sm:text-2xl font-black border-2 shadow-md ${
            isAdminRole
              ? 'bg-gradient-to-br from-teal-800 to-teal-600 text-teal-100 border-teal-400/60'
              : 'bg-gradient-to-br from-imstd-blue-800 to-imstd-blue-600 text-celebrate-gold border-celebrate-gold/50'
          }`}>
            {getInitials(teacher.name)}
          </div>
        )}

        {/* Avatar Mini Role Badge */}
        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center shadow ${
          isAdminRole ? 'bg-teal-600 text-white' : 'bg-celebrate-gold text-slate-950'
        }`}>
          {isAdminRole ? (
            <Briefcase className="w-3.5 h-3.5" />
          ) : (
            <Award className="w-3.5 h-3.5" />
          )}
        </div>
      </div>

      {/* Name */}
      <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-imstd-blue-600 dark:group-hover:text-celebrate-gold transition-colors line-clamp-2 mb-1.5">
        {teacher.name}
      </h3>

      {/* Role & College Badges */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-2">
        {isAdminRole ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black tracking-wide uppercase bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
            <Briefcase className="w-2.5 h-2.5 shrink-0" />
            <span>IMS Admin</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black tracking-wide uppercase bg-celebrate-gold/15 text-amber-800 dark:text-celebrate-gold border border-celebrate-gold/30">
            <Award className="w-2.5 h-2.5 shrink-0" />
            <span>IMS Faculty</span>
          </span>
        )}

        {teacher.college_name && (
          <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase bg-imstd-blue-50 dark:bg-imstd-blue-950/60 text-imstd-blue-700 dark:text-celebrate-gold border border-imstd-blue-100 dark:border-imstd-blue-900/40">
            {teacher.college_code ? `${teacher.college_code} • ` : ''}{teacher.college_name}
          </span>
        )}
      </div>

      {/* Department (Optional or fallback) */}
      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-2 mb-4 flex-1">
        {teacher.department || (isAdminRole ? 'IMS Admin' : (teacher.college_name ? '' : 'IMS Faculty Member'))}
      </p>

      {/* Action CTA */}
      {isAdmin ? (
        <button
          onClick={() => onSelect(teacher)}
          className="w-full mt-auto flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-white bg-imstd-blue-700 hover:bg-imstd-blue-800 transition-colors shadow-sm"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-celebrate-gold" />
          <span>Moderate Timeline</span>
        </button>
      ) : (
        <div className="w-full mt-auto flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-imstd-blue-700 dark:text-celebrate-gold bg-imstd-blue-50 dark:bg-imstd-blue-950/50 group-hover:bg-imstd-blue-700 group-hover:text-white dark:group-hover:bg-celebrate-gold dark:group-hover:text-slate-900 transition-all">
          <span>View Timeline</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      )}
    </div>
  );

  if (isAdmin) {
    return <div className="h-full">{cardContent}</div>;
  }

  return (
    <Link to={`/teachers/${teacher.slug}`} className="h-full block focus:outline-none focus:ring-2 focus:ring-celebrate-gold/50 rounded-2xl">
      {cardContent}
    </Link>
  );
}

export default TeacherCard;
