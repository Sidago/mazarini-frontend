FROM node:24.13

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG NEXT_PUBLIC_STRAPI_URL=http://75.119.135.164:5001
ENV NEXT_PUBLIC_STRAPI_URL=${NEXT_PUBLIC_STRAPI_URL}

RUN npm run build

ENV NODE_ENV=production
ENV PORT=5002

EXPOSE 5002

CMD ["npm", "run", "start"]
