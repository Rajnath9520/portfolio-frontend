import { motion } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiSass,
  SiFramer,
  SiReact,
  SiRedux,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiSupabase,
  SiSanity,
  SiDocker,
  SiVercel,
  SiGit,
  SiPostman,
  SiCloudflare,
} from "react-icons/si";

export default function Skills() {
  const items = [
    { icon: <SiJavascript size={48} className="text-yellow-400" />, label: "JavaScript" },
    { icon: <SiTypescript size={48} className="text-blue-500" />, label: "TypeScript" },
    { icon: <SiTailwindcss size={48} className="text-cyan-400" />, label: "Tailwind" },
    { icon: <SiSass size={48} className="text-pink-500" />, label: "SCSS" },
    { icon: <SiFramer size={48} className="text-pink-400" />, label: "Framer" },
    { icon: <SiReact size={48} className="text-cyan-400" />, label: "React" },
    { icon: <SiRedux size={48} className="text-purple-500" />, label: "Redux" },
    { icon: <SiNextdotjs size={48} className="text-white" />, label: "Next.js" },
    { icon: <SiNodedotjs size={48} className="text-green-500" />, label: "Node.js" },
    { icon: <SiExpress size={48} className="text-gray-300" />, label: "Express" },
    { icon: <SiMongodb size={48} className="text-green-600" />, label: "MongoDB" },
    { icon: <SiSupabase size={48} className="text-green-400" />, label: "Supabase" },
    { icon: <SiSanity size={48} className="text-red-500" />, label: "Sanity" },
    { icon: <SiDocker size={48} className="text-blue-400" />, label: "Docker" },
    { icon: <SiVercel size={48} className="text-white" />, label: "Vercel" },
    { icon: <SiGit size={48} className="text-orange-500" />, label: "Git" },
    { icon: <SiPostman size={48} className="text-orange-400" />, label: "Postman" },
    { icon: <SiCloudflare size={48} className="text-orange-500" />, label: "Cloudflare" },
  ];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { delay: i * 0.06, type: "spring", stiffness: 120 },
    }),
  };

  return (
    <div className="min-h-screen w-full text-white flex flex-col items-center py-20 px-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-3 mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
          Tech Stack
        </h1>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl">
        {items.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
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
        ))}
      </div>
    </div>
  );
}

