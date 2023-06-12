/* eslint-disable import/prefer-default-export */
import * as yup from "yup";
import valid from 'card-validator'
import { businessDetailsRegister } from "services/Authentication.Services";

// Validation for specific fields
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// eslint-disable-next-line arrow-body-style
const emailValidation = () => {
  return yup.string("Enter your email").email("Enter a valid email").required("Email is required");
};

// eslint-disable-next-line arrow-body-style
const passwordValidation = () => {
  return yup
    .string("Enter your password")
    .min(7, "minimum 7 characters")
    .required("Password is required")
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      "Must Contain One Special Case Character"
    )
};

// eslint-disable-next-line arrow-body-style
const firstNameValidation = () => {
  return yup
    .string("Enter your First Name")
    .min(3, "minimum 3 characters")
    .required("First Name is required");
};

const cardHolderNameValidation = () => {
  return yup
    .string("Enter your Card Holder's Name")
    .min(3, "minimum 3 characters")
    .required("Card Holder's Name is required");
};

// eslint-disable-next-line arrow-body-style
const phoneNumberValidation = () => {
  return yup
    .string()
    // .matches(phoneRegExp, "Phone number is not valid")
    // .min(10, "invalid Number")
    // .max(10, "invalid Number")
    .required("Phone Number is required");
};

// eslint-disable-next-line arrow-body-style
const lastNameValidation = () => {
  return yup
    .string("Enter your Last_Name")
    .min(3, "minimum 3 characters length")
    .required("Last Name is required");
};

// eslint-disable-next-line arrow-body-style
const companyNameValidation = () => {
  return yup
    .string("Enter your Company Name")
    .required("Company Name is required");
};
const confirmPasswordValidation = (password) => {
  return yup
    .string()
    .oneOf([yup.ref(password), null], 'Passwords must match')
    .required();
};

const companyUSPsValidation = () => {
  return yup
    .string("Enter your Company USPs")
    .required("USPs is required");
};

// eslint-disable-next-line arrow-body-style
const addressValidation = () => {
  return yup
    .string("Enter your Address")
    .required("Address is required");
};

// eslint-disable-next-line arrow-body-style
const cityValidation = () => {
  return yup
    .string("Enter your City")
    .min(4, "minimum 4 characters")
    .required("City is required");
};

// eslint-disable-next-line arrow-body-style
const countryValidation = () => {
  return yup
    .string("Enter your Country")
    .min(2, "minimum 2 characters")
    .required("Country is required");
};

// eslint-disable-next-line arrow-body-style
const postCodeValidation = () => {
  return yup
    .string("Enter your Post_Code")
    // .min(6, "minimum 6 characters")
    // .max(6, "maximum 6 characters")
    .required("Postcode is required");
};

const cardValidation = () => {
  return yup
    .string("Enter your Card Number")
    // .length(16, "Invalid Card Detail")
    .required("Card Number is required")
    .test({
      name: 'credit_card_validation',
      message: 'Invalid Card Detail',
      test: (cc_number) => valid.number(cc_number).isValid
    })
};

const expiryMonthValidation = () => {
  return yup
    .string("Enter your Expiry Month")
    .test({
      name: 'credit_card_validation',
      message: 'Invalid Month',
      test: (month) => valid.expirationMonth(month).isValid
    })
    .required("Expiry Month is required");
};

const expiryYearValidation = () => {
  return yup
    .string("Enter your Expiry Year")
    .test({
      name: 'credit_card_validation',
      message: 'Invalid Year',
      test: (year) => valid.expirationYear(year).isValid
    })
    .required("Expiry Year is required");
};

const cvcValidation = () => {
  return yup
    .string("Enter your Cvc")
    .length(3, "Invalid Cvc")
    .required("Cvc is required");
};

const amountValidation = () => {
  return yup
    .number("Enter amount")
    .min(500)
    .required("Amount is required")
}

const leadCostValidation = () => {
  return yup
    .number("Enter amount")
    .required("Lead Cost is required")
}

const businessOpeningHoursValidation = () => {
  return yup
    .string("Enter your Opening Hours")
    .required("Required");
}

