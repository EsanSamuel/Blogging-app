import { ICustomer } from "@/types";
import { Schema, model, models } from "mongoose";

const customerSchema = new Schema<ICustomer>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date().toISOString(),
  },
});

const Customer =
  models.Customer || model<ICustomer>("Customer", customerSchema);

export default Customer;
