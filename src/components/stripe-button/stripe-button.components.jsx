import React  from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51J1PfESA01u4tNiitpQ8gjQ1oD84h78otnBSjCo0h3ZPTMCDo8l7FbwZsKMWo0p2Wo59K436uLmk8IigLLNelbNw00IxldGhzz';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='CRWN Clothing'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/en/f3eb2117da'
            description={`Your total is $${price}`}
            amount={ priceForStripe }
            panelLabel='Pay Now'
            token={ onToken }
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;
