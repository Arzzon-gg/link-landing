'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  once?: boolean;
  amount?: number;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 26,
  once = true,
  amount = 0.25,
}: FadeInProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, x, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={reduceMotion ? undefined : { duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
};

export function StaggerGroup({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0,
  once = true,
  amount = 0.2,
}: StaggerGroupProps) {
  const reduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : stagger,
        delayChildren: reduceMotion ? 0 : delayChildren,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'visible'}
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  x?: number;
  y?: number;
  duration?: number;
};

export function StaggerItem({
  children,
  className,
  x = 0,
  y = 24,
  duration = 0.65,
}: StaggerItemProps) {
  const reduceMotion = useReducedMotion();

  const variants: Variants = reduceMotion
    ? {}
    : {
        hidden: { opacity: 0, x, y, scale: 0.985 },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: { duration, ease: EASE },
        },
      };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
