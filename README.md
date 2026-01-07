1-title: OS-Lab-project-API

2-Tech stack: 
    - **Runtime:** Node.js
    - **Framework:** Express.js
    - **Containerization:** Docker
    - **Validation:** Express-validator
    - **Environment Management:** Dotenv

3-How to build and run using Docker:
  1. بناء الصورة (Build Image): docker build -t project-os-lab .
  2. تشغيل الحاوية (Run Container): docker run -d -p 3000:3000 --name container-os-lab project-os-lab

4-How to stop the container and clean up :
    docker stop container-os-lab
    docker rm container-os-lab

5-Configuration notes:
    Entry Point: src/index.js.
    Default Port: 3000.
    Environment Variables: المشروع يعتمد على ملف .env.

6-How to test it :
    بمجرد تشغيل الحاوية، يمكنك اختبار الروابط (Endpoints) باستخدام Postman أو المتصفح:
    GET http://localhost:3000/ 
    GET http://localhost:3000/api/expense/currentMonth
    POST http://localhost:3000/api/expense/addexpense

7-Attribution :
    This project was developed from scratch as part of the **Software development frameworks** class project. All core logic and architectural decisions were implemented independently.



## 🚀 Deployment Process

### 1. Platform Registration & Setup
The deployment was performed using **Back4App**, a managed container platform.
* Registered an account on [Back4App](https://www.back4app.com/).
* Connected the platform to **GitHub** to enable automated workflows.
* Created a new **Web Deployment** (Container) instance specifically for this API.

### 2. Repository Cloning & Integration
Instead of manual cloning, the platform’s direct GitHub integration was utilized:
* Selected the repository `os-projectApi` from the connected GitHub account.
* Configured the **Main** branch as the source for the deployment.
* The platform automatically performed a `git clone` into its secure cloud environment to prepare the source code for building.

### 3. Build and Run (Docker Workflow)
The application was containerized and executed following these specifications:
* **Docker Build:** The platform detected the `Dockerfile` in the root directory and initiated the image building process using `node:22-alpine` as the base image.
* **Port Configuration:** The container was configured to expose and listen on **Port 3000**.
* **Deployment (Run):** Upon a successful build, the container was launched. The platform provides a dedicated sub-domain with SSL encryption to serve the API.
