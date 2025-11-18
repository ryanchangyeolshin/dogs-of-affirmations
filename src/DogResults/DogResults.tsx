import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { MotivationalQuoteResponseType } from "../types/interfaces";

interface DogResultsProps {
  dogImage: string;
  motivationalQuote: MotivationalQuoteResponseType | null;
}

const DogResults: React.FC<DogResultsProps> = ({
  dogImage,
  motivationalQuote,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-full max-w-lg min-w-[33vw] min-h-[33vh] mx-auto mt-10 p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-2xl border border-white/10 text-white space-y-6 flex flex-col"
    >
      {dogImage && (
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          src={dogImage}
        />
      )}
      {motivationalQuote && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="mt-6 text-center text-lg sm:text-xl font-medium text-white/90 p-4 rounded-xl bg-white/5"
        >
          {`"${motivationalQuote?.quote}" - ${motivationalQuote?.author}`}
        </motion.p>
      )}
    </motion.div>
  );
};

export default DogResults;
