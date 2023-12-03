
import React from 'react';

// prompted with 'What can I help you with today?'
const welcomeRepo = [
  'Registration',
  'Login',
  'Shopping Cart',
  'Checkout',
  'Order Status',
  'Vehicles'
];

// prompted with 'What would you like to do regarding ____?'
const questionMap = {
  'Registration': [ 
    'I would like to register an account.',
  ],
  'Login': [
    'I would like to login.'
  ],
  'Shopping Cart': [
    'I would like to go to my shopping cart.',
    'I would like to add a vehicle to my shopping cart.',
  ],
  'Checkout': [
    'I would like to checkout.',
  ],
  'Order Status': [
    'I would like to view the status of an order.',
  ],
  'Vehicles': [
    'I would like some recommendations regarding my vehicle purchase.', 
    'I would like to see what vehicles are available.',
  ]
}

const answerMap = {
  'I would like to register an account.': () => <span>Please follow this <a href='/register'>link</a>.</span>,
  'I would like to login.': () => <span>Please follow this <a href='/login'>link</a>.</span>,
  'I would like to go to my shopping cart.': () => <span>Please follow this <a href='/cart'>link</a>.</span>,
  'I would like to add a vehicle to my shopping cart.': () => <span>Please go to the <a href='/catalog'>catalog</a>, select a vehicle, and then click the 'Add to Cart' button.</span>,
  'I would like to checkout.': () => <span>Please follow this <a href='/cart'>link</a> to go to your shopping cart then click the 'Proceed to Checkout' button.</span>,
  'I would like to view the status of an order.': () => <span>Please navigate to the URL '/orders/(yourOrderNumber)'</span>,
  'I would like some recommendations regarding my vehicle purchase.': () => <span>Please follow this <a href='/vehicles/recommendations'>link</a>.</span>, 
  'I would like to see what vehicles are available.': () => <span>Please follow this <a href='/catalog'>link</a>.</span>, 
};

const additionalQuestionMap = {

}

const finalUserResponse = [
  'Thank you.',
  'I have another question.'
]



export const getWelcome = () => {
  return {
    text: () => 'Hello. How can I help you today?',
    choices: welcomeRepo, 
  };
}



export const getReply = (question, choice) => {
  console.log(question);

  let text;
  let choices;
  const re1 = /How can I help you/;
  if(re1.test(question)) {
    text = () => `What would you like to do regarding ${choice}?`;
    choices = questionMap[choice];
  }

  const re2 = /What would you like to do regarding/;
  if(re2.test(question)) {
    text = answerMap[choice];
    choices = finalUserResponse;
  }

  if(finalUserResponse.includes(choice)) {
    return {
      text: () => 'No problem. How can I help you today?',
      choices: welcomeRepo, 
    };
  }

  return {
    text,
    choices, 
  };
}





