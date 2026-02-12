import { BrowserRouter, Route, Routes } from "react-router-dom";

import ExecutiveOverview from "../pages/Executive";
import Dashboard from "../pages/operations";
import AlertsTasksScreen from "../pages/Alerts & Tasks";
import UsersScreen from "../pages/users";
import AdminQuotes from "../pages/Quotes";
import PolicyAdminScreen from "../pages/policysearch";
import AdminPaymentScreen from "../pages/payment";
import ClaimManagementScreen from "../pages/claims";
import RolesPermissionsManager from "../pages/roles & permision";
import AccessReviewScreen from "../pages/access review";
import AuditTrailScreen from "../pages/audit trail";
import VerificationQueue from "../pages/verification";
import ManualReviewScreen from "../pages/manualreview";
import Rules from "../pages/rules";
import KYCReportsScreen from "../pages/reports";
import PricingRates from "../pages/pricing-rates";
import PricingFactors from "../pages/pricing-factors";
import PricingExperiments from "../pages/pricing-experiments";
import PricingSimulation from "../pages/pricing-simulation";
import PricingVersioning from "../pages/pricing-versioning";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExecutiveOverview />} />
        <Route path="/dashboard/operational" element={<Dashboard />} />
        <Route path="/dashboard/alerts" element={<AlertsTasksScreen />} />
        <Route path="/users" element={<UsersScreen />} />
        <Route path="/quotes/monitor" element={<AdminQuotes />} />
        <Route path="/policies/search" element={<PolicyAdminScreen />} />
        <Route path="/claims/payments" element={<AdminPaymentScreen />} />
        <Route path="/claims/reports" element={<ClaimManagementScreen />} />
        <Route path="/users/roles" element={<RolesPermissionsManager />} />
        <Route path="/users/reviews" element={<AccessReviewScreen />} />
        <Route path="/users/audit" element={<AuditTrailScreen />} />
        <Route path="/kyc/queue" element={<VerificationQueue />} />
        <Route path="/kyc/review" element={<ManualReviewScreen />} />
        <Route path="/kyc/rules" element={<Rules />} />
        <Route path="/kyc/reports" element={<KYCReportsScreen />} />
        <Route path="/pricing/rates" element={<PricingRates />} />
        <Route path="/pricing/factors" element={<PricingFactors />} />
        <Route path="/pricing/experiments" element={<PricingExperiments />} />
        <Route path="/pricing/simulation" element={<PricingSimulation />} />
        <Route path="/pricing/versioning" element={<PricingVersioning />} />
      </Routes>
    </BrowserRouter>
  );
}
