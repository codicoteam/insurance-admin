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
import WelcomeScreen from "../pages/welcome";
import Layout from "../pages/welcomelayout";
import About from "../features/welcome/about";
import Services from "../features/welcome/services";
import Home from "../features/welcome/home";
import Contact from "../features/welcome/contact";
import Register from "../pages/register";
import Login from "../pages/login";
import PortfolioKPIsScreen from "../pages/reporting-kpis";
import ClaimsAnalyticsScreen from "../pages/reporting-claims";
import SalesFunnelScreen from "../pages/reporting-sales";
import CustomerAnalyticsScreen from "../pages/reporting-customers";
import OperationalReportsScreen from "../pages/reporting-operational";
import RegulatoryReportsScreen from "../pages/reporting-regulatory";
import DataExportsScreen from "../pages/reporting-exports";
import SystemStatusScreen from "../pages/system-status";
import SystemJobsScreen from "../pages/system-jobs";
import SystemLogsScreen from "../pages/system-logs";
import SystemBackupsScreen from "../pages/system-backups";
import SystemReleasesScreen from "../pages/system-releases";
import SystemConfigScreen from "../pages/system-config";

export default function AppRouter() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExecutiveOverview />} />
        <Route path="/dashboard/executive" element={<ExecutiveOverview />} />
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
        <Route path="/uyuyu" element={<WelcomeScreen />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reporting/kpis" element={<PortfolioKPIsScreen />} />
        <Route path="/reporting/claims" element={<ClaimsAnalyticsScreen />} />
        <Route path="/reporting/sales" element={<SalesFunnelScreen />} />
        <Route path="/reporting/customers" element={<CustomerAnalyticsScreen />} />
        <Route path="/reporting/operational" element={<OperationalReportsScreen />} />
        <Route path="/reporting/regulatory" element={<RegulatoryReportsScreen />} />
        <Route path="/reporting/exports" element={<DataExportsScreen />} />
        <Route path="/system/status" element={<SystemStatusScreen />} />
        <Route path="/system/jobs" element={<SystemJobsScreen />} />
        <Route path="/system/logs" element={<SystemLogsScreen />} />
        <Route path="/system/backups" element={<SystemBackupsScreen />} />
        <Route path="/system/releases" element={<SystemReleasesScreen />} />
        <Route path="/system/config" element={<SystemConfigScreen />} />
      </Routes>

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );

    </BrowserRouter>
  );
}
