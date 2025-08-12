Welcome to your new TanStack app! 

# Getting Started

To run this application:

```bash
pnpm install
pnpm start
```


# Setup


```sh
# 1. create project
pnpm dlx create-tsrouter-app@latest .  --template file-router --tailwind --add-ons shadcn


# 2. install shadcn-table
#    see https://www.diceui.com/docs/components/data-table
pnpm dlx shadcn@2.4.0-canary.12 add "https://diceui.com/r/data-table"

# other dependencies
pnpm dlx shadcn@latest add checkbox
pnpm dlx shadcn@latest add label
pnpm add zod


# 3. add nuqs
pnpm add nuqs@2.5.0-beta.3
```