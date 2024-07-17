import Stripe from 'stripe';
import dotenv from "dotenv";
import Order from "../models/order.model.js";

dotenv.config();

const stripe = Stripe(process.env.CHECKOUT_API_KEY_SECRET);

export const createSession = async (req, res) => {
  const cartItems = req.body.cartItems;
  console.log(cartItems)
  // Validate cartItems
  if (!Array.isArray(cartItems)) {
    return res.status(400).json({ error: "cartItems must be an array" });
  }

  const metadata = {
    userId: req.body.userId,
    items: cartItems.map(item => ({
      _id: item._id,
      title: item.title,
      images: [item.mainImage],
      cartTotalQuantity: item.cartTotalQuantity
    }))
  };

  // Convert metadata to a JSON string
  const metadataString = JSON.stringify(metadata);

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cartItems: metadataString,
    }
  });

  const line_items = cartItems.map((item) => {
    return {
      price_data: {
        currency: "lkr", 
        product_data: {
          name: item.title,
          description: item.description,
          images: [item.image],
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price * 100, // Adjust unit amount to cents
      },
      quantity: item.cartTotalQuantity,
    };
  });

  // Calculate the total amount
  const totalAmount = line_items.reduce((acc, item) => acc + (item.price_data.unit_amount * item.quantity), 0);

  // Check if the total amount is less than 50 cents in LKR
  if (totalAmount < 50 * 100) { // Adjust to correct currency check
    return res.status(400).send({ error: "Total amount must be at least 50 cents in LKR." });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['LK'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'lkr',
          },
          display_name: 'Free Shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 2,
            },
          }
        }
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 50000,
            currency: 'lkr',
          },
          display_name: 'One Day Delivery',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    customer: customer.id,
    line_items,
    mode: 'payment',
    success_url: `http://localhost:5173/order-pay-success`,
    cancel_url: `http://localhost:5173/cart`,
  });

  res.send({ url: session.url });
};

// Create order (save successful payments in database)
const createOrder = async (customer, data) => {
  try {
    const cartItems = JSON.parse(customer.metadata.cartItems);
    const items = cartItems.items.map(item => ({
      _id: item._id,
      title: item.title,
      cartTotalQuantity: item.cartTotalQuantity,
      mainImage: item.images[0],
    }));

    const newOrder = new Order({
      orderId: data.id,
      userId: customer.metadata.userId,
      productsId: items.map(item => ({
        id: item._id,
        title: item.title,
        mainImage: item.mainImage, 
        quantity: item.cartTotalQuantity
      })),
      first_name: data.customer_details.name.split(' ')[0],
      last_name: data.customer_details.name.split(' ')[1],
      email: data.customer_details.email,
      phone: data.customer_details.phone,
      address: data.customer_details.address.line1,
      city: data.customer_details.address.city,
      zip: data.customer_details.address.postal_code,
      subtotal: data.amount_subtotal / 100,
      deliveryfee: 300,
      totalcost: data.amount_total / 100,
    });

    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;

export const handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let data;
  let eventType;

  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Webhook verified!!");
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the event
  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        createOrder(customer, data);
        console.log("Order created successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
};
