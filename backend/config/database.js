const mongoose = require("mongoose");

//const dburl = "mongodb+srv://hewageiroshan3:pasindu123@cluster0.m7as14z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const dburl = "mongodb+srv://hewageiroshan3:pasindu123@cluster0.m7as14z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//const dburl = "mongodb+srv://ashandilakshana2002:ashan1234@cluster00.yv7ol.mongodb.net/TRAVELING?retryWrites=true&w=majority&appName=Cluster00";

mongoose.set("strictQuery",true,"useNewUrlParser",true);

const connection  = async()=>{
    try{
        await mongoose.connect(dburl);
        console.log("MongoDB connected ");
    } catch (e) {
        console.error(e.message);
        process.exit();
    }
};

module.exports = connection;