const businessLogoValidation = () => {
  return yup
    .string("Attach Company Logo")
    .required("Required");
}


const totalValidation = () => {
  return yup
    .number("Enter your Lead cap value")
    .required("Required");
}

const monthlyLeadsvalidation = () => {
  return yup
    .number("Enter Month")
}

const weekLeadsvalidation = () => {
  return yup
    .number("Enter week")

}

const dailyLeadsvalidation = () => {
  return yup
    .number("Enter daily lead")

}

const leadScheduleLeadsvalidation = () => {
  return yup
    .array("Enter daily lead")
    .required("Required");
}

const postcodeTargettingLeadsvalidation = () => {
  return yup
    .string("Enter Postcode Targetting List")
    .required("Required");
}

// Validation schema for specific form

// eslint-disable-next-line arrow-body-style
// eslint-disable-next-line import/prefer-default-export
// eslint-disable-next-line arrow-body-style
export const signUpvalidationSchema = () => {
  return yup.object().shape({
    firstName: firstNameValidation(),
    lastName: lastNameValidation(),
    email: emailValidation(),
    password: passwordValidation(),
    confirmPassword: confirmPasswordValidation('password')
  });
};


export const businessDetailsValidationSchema = () => {
  return yup.object().shape({
    businessIndustry: companyNameValidation(),
    businessName: companyNameValidation(),
    businessSalesNumber: phoneNumberValidation(),
    businessAddress: addressValidation(),
    businessCity: cityValidation(),
    businessCountry: countryValidation(),
    businessPostCode: postCodeValidation(),
    // businessOpeningHours: businessOpeningHoursValidation(),
    // businessLogo: businessLogoValidation(),
  });
}

export const leadDetailsInvalidationSchema = () => {
  return yup.object().shape({
    total: totalValidation(),
    monthly: monthlyLeadsvalidation(),
    weekly: weekLeadsvalidation(),
    daily: dailyLeadsvalidation(),
    // leadSchedule:leadScheduleLeadsvalidation(),
    postcodeTargettingList: postcodeTargettingLeadsvalidation(),
  });
};

// eslint-disable-next-line arrow-body-style
// eslint-disable-next-line import/prefer-default-export
// eslint-disable-next-line arrow-body-style
export const signInvalidationSchema = () => {
  return yup.object().shape({
    email: emailValidation(),
    password: passwordValidation(),
  });
};

export const creditCardvalidationSchema = () => {
  return yup.object().shape({
    cardHolderName: cardHolderNameValidation(),
    cardNumber: cardValidation(),
    expiryMonth: expiryMonthValidation(),
    expiryYear: expiryYearValidation(),
    cvc: cvcValidation(),
    // amount: amountValidation(),
  });
};

export const forgetPasswordInvalidationSchema = () => {
  return yup.object().shape({
    currentPassword: passwordValidation(),
    newPassword: passwordValidation(),
    confirmPassword: confirmPasswordValidation('newPassword')
  });
};

export const updateUserDetailsvalidationSchema = () => {
  return yup.object().shape({
    firstName: firstNameValidation(),
    lastName: lastNameValidation(),
    email: emailValidation(),
    // salesPhoneNumber: phoneNumberValidation(),
    // companyName: companyNameValidation(),
    // address: addressValidation(),
    // city: cityValidation(),
    // country: countryValidation(),
    // postCode: postCodeValidation(),
    // companyUSPs: companyUSPsValidation()
  });
};

export const updateAdminDetailsvalidationSchema = () => {
  return yup.object().shape({
    firstName: firstNameValidation(),
    lastName: lastNameValidation(),
    email: emailValidation(),

  });
};

export const adminUserUpdateValidationSchema = () => {
  return yup.object().shape({
    firstName: firstNameValidation(),
    lastName: lastNameValidation(),
    email: emailValidation(),
    businessSalesNumber: phoneNumberValidation(),
    businessName: companyNameValidation(),
    businessAddress: addressValidation(),
    businessCity: cityValidation(),
    businessCountry: countryValidation(),
    businessPostCode: postCodeValidation(),
    leadCost: leadCostValidation(),
  });
};
