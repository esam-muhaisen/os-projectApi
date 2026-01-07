

### 🐳 Docker Challenge & Solution

**The Problem:** Initially, the Docker image was too large because it included unnecessary files and local `node_modules`.
**The Solution:** I implemented a `.dockerignore` file to exclude the local `node_modules` and used the `node:18-alpine` base image, which reduced the image size significantly and ensured dependencies are installed fresh inside the container environment.

### 🐙 Git/GitHub Lesson
The most important lesson learned was the value of **atomic commits**. By separating structural changes from Docker configuration into different commits, it became much easier to track the progress of the project and revert specific changes without affecting the entire codebase.

# Deployment Notes & Challenges

### 1. Docker Context & Source File Synchronization
* **Challenge:** The initial deployment attempts on the cloud platform failed during the Docker build stage. The logs indicated an error: "no source files specified," despite the files being present in the repository.
* **Solution:** I investigated the `Dockerfile` and discovered that the build context required a more explicit copy command. I updated the instruction to `COPY . .` with proper spacing and verified that the `.dockerignore` file was not inadvertently excluding the `src/` directory.

### 2. Database Connectivity in Production
* **Challenge:** Upon successfully building the image, the container failed to stay active because the application was crashing due to a "Connection Failed To MongoDB" error. This prevented the platform's health check from verifying the service on port 3000.
* **Solution:** To ensure high availability and successful deployment, I refactored the database initialization logic. I modified the connection function to handle connection failures gracefully (non-blocking), allowing the Express server to start and listen on port 3000 even if the database URI was not yet configured for the production environment.

### 3. Port Mapping & Environment Configuration
* **Challenge:** Ensuring the cloud platform correctly mapped internal container traffic to the public URL.
* **Solution:** I explicitly defined the `EXPOSE 3000` instruction in the `Dockerfile` and synchronized this with the Back4App dashboard settings. This ensured that the "Health Check" probes could reach the application, resulting in a successful "Available" status.
