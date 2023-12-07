import { FiDownload } from "react-icons/fi"; 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from '../../../hookes/cookiesfun';
import html2pdf from 'html2pdf.js';
 
const Invoice = ({ products, totalprice }) => {
  const [useinfo, setuseinfo] = useState('');

  useEffect(() => {
    axios.post('http://localhost:8000/artist/profile', { token: getCookie('usertoken') })
      .then((response) => {
        setuseinfo(response.data.user);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, []); // Empty dependency array

  const downloadInvoice = async () => {
    const element = document.getElementById('invoice-container');

    const options = {
      filename: Date.now()+'_invoice.pdf',
      margin: 0,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1, scrollY: 0 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  // Generate the PDF
  html2pdf().set(options).from(element).save();
  };

  return (
    <>
      <button className="bg-blue-500 text-white py-2 px-4 mt-4" onClick={downloadInvoice}>
        Download as PDF <FiDownload /> 
      </button>
      <div id="invoice-container" className="mx-auto mt-10 p-8 bg-gray-100 shadow-md max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Invoice</h2>
        <div className="flex justify-between mb-4">
          <div>
            <p className="font-semibold">Invoice Date:</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-semibold">Due Date:</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <div className="border-t border-b my-4 py-2">
          {products.map((product, index) => (
            <p key={index}>
              {product.name} {product.price}
            </p>
          ))}
        </div>
        <div className="flex justify-between mb-4">
          {/* Additional details if needed */}
        </div>
        <div className="flex justify-between mb-4">
          <div>
            <p className="font-semibold">Total:</p>
            <p>{totalprice}</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="font-semibold mb-2">Payment Details:</p>
          <p>Paypal</p>
          <p>Account Name: {useinfo && useinfo.name}</p>
          <p>Account email:  {useinfo && useinfo.email}</p>
          <p>Payment Reference: Invoice #123</p>
        </div>
      </div>
    </>
  );
};

export default Invoice;
