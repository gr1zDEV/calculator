# Use a lightweight web server to serve static files
FROM nginx:alpine

# Remove the default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy your static website files into the nginx directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80
