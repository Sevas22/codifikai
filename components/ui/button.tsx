import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        /** CTA principal: blanco → #55e4e3 al hover */
        cta:
          'rounded-full border border-zinc-200/90 bg-white font-sans font-semibold text-zinc-950 shadow-md transition-colors duration-200 hover:border-[#55e4e3] hover:bg-[#55e4e3] hover:text-zinc-950 focus-visible:border-[#55e4e3] focus-visible:ring-2 focus-visible:ring-[#55e4e3]/35 dark:border-white/25 dark:bg-white dark:text-zinc-950 dark:hover:border-[#55e4e3] dark:hover:bg-[#55e4e3] dark:hover:text-zinc-950 dark:focus-visible:ring-[#55e4e3]/40 [&_svg]:text-current',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        /** Pastilla CTA estándar */
        cta: 'h-auto min-h-10 rounded-full px-6 py-3.5 text-sm has-[>svg]:px-5 sm:px-8 sm:py-4 sm:text-base',
        /** Hero / bloques grandes */
        'cta-lg':
          'h-auto min-h-12 rounded-full px-8 py-5 text-base has-[>svg]:px-6 sm:px-10 sm:py-6 sm:text-lg',
        /** Nav / compacto */
        'cta-sm': 'h-auto min-h-8 rounded-full px-3 py-2 text-xs has-[>svg]:px-2.5 sm:px-4 sm:text-sm',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
