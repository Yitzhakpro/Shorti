# Building the project
FROM node:16-alpine as builder

WORKDIR /app
COPY . .

RUN yarn
RUN yarn build

# Serving the project on nginx
FROM nginx:1.21.0-alpine as production

# copy files from builder to nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# adding my nginx config
COPY ./nginx/templates/ /etc/nginx/templates

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]