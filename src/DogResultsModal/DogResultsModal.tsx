import { motion } from "framer-motion";
import React, { useEffect } from "react";
import type { MotivationalQuoteResponseType } from "../types/interfaces";

interface DogResultsModalProps {
  dogImage: string;
  motivationalQuote: MotivationalQuoteResponseType | null;
  onClose: () => void;
}

const DogResultsModal: React.FC<DogResultsModalProps> = ({
  dogImage,
  motivationalQuote,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 1 }}
      />

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-lg min-w-[33vw] max-w-100% min-h-100% max-h-[80vh] mx-auto p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-2xl border border-white/10 text-white space-y-6 flex flex-col z-10"
      >
        {dogImage && (
          <motion.img
            src={dogImage}
            alt="Dog"
            className="rounded-xl max-w-70% max-h-70% mx-auto"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 1 }}
          />
        )}

        {motivationalQuote && (
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 1 }}
            className="mt-6 text-center text-lg sm:text-xl font-medium text-white/90 p-4 rounded-xl bg-white/5"
          >
            {`"${motivationalQuote.quote}" - ${motivationalQuote.author}`}
          </motion.p>
        )}

        <button
          onClick={onClose}
          className="mt-auto w-full py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl cursor-pointer transition"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default DogResultsModal;
