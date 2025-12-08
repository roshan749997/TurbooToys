import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },                  // Product title
    mrp: { type: Number, required: true },                    // MRP (maximum retail price)
    discountPercent: { type: Number, default: 0, min: 0, max: 100 }, // Discount in %
    description: { type: String },
    category: { type: String, required: true, index: true },
    categoryId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Category',
      index: true 
    },

    product_info: {
      brand: { type: String },                    // Brand name (e.g., Hot Wheels, Matchbox)
      manufacturer: { type: String },             // Manufacturer name
      scale: { type: String },                    // Scale size (e.g., 1:64, 1:24, 1:18)
      material: { type: String },                 // Material (e.g., Die-cast, Plastic)
      color: { type: String },                    // Vehicle color
      vehicleType: { type: String },              // Vehicle type (e.g., Car, SUV, Truck, Bike)
      dimensions: { type: String },               // Dimensions (Length x Width x Height)
    },

    images: {
      image1: { type: String, required: true },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// 💡 Virtual field: Automatically calculate final price after discount
productSchema.virtual("price").get(function () {
  const discount = (this.mrp * this.discountPercent) / 100;
  return Math.round(this.mrp - discount);
});

export const Product = mongoose.model("Product", productSchema);
