const mongoose=require("mongoose")

let userSchema = new mongoose.Schema({
    "User_Name": String,
    "Email": String,
    "Password": String,
    "google_id": String,
    "Display_Picture":String,

    "Address": { type: String, default: "" },
    posts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Pet_detail', 
        }
      ]

})

const usermodel = mongoose.model("user_detail",userSchema)

module.exports=usermodel