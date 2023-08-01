FROM python:latest

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Create a virtual environment and activate it
RUN python -m venv venv
RUN . venv/bin/activate

# Install the Python dependencies from the requirements file
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Flask app source code into the container
COPY . .

RUN prisma generate

# Expose the port the Flask app will run on
EXPOSE 8080

# Command to run the Flask app
CMD ["python", "app.py"]
