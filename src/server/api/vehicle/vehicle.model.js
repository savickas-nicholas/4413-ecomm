
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Litres per km or miles per gallon
const units = ['km', 'mpg']

export const vehicleSchema = new Schema({
    name: { type: String },
    description: { type: String },
    brand: { type: String },
    model: { type: String },
    year: { type: Number, min: [1995, "Car make is too old"] },
    quantity: { type: Number, required: true, min: [1, "Must have positive quantity"] },
    price: { type: Number, required: true, min: [0.0, "Must have non-negative price"] },
    miles: { type: Number, default: 0, min: [0, "Must have non-negative mileage"] },
    milesUnits: { type: String, default: "km" },
    activeDeal: { type: Boolean, default: false },
    customizations: {
        condition: { type: String, default: '' },
        colour: { type: String, default: '' },
        trim: { type: String, default: '' },
        engine: { type: String, default: '' }
    }
})

vehicleSchema.path('milesUnits').validate(
    (milesUnits) => {
        return units.indexOf[milesUnits] != -1;
    }
)

export default mongoose.model("Vehicle", vehicleSchema)
