# Building the project
FROM node:16-alpine as builder

WORKDIR /app
COPY . .

RUN yarn
RUN yarn build

# Serving the project on nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production

# copy files from builder to nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# adding my nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]