import { FC } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../components/layout";

const PrivateRoute: FC = () => {
  const loginToken = sessionStorage.getItem("loginToken");

  const companyExistingFlag = sessionStorage.getItem("CompanyExistingFlag");

  return loginToken ? (
    companyExistingFlag === "Y" ? (
      <Layout />
    ) : (
      <Navigate to="/create-company-form" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
