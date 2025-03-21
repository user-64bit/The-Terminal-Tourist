'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Post } from './helper';

interface AnimatedBlogCardProps {
  post: Post;
  index: number;
}

export default function AnimatedBlogCard({ post, index }: AnimatedBlogCardProps) {
  // Card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
    hover: {
      y: -5,
      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
      transition: { duration: 0.3 }
    }
  };

  // Tag animation
  const tagVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + (i * 0.05),
        duration: 0.3
      }
    })
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="blog-card p-4"
    >
      <Link href={`/${post.slug}/`} className="block h-full">
        <div className="flex justify-between items-start mb-2">
          <motion.h2 
            className="text-xl font-semibold hover-underline-animation text-[var(--link)]"
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            {post.title}
          </motion.h2>
          <span className="text-sm text-gray-400 bg-[var(--inline-code-bg)] px-2 py-1 rounded">
            {post.date}
          </span>
        </div>
        
        {post.description && (
          <motion.p 
            className="text-sm text-gray-300 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {post.description}
          </motion.p>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string, i: number) => (
                <motion.span
                  key={tag}
                  custom={i}
                  variants={tagVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-xs px-2 py-1 rounded bg-[var(--code-bg)] text-[var(--secondary-highlight)]"
                >
                  #{tag}
                </motion.span>
              ))}
            </div>
          )}
          
          <motion.span 
            className="text-xs text-[var(--highlight)]"
            whileHover={{ 
              x: 5,
              transition: { duration: 0.2, ease: 'easeInOut' }
            }}
          >
            Read more →
          </motion.span>
        </div>
      </Link>
    </motion.div>
  );
} 