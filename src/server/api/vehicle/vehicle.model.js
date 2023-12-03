
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Litres per km or miles per gallon
const units = ['km', 'mpg'];

const CustomizationSchema = new Schema({
    // New or old
    condition: { type: String, default: '' },
    colour: { type: String, default: '' },
    // Petrol, diesel or electric
    engine: { type: String, default: '' },
    numPassengers: { type: Number, default: 4 }
});

export const VehicleSchema = new Schema({
    name: { type: String },
    description: { type: String },
    brand: { type: String },
    model: { type: String },
    year: { type: Number, min: [1995, "Car make is too old"] },
    quantity: { type: Number, required: true, min: [1, "Must have positive quantity"] },
    price: { type: Number, required: true, min: [0.0, "Must have non-negative price"] },
    miles: { type: Number, default: 0, min: [0, "Must have non-negative mileage"] },
    milesUnits: { type: String, default: "km" },
    // Chevrolet.png, Ford.png, etc. - save to a file system instead of storing image on db
    imgPath: { type: String, default: "" },
    activeDeal: { type: Boolean, default: false },
    customizations: {
        type: CustomizationSchema, 
        default: () => ({})
    }
});

VehicleSchema.path('milesUnits').validate(
    (milesUnits) => {
        return units.indexOf[milesUnits] != -1;
    }
);

export default mongoose.model('Vehicle', VehicleSchema);
