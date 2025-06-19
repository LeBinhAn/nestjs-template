# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies needed for node-gyp and native modules
RUN apk add --no-cache python3 make g++

# Enable corepack to use yarn
RUN corepack enable

# Copy package.json and yarn.lock (if available)
COPY package.json yarn.lock* ./

# Install all dependencies (including devDependencies for building)
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Install dependencies needed for runtime
RUN apk add --no-cache dumb-init

# Enable corepack to use yarn
RUN corepack enable

# Copy package.json and yarn.lock
COPY package.json yarn.lock* ./

# Install only production dependencies
# RUN yarn install --frozen-lockfile --production --ignore-scripts && yarn cache clean
RUN yarn install --frozen-lockfile --ignore-scripts && yarn cache clean

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001 -G nodejs

# Change ownership of the app directory
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expose port (adjust if your app uses a different port)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start the application using dumb-init for proper signal handling
CMD ["dumb-init", "node", "dist/main"]