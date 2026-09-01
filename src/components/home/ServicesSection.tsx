import React from 'react';
import { motion } from 'motion/react';
import { servicesData } from '../../data/services';
import { SectionTitle } from '../common/SectionTitle';
import { Button } from '../common/Button';
import { 
  Globe, 
  Sparkles, 
  Cpu, 
  Server, 
  Layout, 
  Cloud, 
  Check, 
  ArrowRight,
  ArrowUpRight 
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Layout: <Layout className="w-5 h-5" />,
  Cloud: <Cloud className="w-5 h-5" />
};

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Offerings & Capabilities"
          title="Specialized Engineering Services"
          description="Discover high-quality digital solutions that are fast, secure, reliable, and easy to use—designed for modern businesses and users."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-cyan-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-5 border border-cyan-500/20">
                  {iconMap[service.iconName] || <Globe className="w-5 h-5" />}
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-3 font-medium">
                  {service.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Key Features
                  </p>
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <Check className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <Button
                  size="sm"
                  variant="ghost"
                  asAnchor
                  href="/contact"
                  className="p-0 hover:bg-transparent text-cyan-600 dark:text-cyan-400 font-semibold"
                  rightIcon={<ArrowUpRight className="w-4 h-4" />}
                >
                  Request Consultation
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
