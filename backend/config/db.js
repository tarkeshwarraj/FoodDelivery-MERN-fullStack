import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://tarkeshwarraj:nfeNOyLFa4MY7DR2@cluster0.d04xh.mongodb.net/tomato"
    )
    .then(() => console.log("DB Connected"));
};

//nfeNOyLFa4MY7DR2
