# run `docker container prune` to kill all cached builds

# Use a python base image
FROM python:3.10-slim

# Set the working directory
WORKDIR /workspaces/
COPY . .

# Install required packages
RUN pip3 install --no-cache-dir -r requirements.txt

# Run app code and launch the server
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8081"]