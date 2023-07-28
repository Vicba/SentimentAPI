# Step 1: Choose a base image (official NGINX image)
FROM nginx:latest

# Step 2: Copy your nginx.conf to the container's NGINX configuration directory
COPY nginx.conf /etc/nginx/nginx.conf

# Step 3: (Optional) If you have SSL certificates or other files, copy them too
# COPY ssl.crt /etc/nginx/ssl.crt
# COPY ssl.key /etc/nginx/ssl.key

# Step 4: Expose the ports your NGINX server listens on (if different from the default 80)
EXPOSE 80

# Step 5: Start NGINX when the container runs
CMD ["nginx", "-g", "daemon off;"]
