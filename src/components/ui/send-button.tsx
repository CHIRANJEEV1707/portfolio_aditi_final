'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface SendButtonProps {
  isSubmitting: boolean;
}

const SendButton = ({ isSubmitting }: SendButtonProps) => {
  return (
    <motion.button
      className={cn(
        'group flex items-center justify-center rounded-2xl bg-primary text-primary-foreground text-lg font-medium px-5 py-2 pl-[0.9em] overflow-hidden cursor-pointer',
        isSubmitting ? 'cursor-not-allowed opacity-50' : 'hover:bg-primary/90 active:scale-95'
      )}
      disabled={isSubmitting}
      whileHover={isSubmitting ? '' : 'hover'}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          <span>Sending...</span>
        </>
      ) : (
        <>
          <div className="svg-wrapper flex items-center">
            <motion.div
              className="svg-wrapper"
              variants={{
                hover: {
                  y: [0, -2, 0],
                  transition: {
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  },
                },
              }}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
                className="transition-transform duration-300 origin-center"
                variants={{
                  hover: {
                    x: '1.2em',
                    rotate: 45,
                    scale: 1.1,
                  },
                }}
                transition={{ duration: 0.3 }}
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                />
              </motion.svg>
            </motion.div>
          </div>
          <motion.span
            className="ml-1 inline-block"
            variants={{
              hover: {
                x: '5em',
              },
            }}
            transition={{ duration: 0.3 }}
          >
            Send
          </motion.span>
        </>
      )}
    </motion.button>
  );
};

export default SendButton;
