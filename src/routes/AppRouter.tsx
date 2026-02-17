import { BrowserRouter, Route, Routes } from "react-router-dom";

import ExecutiveOverview from "../pages/Executive";
import Dashboard from "../pages/operations";
import AlertsTasksScreen from "../pages/Alerts & Tasks";
import UsersScreen from "../pages/users";
import AdminQuotes from "../pages/Quotes";
import PolicyAdminScreen from "../pages/policysearch";
import RolesPermissionsManager from "../pages/roles & permision";
import AccessReviewScreen from "../pages/access review";
import AuditTrailScreen from "../pages/audit trail";
import VerificationQueue from "../pages/verification";
import ManualReviewScreen from "../pages/manualreview";
import Rules from "../pages/rules";
import KYCReportsScreen from "../pages/reports";
import ProductVersionExplainer from "../pages/products";
import ProductConfigurationPage from "../pages/coverages";
import FormsDisclosuresOverview from "../pages/forms";
import DocumentTemplatesPage from "../pages/templates";
import AvailabilityPage from "../pages/availability";
import PolicyDetailsPage from "../pages/details";
import PolicyDocumentsPage from "../pages/Policy Documents page";
import LeadSourcePage from "../pages/lead source";
import ClaimsRecoveriesScreen from "../pages/claims-recoveries";
import InsurancePolicyActionsPage from "../pages/actions";
import BeneficiariesPage from "../pages/Beneficiaries";
import AssetsPage from "../pages/Assets";
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
import FNOLIntakeScreen from "../pages/claims-fnol";
import ClaimsQueuesScreen from "../pages/claims-queues";
import ClaimsAssignmentsScreen from "../pages/claims-assignments";
import ClaimsPaymentsScreen from "../pages/claims-payments";
import ClaimsReportScreen from "../pages/claims-report";
import ClaimsWorkbenchesScreen from "../pages/claims-workbenches";
import ProviderCoordinationScreen from "../pages/claims-providers";
import RecoveriesSubrogationScreen from "../pages/claims-recoveries";
import QualityLeakageScreen from "../pages/claims-quality";

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
        <Route path="/policies/details" element={<PolicyDetailsPage />} />
        <Route path="/policies/documents" element={<PolicyDocumentsPage />} />
        <Route path="/quotes/sources" element={<LeadSourcePage />} />
        <Route path="/quotes/recovery" element={<ClaimsRecoveriesScreen />} />
        <Route path="/policies/actions" element={<InsurancePolicyActionsPage />} />
        <Route path="/policies/beneficiaries" element={<BeneficiariesPage />} />
        <Route path="/policies/assets" element={<AssetsPage />} />

        {/* Claims Routes */}
        <Route path="/claims/fnol" element={<FNOLIntakeScreen />} />
        <Route path="/claims/queues" element={<ClaimsQueuesScreen />} />
        <Route
          path="/claims/assignments"
          element={<ClaimsAssignmentsScreen />}
        />
        <Route
          path="/claims/workbenches"
          element={<ClaimsWorkbenchesScreen />}
        />
        <Route
          path="/claims/providers"
          element={<ProviderCoordinationScreen />}
        />
        <Route path="/claims/payments" element={<ClaimsPaymentsScreen />} />
        <Route
          path="/claims/recoveries"
          element={<RecoveriesSubrogationScreen />}
        />
        <Route path="/claims/quality" element={<QualityLeakageScreen />} />
        <Route path="/claims/reports" element={<ClaimsReportScreen />} />

        <Route path="/users/roles" element={<RolesPermissionsManager />} />
        <Route path="/users/reviews" element={<AccessReviewScreen />} />
        <Route path="/users/audit" element={<AuditTrailScreen />} />
        <Route path="/kyc/queue" element={<VerificationQueue />} />
        <Route path="/kyc/review" element={<ManualReviewScreen />} />
        <Route path="/kyc/rules" element={<Rules />} />
        <Route path="/kyc/reports" element={<KYCReportsScreen />} />
        <Route path="/products" element={<ProductVersionExplainer />} />
        <Route path="/products/coverages" element={<ProductConfigurationPage />} />
        <Route path="/forms" element={<FormsDisclosuresOverview />} />
        <Route path="/products/templates" element={<DocumentTemplatesPage />} />
        <Route path="/products/availability" element={<AvailabilityPage />} />
        <Route path="/reporting/kpis" element={<PortfolioKPIsScreen />} />
        <Route path="/reporting/claims" element={<ClaimsAnalyticsScreen />} />
        <Route path="/reporting/sales" element={<SalesFunnelScreen />} />
        <Route
          path="/reporting/customers"
          element={<CustomerAnalyticsScreen />}
        />
        <Route
          path="/reporting/operational"
          element={<OperationalReportsScreen />}
        />
        <Route
          path="/reporting/regulatory"
          element={<RegulatoryReportsScreen />}
        />
        <Route path="/reporting/exports" element={<DataExportsScreen />} />
        <Route path="/system/status" element={<SystemStatusScreen />} />
        <Route path="/system/jobs" element={<SystemJobsScreen />} />
        <Route path="/system/logs" element={<SystemLogsScreen />} />
        <Route path="/system/backups" element={<SystemBackupsScreen />} />
        <Route path="/system/releases" element={<SystemReleasesScreen />} />
        <Route path="/system/config" element={<SystemConfigScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
