import { config } from "dotenv";

try {
  config({
    path: "./.env",
  });
} catch (error) {
  console.log("Error File Not Found : " + error);
}

const configENV = {
  local: {
    BACKEND_URL: "http://localhost:3000/api/v1/customer",
  },
  development: {
    BACKEND_URL: `https://api-staging.drivethroughu.com/api/v1/customer`,
  },
  staging: {
    BACKEND_URL: `https://api-staging.drivethroughu.com/api/v1/customer`,
  },
  production: {
    BACKEND_URL: `https://api-production.drivethroughu.com/api/v1/customer`,
  },
};

export const appVersion = "0.6.3";

export const getConfig = () => {
  console.log(configENV[import.meta.env.VITE_ENVIRONMENT] || configENV.local);
  const env = configENV[import.meta.env.VITE_ENVIRONMENT] || configENV.local;
  return env;
};

console.log(appVersion);
