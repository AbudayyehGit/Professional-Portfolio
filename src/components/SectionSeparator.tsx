import { motion } from 'motion/react';

interface SectionSeparatorProps {
  id?: string;
  className?: string;
}

export function SectionSeparator({ id, className = '' }: SectionSeparatorProps) {
  return (
    <div
      id={id}
      className={`relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex items-center justify-center overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Background ambient baseline rule */}
      <div className="absolute inset-x-4 sm:inset-x-6 h-[1px] bg-[#E2DAD0]/40" />

      {/* Animated Center-to-Full LA County Tri-Color Gradient Rule */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{
          duration: 0.85,
          ease: 'easeOut',
        }}
        style={{
          transformOrigin: 'center',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(0, 85, 150, 0.55) 18%, rgba(30, 123, 72, 0.65) 50%, rgba(212, 175, 55, 0.6) 82%, transparent 100%)',
        }}
        className="absolute inset-x-4 sm:inset-x-6 h-[1.5px]"
      />

      {/* Center Architectural Micro-Diamond Node */}
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: 45 }}
        whileInView={{ scale: 1, opacity: 1, rotate: 45 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{
          delay: 0.28,
          duration: 0.45,
          ease: 'easeOut',
        }}
        className="relative z-10 w-2.5 h-2.5 bg-[#F6F2EC] border border-[#D4AF37] shadow-xs flex items-center justify-center"
      >
        {/* Inner Micro Core blending LA County Blue & Green */}
        <div className="w-1 h-1 rounded-full bg-gradient-to-tr from-[#005596] to-[#1E7B48]" />
      </motion.div>
    </div>
  );
}
