import React, { useEffect } from 'react';
import {PayPalButtons,PayPalScriptProvider} from '@paypal/react-paypal-js';

const Paymentbutton = ({totalprice,hundelinvoiceOpen}) => {
  const handleCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalprice, // The amount of the transaction
            currency_code: 'USD', // The currency of the transaction
          },
        },
      ],
    });
  };

  const handleOnApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      console.log(details);
      hundelinvoiceOpen()
    });
  };


 

  return (

    <PayPalScriptProvider options={{clientId:"ATyE60TrJ3ab2vKGUZ1a_T4CDAec1gTKZ5t9Ct6wmxyV_w3-EolztutFQ0k9_rwpnxmk9xRtyI4PoP2f"}}>
  <PayPalButtons

 createOrder={handleCreateOrder}
    onApprove={handleOnApprove}
    

    style={
      {layout:"horizontal"}
    }
    >  </PayPalButtons>
    </PayPalScriptProvider>
  
  );
};

export default Paymentbutton;
