import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { SKILLS_DATA, type SkillItem } from '../data/portfolioData';
import { SkillIcon } from './TechIcons';

const CATEGORIES: Array<'All' | SkillItem['category']> = [
  'All',
  'Languages',
  'Frontend & Web',
  'AI & Data',
  'Hardware & Tools',
];

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<
    'All' | SkillItem['category']
  >('All');

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') return SKILLS_DATA;
    return SKILLS_DATA.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="skills"
      className="bg-[#F3EFFA] text-[#1E1336] py-20 sm:py-28 border-t border-[#E6DFEF]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10">
          <div className="space-y-3 max-w-2xl">
            <p className="text-sm font-semibold text-[#C2410C] tracking-wide">
              Technical Capabilities
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E1336]">
              Core Languages, Frameworks &amp; Engineering Stack
            </h2>
          </div>

          {/* Interactive Category Filter Buttons */}
          <div
            role="tablist"
            aria-label="Filter skills by category"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-xl border border-[#E2D9F0]"
          >
            {CATEGORIES.map((category) => {
              const selected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EA580C] ${
                    selected
                      ? 'bg-[#2B1055] text-white shadow-sm'
                      : 'text-[#52466B] hover:text-[#1E1336] hover:bg-[#F5F1FC]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Technology Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.25, delay: idx * 0.04 }}
              whileHover={{ y: -4 }}
              className="group bg-white rounded-2xl border border-[#E3DAF0] p-6 flex flex-col justify-between shadow-sm hover:border-[#C084FC] hover:shadow-md transition-all duration-200"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#2B1055] text-white flex items-center justify-center group-hover:bg-[#EA580C] transition-colors duration-200">
                  <SkillIcon iconKey={skill.iconKey} className="w-6 h-6" />
                </div>

                <div className="mt-5">
                  <p className="text-xs font-medium text-[#6B5D87]">
                    {skill.category} <span aria-hidden="true">·</span> {skill.focus}
                  </p>
                  <h3 className="font-display text-lg font-bold text-[#1E1336] mt-1">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-[#52466B] leading-relaxed mt-2.5">
                    {skill.summary}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
