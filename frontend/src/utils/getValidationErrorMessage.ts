const getValidationErrorMessage = (err: {
  tag: 'url' | 'required' | 'email';
}) => {
  switch (err.tag) {
    case 'url':
      return 'Must be a valid URL';
    case 'required':
      return 'This field is required';
    case 'email':
      return 'Must be a valid email';
    default:
      return 'Invalid value';
  }
};

export default getValidationErrorMessage;
