

### 🐳 Docker Challenge & Solution

**The Problem:** Initially, the Docker image was too large because it included unnecessary files and local `node_modules`.
**The Solution:** I implemented a `.dockerignore` file to exclude the local `node_modules` and used the `node:18-alpine` base image, which reduced the image size significantly and ensured dependencies are installed fresh inside the container environment.

### 🐙 Git/GitHub Lesson
The most important lesson learned was the value of **atomic commits**. By separating structural changes from Docker configuration into different commits, it became much easier to track the progress of the project and revert specific changes without affecting the entire codebase.