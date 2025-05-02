import { motion } from "framer-motion";

const Transition = ({ children }) => {
  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.8 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {children}
      <motion.div
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.8, delay: 0.4 } }}
        className="fixed top-0 left-0 z-50 origin-bottom h-screen w-screen bg-zinc-950"
      />
    </motion.div>
  );
};

export default Transition;
