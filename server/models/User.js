import { Schema, model } from "mongoose";

const schema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: { type: String, required: true, maxlength: 50 },
});

export default model("User", schema);
