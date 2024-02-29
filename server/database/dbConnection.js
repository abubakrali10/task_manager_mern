import mongoose from 'mongoose';

export const dbConnection = () => {
    mongoose.connect(process.env.MONGOOSE_URI, {
        dbName: "TASK_MANAGER"
    }).then(() => {
        console.log("Database Connected");
    }).catch(error => {
        console.log(`Database connection failed: ${error}`);
    })
}
