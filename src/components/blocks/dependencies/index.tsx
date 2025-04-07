'use client'

import Image from 'next/image'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export interface Dependency {
  name: string
  image: string
  darkImage?: string
  width?: number
  height?: number
}

export const Dependencies = ({
  className,
  title,
  description,
  dependencies,
}: {
  className?: string
  title?: string
  description?: string
  dependencies: Dependency[]
}) => {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="space-y-2">
        {title && <h2 className="text-center text-3xl font-bold">{title}</h2>}
        {description && <p className="text-muted-foreground text-center">{description}</p>}
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {dependencies.map(dependency => (
          <Tooltip key={dependency.name}>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center">
                <Image
                  className="h-auto dark:hidden"
                  src={dependency.image}
                  alt={dependency.name}
                  width={dependency.width || 36}
                  height={dependency.height || 36}
                />
                <Image
                  className="hidden h-auto dark:block"
                  src={dependency.darkImage || dependency.image}
                  alt={dependency.name}
                  width={dependency.width || 36}
                  height={dependency.height || 36}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent sideOffset={10} isArrow={false} side="bottom">
              <p>{dependency.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  )
}
