const mongoose = require('mongoose')

const URI = "mongodb+srv://prathamshailesh:G8pKPjYcgiH_vUY@cluster0.wfwg2sn.mongodb.net/Petopia"

const connectDatabase= async()=>{
    try{
        await mongoose.connect(URI)
        console.log("Database Connected Successfully")
    }catch{
        // console.error("error connecting database",error);
        console.log("error connecting database")
        throw error
    }
}

module.exports = connectDatabase;