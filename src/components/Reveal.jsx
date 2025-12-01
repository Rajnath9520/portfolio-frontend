import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Reveal({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (isInView) {
      setTrigger(true);   
    } else {
      setTrigger(false); 
    }
  }, [isInView]);

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={trigger ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
