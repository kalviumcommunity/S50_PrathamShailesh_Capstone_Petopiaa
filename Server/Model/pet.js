const mongoose=require("mongoose")

let petschema= new mongoose.Schema({
    name: {
        type: "string",
        required: true,
      },
      species: {
        type: "string",
        required: true,
      },
      breed: {
        type: "string",
        required: true,
      },
      age: {
        type: "number",
        required: true,
        min: 1,
        max: 9,
      },
      gender: {
        type: "string",
        required: true,
      },
      color: {
        type: "string",
        required: true,
      },
      image: {
        type: "string",
        required: true,
      },
      price: {
        type: "number",
        required: true,
      },
      description: {
        type: "string",
        required: true,
      },
        userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
})

const petModel = mongoose.model("Pet_detail", petschema);

module.exports=petModel;

  