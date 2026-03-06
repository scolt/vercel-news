import * as React from 'react'
import {cva, type VariantProps} from 'class-variance-authority'

import {cn} from '@/libs/utils'

const typographyVariants = cva(
  '',
  {
    variants: {
      variant: {
        heading1: 'font-mono text-4xl font-extrabold',
        heading2: 'font-mono border-b pb-2 text-3xl font-semibold',
        heading3: 'font-mono text-2xl font-semibold',
        body1: 'font-serif',
        body2: 'font-inter text-md',
        strong2: 'font-inter text-md font-bold',
      },
    },
    defaultVariants: {
      variant: 'body1',
    },
  }
)

function Typography({
                      className,
                      variant = 'body1',
                      as = 'p',
                      ...props
                    }: React.ComponentProps<'p'> &
  VariantProps<typeof typographyVariants> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'strong',
}) {
  const Comp = as;

  return (
    <Comp
      data-slot="typography"
      data-variant={variant}
      className={cn(typographyVariants({variant, className}))}
      {...props}
    />
  )
}

export {Typography, typographyVariants}
