FROM node:22-alpine AS base

# 1. Tahap Install Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Jika kamu menggunakan Prisma, pastikan file schema ikut disalin di sini 
# agar prisma generate bisa berjalan jika dipicu oleh postinstall
COPY prisma ./prisma/ 

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && npm install; \
  fi

# 2. Tahap Rebuild Source Code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Menonaktifkan telemetri Next.js
ENV NEXT_TELEMETRY_DISABLED 1

# --- BAGIAN PERBAIKAN: GENERATE PRISMA CLIENT ---
RUN \
  if [ -f yarn.lock ]; then yarn prisma generate; \
  elif [ -f package-lock.json ]; then npx prisma generate; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm prisma generate; \
  else npx prisma generate; \
  fi
# ------------------------------------------------

# Jalankan Build Next.js
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else npm run build; \
  fi

# 3. Tahap Production Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set permission untuk cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Ambil hasil build standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]