const express = require('express');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Use your Stripe secret key here
const ProductModel = require('../../models/productModel');

const createCheckoutSession = async (req, res) => {
    const { cartItems } = req.body; // Expect an array of cart items
    // console.log("Received cart items:", cartItems);

    try {
        const lineItems = await Promise.all(
            cartItems.map(async (item) => {
                const product = await ProductModel.findById(item.productId);

                if (!product) {
                    throw new Error(
                        `Product with ID ${item.productId} not found`
                    );
                }

                const unitAmount = Number(product.price) * 100; // Ensure price is a number and convert to cents
                const quantity = Number(item.quantity); // Ensure quantity is a number

                if (isNaN(unitAmount) || isNaN(quantity)) {
                    throw new Error(
                        `Invalid price or quantity for product ID: ${item.productId}`
                    );
                }

                // Assuming product.images is an array, we use the first image URL
                const productImage = Array.isArray(product.images)
                    ? product.images[0]
                    : product.images;

                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.title, // Assuming the product title is stored in product.title
                            images: [productImage], // Using the first image URL
                        },
                        unit_amount: unitAmount,
                    },
                    quantity: quantity,
                };
            })
        );

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/checkout/success`,
            // cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel`,
            cancel_url: `${process.env.FRONTEND_URL}/`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = createCheckoutSession;
