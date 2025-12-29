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
