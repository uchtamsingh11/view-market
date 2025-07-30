# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Enable pnpm
RUN corepack enable

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --no-frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Enable pnpm
RUN corepack enable

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install only production dependencies
RUN pnpm install --no-frozen-lockfile --prod

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"] 