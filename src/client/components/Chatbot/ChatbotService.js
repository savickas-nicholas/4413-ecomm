
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
    'I would like to compare multiple vehicles.',
  ]
}

const answerMap = {
  'I would like to register an account.': '',
  'I would like to login.': '',
  'I would like to go to my shopping cart.': '',
  'I would like to add a vehicle to my shopping cart.': '',
  'I would like to checkout.': '',
  'I would like to view the status of an order.': '',
  'I would like some recommendations regarding my vehicle purchase.': '', 
  'I would like to see what vehicles are available.': '',
  'I would like to compare multiple vehicles.': '',
};


export const getWelcome = () => {
  return {
    text: 'Hello. How can I help you today?',
    choices: welcomeRepo, 
  };
}

export const getReply = (question, choice) => {
  console.log(question);

  let text;
  let choices;
  if(question === 'Hello. How can I help you today?') {
    text = `What would you like to do regarding ${choice}?`;
    choices = questionMap[choice];
  }

  return {
    text,
    choices, 
  };
}





