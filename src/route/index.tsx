import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../components/common/Loading";
import PrivateRoute from "./PrivateRoute";
const Report = lazy(() => import("../components/report"));
const PurchaseBill = lazy(() => import("../components/purchaseBill"));
const Company = lazy(() => import("../components/company"));
const CreateCompanyForm = lazy(
  () =>
    import(
      "../components/conditionalCompanyForm/subComponents/CreateCompanyForm"
    )
);
const ConditionalCompanyForm = lazy(
  () => import("../components/conditionalCompanyForm")
);
const VerifyEmail = lazy(
  () => import("../components/login/subComponents/VerifyEmail")
);
const TaxInvoiceTest = lazy(
  () => import("../components/salesHistory/subComponents/TaxInvoiceTest")
);
const SalesHistory = lazy(() => import("../components/salesHistory"));
const Login = lazy(() => import("../components/login"));
const Signup = lazy(() => import("../components/login/subComponents/Signup"));
const CreateInvoice = lazy(() => import("../components/createInvoice"));
const Customer = lazy(() => import("../components/customer"));
const Item = lazy(() => import("../components/item"));

const BillingAddressForm = lazy(
  () => import("../components/billingAddressForm")
);
const BillingHistory = lazy(() => import("../components/billingHistory"));
const ForgotPassword = lazy(
  () => import("../components/login/subComponents/ForgotPassword")
);
const ResetPassword = lazy(
  () => import("../components/login/subComponents/ResetPassword")
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/test",
        element: <h1 style={{ textAlign: "center" }}>Coming Soon...</h1>,
      },
      {
        path: "/customer",
        element: (
          <Suspense fallback={<Loading />}>
            <Customer />
          </Suspense>
        ),
      },
      {
        path: "/item",
        element: (
          <Suspense fallback={<Loading />}>
            <Item />
          </Suspense>
        ),
      },
      {
        path: "/company",
        element: (
          <Suspense fallback={<Loading />}>
            <Company />
          </Suspense>
        ),
      },

      {
        path: "/create-invoice",
        element: (
          <Suspense fallback={<Loading />}>
            <CreateInvoice />
          </Suspense>
        ),
      },
      {
        path: "/billing-history",
        element: (
          <Suspense fallback={<Loading />}>
            <BillingHistory />
          </Suspense>
        ),
      },
      {
        path: "/sales-history",
        element: (
          <Suspense fallback={<Loading />}>
            <SalesHistory />
          </Suspense>
        ),
      },
      {
        path: "/purchase-bill",
        element: (
          <Suspense fallback={<Loading />}>
            <PurchaseBill />
          </Suspense>
        ),
      },
      {
        path: "/billing-address-form",
        element: (
          <Suspense fallback={<Loading />}>
            <BillingAddressForm />
          </Suspense>
        ),
      },
      {
        path: "/report",
        element: (
          <Suspense fallback={<Loading />}>
            <Report />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<Loading />}>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <Suspense fallback={<Loading />}>
        <ForgotPassword />
      </Suspense>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <Suspense fallback={<Loading />}>
        <ResetPassword />
      </Suspense>
    ),
  },
  {
    path: "/verify-email",
    element: (
      <Suspense fallback={<Loading />}>
        <VerifyEmail />
      </Suspense>
    ),
  },
  {
    path: "/conditional-company-form",
    element: (
      <Suspense fallback={<Loading />}>
        <ConditionalCompanyForm />
      </Suspense>
    ),
  },
  {
    path: "/create-company-form",
    element: (
      <Suspense fallback={<Loading />}>
        <CreateCompanyForm />
      </Suspense>
    ),
  },
  {
    path: "/tax-invoice-test",
    element: (
      <Suspense fallback={<Loading />}>
        <TaxInvoiceTest />
      </Suspense>
    ),
  },
]);

export default appRouter;
