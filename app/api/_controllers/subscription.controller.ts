import { ApiError, ApiSuccess } from "@/utils/ApiResponse";
import Stripe from "stripe";
import { z } from "zod";
import { customerType, customerValidation } from "../../../lib/validation";
import Customer from "@/models/customer.model";
import connectDB from "@/lib/connect";

class subscriptionController {
  static async createCustomer(request: Request) {
    try {
      connectDB();
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2023-10-16",
      });
      const validate = customerValidation.parse(await request.json());
      const { email, name }: customerType = validate;
      const customerExists = await Customer.findOne({ email: email });
      const customer = await stripe.customers.create({
        name,
        email,
      });

      if (customerExists) {
        return new Response(
          JSON.stringify(
            new ApiError(500, "something went wrong", [
              "Customer already exists!",
            ])
          )
        );
      }

      //create customer in the database
      const newCustomer = new Customer({
        name,
        email,
      });

      await newCustomer.save();

      return new Response(
        JSON.stringify(new ApiSuccess(201, "Customer created!", customer))
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "something went wrong", [error]))
      );
    }
  }

  static async createSubscription(request: Request) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2023-10-16",
      });
      const { customerId, priceId } = await request.json();

      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: "default_incomplete",
        metadata: {},
        expand: ["latest_invoice.payment_intent"],
      });

      return new Response(
        JSON.stringify(
          new ApiSuccess(201, "Subscription created!", {
            subscription,
            subscriptionId: subscription.id,
            clientSecret:
              "subscription.latest_invoice.payment_intent.client_secret",
          })
        )
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "something went wrong", [error]))
      );
    }
  }

  static async cancelSubscription(request: Request) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2023-10-16",
      });
      const { subsriptionId } = await request.json();
      const deleteSubscription = await stripe.subscriptions.deleteDiscount(
        subsriptionId
      );

      return new Response(
        JSON.stringify(
          new ApiSuccess(201, "Subscription created!", deleteSubscription)
        )
      );
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify(new ApiError(500, "something went wrong", [error]))
      );
    }
  }
}

export default subscriptionController;
