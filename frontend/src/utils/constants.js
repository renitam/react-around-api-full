import success from '../images/success.svg';
import failure from '../images/failure.svg';

export const registrationStatuses = [
  {
    key: 1,
    status: 'Success! You have now been registered.',
    image: success,
    alt: 'black checkmark in circle'
  },
  {
    key: 2,
    status: 'Oops, something went wrong! Please try again.',
    image: failure,
    alt: 'red x in circle'
  }
]