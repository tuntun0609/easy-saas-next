'use client'

import React, { ReactNode } from 'react'
import { motion, Variants } from 'motion/react'

export type PresetType =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'blur'
  | 'blur-slide'
  | 'blur-slide-fade'
  | 'zoom'
  | 'flip'
  | 'bounce'
  | 'rotate'
  | 'swing'

export interface AnimatedViewportProps {
  children: ReactNode
  className?: string
  preset?: PresetType
  once?: boolean
  amount?: number | 'some' | 'all'
  margin?: string
}

const presetVariants: Record<PresetType, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slide: {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  scale: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
  blur: {
    hidden: { filter: 'blur(4px)', opacity: 0 },
    visible: { filter: 'blur(0px)', opacity: 1 },
  },
  'blur-slide': {
    hidden: { filter: 'blur(4px)', y: 20, opacity: 0 },
    visible: { filter: 'blur(0px)', y: 0, opacity: 1 },
  },
  'blur-slide-fade': {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1,
      },
    },
  },
  zoom: {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  },
  flip: {
    hidden: { rotateX: -90, opacity: 0 },
    visible: {
      rotateX: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  },
  bounce: {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
  },
  rotate: {
    hidden: { rotate: -180, opacity: 0 },
    visible: {
      rotate: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
  },
  swing: {
    hidden: { rotate: -10, opacity: 0 },
    visible: {
      rotate: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 8 },
    },
  },
}

export function AnimatedViewport({
  children,
  className,
  preset = 'fade',
  once = true,
  amount = 0.2,
  margin = '20px',
}: AnimatedViewportProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount,
        margin,
      }}
      variants={presetVariants[preset]}
      className={className}
    >
      {children}
    </motion.div>
  )
}
