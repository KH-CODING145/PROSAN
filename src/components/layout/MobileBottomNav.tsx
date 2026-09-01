import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Home, 
  FolderGit2, 
  Cpu, 
  Briefcase, 
  Mail,
  User
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Projects', href: '/projects', icon: FolderGit2 },
  { name: 'Skills', href: '/skills', icon: Cpu },
  { name: 'Experience', href: '/experience', icon: Briefcase },
  { name: 'Contact', href: '/contact', icon: Mail },
];

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();

  // Check active route including nested sub-routes
  const isItemActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav
      id="mobile-bottom-navigation"
      aria-label="Mobile Navigation Bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)] pb-[max(env(safe-area-inset-bottom),10px)] pt-1.5 px-3"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const active = isItemActive(item.href);
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'relative flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl min-w-[56px] min-h-[48px] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500',
                  active || isActive
                    ? 'text-cyan-600 dark:text-cyan-400 font-semibold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                )
              }
            >
              {active && (
                <motion.div
                  layoutId="mobileBottomNavActive"
                  className="absolute inset-0 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-xl -z-10"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <Icon className={cn('w-5 h-5 transition-transform duration-200', active ? 'scale-110' : 'scale-100')} />
              <span className="text-[10px] font-medium tracking-tight mt-0.5 whitespace-nowrap">
                {item.name}
              </span>
              {active && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-cyan-500" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
