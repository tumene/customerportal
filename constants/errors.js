import moment from "moment";

export const ERRORS = {
  // Form Input
  EMAIL_INVALID: "Email is not valid",
  EMAIL_REQUIRED: "Email is required",
  PHONE_INVALID: "Phone number is not valid",
  PHONE_REQUIRED: "Phone number is required",
  FIRST_NAME_REQUIRED: "First name is required",
  LAST_NAME_REQUIRED: "Last name is required",
  ONLY_LETTERS: "Only letters are allowed",
  ONLY_NUMBERS: "Only numbers are allowed",
  NUMBER_INVALID: "Number is not valid",
  ALPHA_LETTERS: "Only combinations of numbers and letters are allowed",
};

export const REGEX_VALIDATION = {
  NUMBER: /^[+]?([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/,
  // EMAIL:
  //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,

  LETTERS: /^[a-zA-Z]*$/,
  ALPHANUMERIC: /[a-z]/gi,
  ALPHANUMERIC_WITH_SPACE_OR_DASH: /^[a-zA-Z0-9- ]*$/,
  ALPHA_WITH_SPACE: /^[a-zA-Z\s]*$/,
};

export const REGEX_PATTERNS = {
  EMAIL: {
    value: REGEX_VALIDATION.EMAIL,
    message: ERRORS.EMAIL_INVALID,
  },
  NUMBER: {
    value: REGEX_VALIDATION.NUMBER,
    message: ERRORS.ONLY_NUMBERS,
  },
  LETTERS: {
    value: REGEX_VALIDATION.LETTERS,
    message: ERRORS.ONLY_LETTERS,
  },
  ALPHANUMERIC: {
    value: REGEX_VALIDATION.ALPHANUMERIC,
    message: ERRORS.ALPHA_LETTERS,
  },
  ALPHANUMERIC_WITH_SPACE_OR_DASH: {
    value: REGEX_VALIDATION.ALPHANUMERIC_WITH_SPACE_OR_DASH,
    message: ERRORS.ONLY_LETTERS,
  },
  ALPHA_WITH_SPACE: {
    value: REGEX_VALIDATION.ALPHA_WITH_SPACE,
    message: ERRORS.ONLY_LETTERS,
  },
};

export const generateMaxLength = (maxLength = 10) => {
  return {
    value: maxLength,
    message: `Cannot be greater than ${maxLength} characters`,
  };
};


export const getYearDiffWithMonth =(endDate)=>{
  
  var ageDifMs = Date.now() - endDate;
  return moment(endDate, "YYYYMMDD").fromNow().replace("years ago","");
  
    ;

}