import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ConditionalCompanyForm = () => {
  const [companyExistingFlag, setCompanyExistingFlag] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      console.log(
        "token before get-company-existing-flag",
        sessionStorage.getItem("loginToken")
      );
      const response = await axios.get(
        "https://d2nxa7pir92htg.cloudfront.net/company/get-company-existing-flag",
        {
          params: {
            token: sessionStorage.getItem("loginToken"),
            sample_data: "123",
          },
        }
      );
      sessionStorage.setItem(
        "CompanyExistingFlag",
        response.data.company_existing
      );
      setCompanyExistingFlag(response.data.company_existing);
    };
    fetchData();
  }, []);

  return companyExistingFlag === "Y"
    ? companyExistingFlag && <Navigate to="/test" />
    : companyExistingFlag && <Navigate to="/create-company-form" />;
};

export default ConditionalCompanyForm;
