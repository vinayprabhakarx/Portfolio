import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';
import animationFile from '../assets/developer.lottie';

const DeveloperSkills = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      role="img"
      aria-label="Developer working animation"
      style={{
        width: "100%",
        maxWidth: "100%",
        height: "auto",
      }}
    >
      <DotLottieReact
        src={animationFile}
        loop
        autoplay
      />
    </motion.div>
  );
};

export default DeveloperSkills;