'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface RewardCard {
  id: string;
  name: string;
  color: string;
  collected: boolean;
  collectedAt?: Date;
}

interface RewardsGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  totalRewards: number;
  collectedRewards: string[];
}

const REWARD_NAMES = [
  "Maahira 01", "Yoosuf 02", "Maryam 03", "Ahmed 04", "Haaniya 05",
  "Ms. Deenihan 06", "Sajjad 07", "Farheen 08", "Yousuf Huda 09", "Maahira 10",
  "Rainbow Star 11", "Golden Crown 12", "Magic Wand 13", "Crystal Heart 14", "Diamond Shield 15",
  "Super Hero 16", "Princess Crown 17", "Dragon Badge 18", "Unicorn Medal 19", "Phoenix Feather 20"
];

const REWARD_COLORS = [
  "from-pink-400 to-rose-500",
  "from-blue-400 to-cyan-500", 
  "from-purple-400 to-indigo-500",
  "from-green-400 to-emerald-500",
  "from-yellow-400 to-orange-500",
  "from-red-400 to-pink-500",
  "from-indigo-400 to-purple-500",
  "from-teal-400 to-blue-500",
  "from-orange-400 to-red-500",
  "from-emerald-400 to-teal-500"
];

export default function RewardsGallery({ isOpen, onClose, totalRewards, collectedRewards }: RewardsGalleryProps) {
  if (!isOpen) return null;

  const rewards: RewardCard[] = Array.from({ length: 20 }, (_, index) => {
    const rewardId = `reward-${index + 1}`;
    return {
      id: rewardId,
      name: REWARD_NAMES[index] || `Special Reward ${index + 1}`,
      color: REWARD_COLORS[index % REWARD_COLORS.length],
      collected: collectedRewards.includes(rewardId)
    };
  });

  const collectedCount = rewards.filter(reward => reward.collected).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-purple-700 mb-2">
              🏆 Maahira&apos;s Treasure Collection
            </h2>
            <p className="text-lg text-gray-600">
              Collected: {collectedCount}/20 Special Rewards! 
            </p>
            {collectedCount > 0 && (
              <p className="text-green-600 font-semibold">
                🎉 Amazing work, Maahira! Keep going!
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full text-xl"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(collectedCount / 20) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full"
            />
          </div>
          <p className="text-center mt-2 text-sm text-gray-600">
            {Math.round((collectedCount / 20) * 100)}% Complete!
          </p>
        </div>

        {/* Motivational Messages */}
        {collectedCount === 0 && (
          <div className="text-center mb-6 p-4 bg-blue-50 rounded-2xl">
            <h3 className="text-xl font-bold text-blue-600 mb-2">🌟 Ready for Adventure?</h3>
            <p className="text-blue-700">Complete math challenges to collect your first treasure!</p>
          </div>
        )}

        {collectedCount >= 5 && collectedCount < 10 && (
          <div className="text-center mb-6 p-4 bg-green-50 rounded-2xl">
            <h3 className="text-xl font-bold text-green-600 mb-2">🎯 Great Progress!</h3>
            <p className="text-green-700">You&apos;re becoming a math superstar! Keep collecting!</p>
          </div>
        )}

        {collectedCount >= 10 && collectedCount < 15 && (
          <div className="text-center mb-6 p-4 bg-purple-50 rounded-2xl">
            <h3 className="text-xl font-bold text-purple-600 mb-2">⭐ Math Master!</h3>
            <p className="text-purple-700">Incredible! You&apos;re more than halfway there!</p>
          </div>
        )}

        {collectedCount >= 15 && collectedCount < 20 && (
          <div className="text-center mb-6 p-4 bg-orange-50 rounded-2xl">
            <h3 className="text-xl font-bold text-orange-600 mb-2">🏆 Almost There!</h3>
            <p className="text-orange-700">Just a few more treasures to complete your collection!</p>
          </div>
        )}

        {collectedCount === 20 && (
          <div className="text-center mb-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl">
            <h3 className="text-2xl font-bold text-yellow-600 mb-2">🎉 CHAMPION! 🎉</h3>
            <p className="text-yellow-700 text-lg">You&apos;ve collected ALL the treasures! You&apos;re a true Math Champion!</p>
          </div>
        )}

        {/* Rewards Grid */}
        <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
          {rewards.map((reward, index) => (
            <motion.div
              key={reward.id}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className={`
                relative aspect-square rounded-2xl p-3 text-center
                ${reward.collected 
                  ? `bg-gradient-to-br ${reward.color} text-white shadow-lg transform scale-105`
                  : 'bg-gray-200 text-gray-400 opacity-60'
                }
                transition-all duration-300
              `}
            >
              {reward.collected ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className="h-full flex flex-col items-center justify-center"
                >
                  <div className="text-2xl mb-1">✨</div>
                  <div className="text-xs font-bold leading-tight">{reward.name}</div>
                  <div className="absolute top-1 right-1 text-yellow-300 text-lg">⭐</div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="text-2xl mb-1">🔒</div>
                  <div className="text-xs leading-tight">{reward.name}</div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Fun Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{collectedCount}</div>
            <div className="text-sm text-blue-700">Treasures Collected</div>
          </div>
          <div className="bg-green-50 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{20 - collectedCount}</div>
            <div className="text-sm text-green-700">More to Discover</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}