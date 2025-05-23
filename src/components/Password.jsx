const getPasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  switch (strength) {
    case 5:
      return "Strong";
    case 4:
      return "Good";
    case 3:
      return "Moderate";
    case 2:
      return "Weak";
    default:
      return "Very Weak";
  }
};
export default getPasswordStrength;