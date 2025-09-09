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
pnpm add nuqs@latest
```

# Update


```sh
# 更新 nuqs 到最新版本 2.6.0
pnpm update nuqs@latest
```