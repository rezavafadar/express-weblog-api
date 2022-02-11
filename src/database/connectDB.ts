import prisma from "./prisma-client";

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connect to databse is successfull !");
  } catch (error) {
    console.log("Connect to database is unsuccessfull !");
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
