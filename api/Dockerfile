# Use the official Python image as the base image
FROM python:3.9

# Set the working directory inside the container
WORKDIR /app

# Copy the Prisma schema and Flask app code into the container
COPY prisma app.py middleware.py requirements.txt /app/

# Install the required dependencies for the Flask app
RUN pip install -r requirements.txt

# Generate the Prisma client
RUN prisma generate

# Expose the port that your Flask app runs on (replace 8080 with your desired port if different)
EXPOSE 8080

# Start the Flask app when the container starts
CMD ["python", "app.py"]
