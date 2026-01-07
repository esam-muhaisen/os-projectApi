const mongoose = require("mongoose");

module.exports = async () => {
    try {
        // إذا لم يوجد رابط قاعدة بيانات، سيتخطى المحاولة بدلاً من تعليق التطبيق
        if (!process.env.MONGO_URI) {
            console.log("No MONGO_URI found, skipping DB connection for deployment test...");
            return; 
        }
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected To MongoDB ^_^");
        
    } catch (error) {
        // أهم تعديل: نطبع الخطأ ولكن لا نوقف التطبيق
        console.log("Connection Failed To MongoDB, but server will keep running!");
    }
}

