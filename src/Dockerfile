# Étape 1 : construire l'application
# builder est le nom de l etape
FROM node:20-alpine AS builder

WORKDIR /app

#install dpendencies pour better-sqlite3
RUN apk add --no-cache python3 make g++


COPY package.json package-lock.json /app/

RUN npm ci

# Copier le reste du projet
COPY . .

RUN npm rebuild better-sqlite3 --build-from-source

# Construire le projet Next.js
RUN npm run build

# Étape 2 : lancer l'application
FROM node:20-alpine AS runner

WORKDIR /app

# Copier uniquement les fichiers nécessaires depuis l'étape builder
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/db ./db
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts


RUN mkdir -p ./uploads ./drizzle

EXPOSE 3000

ENV NODE_ENV=production

# Lancer Next.js en mode production DANS LE CONTAINER
#il faut ensuite relier le 3000 du cotnainer a celui de la machine
CMD ["sh", "-c", "if [ ! -f sqlite.db ]; then npx drizzle-kit generate && npx drizzle-kit migrate; fi && npm start"]