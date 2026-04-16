// components/RocketLoader.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Lottie from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import "../styles/share/loader.scss";
import rocketAnimation from '../../public/animation-config/loader.json';

const RocketLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  // При каждом изменении пути — показываем лоадер
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // 0.5 секунды для быстрых переходов

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="rocket-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "linear" }}
            className="rocket-loader-container"
          >
            <Lottie
              animationData={rocketAnimation}
              loop={false}
              style={{ width: "100%", height: "100%" }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="loader-text"
            >
              Загрузка...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RocketLoader;