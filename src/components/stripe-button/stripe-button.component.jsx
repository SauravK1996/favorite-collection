import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HojN3CCTWkZKOeSHKXiGc97ncoadiKZDO4e4BlE0za2IoeUrjPi9ZJ6drEcFyeMypFCBNGt9Ijp1tup5LO6NK6Y006oYDU6tb';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
            label="Pay Now"
            name="Favorite Collection Ltd."
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            currency="INR"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;