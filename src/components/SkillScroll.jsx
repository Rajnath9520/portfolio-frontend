import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";


 export default function SkillCard({ item, i }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.4, type: "spring" },
    },
  };

  React.useEffect(() => {
    if (inView) {
      controls.start("visible"); 
    } else {
      controls.start("hidden");  
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      whileHover={{
        scale: 1.08,
        boxShadow: "0 0 20px rgba(0, 255, 255, 0.25)",
        borderColor: "rgba(0, 255, 255, 0.4)",
      }}
      className="bg-[#0c0c0f] border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-4 transition-all duration-100"
    >
      <div>{item.icon}</div>
      <p className="text-sm text-gray-300">{item.label}</p>
    </motion.div>
  );
}
