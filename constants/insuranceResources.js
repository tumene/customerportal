import { groupArrayBy } from "../utils/dataTypes";

export const PAYMENT_FREQUENCIES = [
  // {
  //   name: "Weekly",
  //   id: 4,
  // },
  {
    name: "Monthly",
    id: 1,
  },
  {
    name: "Quarterly",
    id: 2,
  },
  {
    name: "Semi Annually",
    id: 5,
  },
  {
    name: "Annually",
    id: 3,
  },
];

export const PAYMENT_FREQUENCIES_BY_NAME = groupArrayBy(
  PAYMENT_FREQUENCIES,
  "name"
);

export const MAP_EDUCATION_POLICY_PRODUCT_TO_ID = {
  "sum-assured": 0,
  premium: 1,
};

export const MAP_EDUCATION_POLICY_PRODUCT_TO_LABEL = {
  "sum-assured": "Target Fund Value",
  premium: "Target Investment Premium",
};

export const DATE_FORMAT = "YYYY-MM-DD";

export const MAP_ROLE_TO_LABEL = {
  RETAIL_CUSTOMER: "Personal",
  SME_CUSTOMER: "Corporate/SME",
};
