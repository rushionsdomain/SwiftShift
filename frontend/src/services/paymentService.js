export const paymentService = {
  processPayment: (amount, method) => {
    console.log(`Processing ${method} payment for amount: ${amount}`);
    return true;
  },
};
