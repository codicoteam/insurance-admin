import React from "react";
import {
  ChevronRight,
  Edit,
  Eye,
  Plus,
  Shield,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Info,
  Layers,
  Settings,
} from "lucide-react";

// TypeScript Interfaces
interface ProductVersion {
  productName: string;
  version: string;
  status: "Draft" | "Active" | "Archived";
  effectiveDate: string;
  lastUpdated: string;
}

interface Coverage {
  id: string;
  name: string;
  type: string;
  limit: string;
  included: boolean;
}

interface Rider {
  id: string;
  name: string;
  category: string;
  priceImpact: string;
  priceType: "Flat" | "Percentage";
  underwritingRequired: boolean;
}

const ProductConfigurationPage: React.FC = () => {
  // Mock Data
  const productInfo: ProductVersion = {
    productName: "Term Life Insurance",
    version: "Version 2024",
    status: "Active",
    effectiveDate: "2024-01-01",
    lastUpdated: "2024-01-15",
  };

  const baseCoverages: Coverage[] = [
    {
      id: "cov-001",
      name: "Death Benefit",
      type: "Primary Coverage",
      limit: "$100,000",
      included: true,
    },
    {
      id: "cov-002",
      name: "Terminal Illness Benefit",
      type: "Accelerated Benefit",
      limit: "Up to 50%",
      included: true,
    },
    {
      id: "cov-003",
      name: "Medical Costs Coverage",
      type: "Healthcare",
      limit: "$25,000 annually",
      included: true,
    },
    {
      id: "cov-004",
      name: "Property Damage",
      type: "Liability",
      limit: "$50,000",
      included: true,
    },
  ];

  const availableRiders: Rider[] = [
    {
      id: "rid-001",
      name: "Critical Illness Rider",
      category: "Health",
      priceImpact: "+$45/month",
      priceType: "Flat",
      underwritingRequired: true,
    },
    {
      id: "rid-002",
      name: "Accidental Death & Dismemberment",
      category: "Death Benefit",
      priceImpact: "+15%",
      priceType: "Percentage",
      underwritingRequired: false,
    },
    {
      id: "rid-003",
      name: "Waiver of Premium",
      category: "Premium Protection",
      priceImpact: "+$12/month",
      priceType: "Flat",
      underwritingRequired: true,
    },
    {
      id: "rid-004",
      name: "Child Term Rider",
      category: "Family",
      priceImpact: "+$18/month",
      priceType: "Flat",
      underwritingRequired: false,
    },
    {
      id: "rid-005",
      name: "Return of Premium",
      category: "Investment",
      priceImpact: "+35%",
      priceType: "Percentage",
      underwritingRequired: true,
    },
  ];

  const getStatusBadge = (status: ProductVersion["status"]) => {
    const styles = {
      Draft: "bg-yellow-100 text-yellow-800 border-yellow-300",
      Active: "bg-green-100 text-green-800 border-green-300",
      Archived: "bg-gray-100 text-gray-800 border-gray-300",
    };
    const icons = { Draft: Clock, Active: CheckCircle, Archived: AlertCircle };
    const Icon = icons[status];

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${styles[status]}`}
      >
        <Icon className="w-4 h-4" />
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      {/* Page header */}
      <div className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Product Configuration
              </h1>
              <p className="text-sm text-gray-600">
                Manage coverages and riders for this version
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Workspace */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500">
          <a href="#" className="hover:text-blue-600">
            Products
          </a>
          <ChevronRight className="w-4 h-4 mx-2" />
          <a href="#" className="hover:text-blue-600">
            Term Life
          </a>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">Version 2024</span>
        </nav>

        {/* Product Info */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Product Information
              </h2>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
              <Edit className="w-4 h-4" />
              Edit Details
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <InfoItem label="Product Name" value={productInfo.productName} />
            <InfoItem label="Version" value={productInfo.version} />
            <div>
              <label className="text-sm font-medium text-gray-500 block mb-1">
                Status
              </label>
              {getStatusBadge(productInfo.status)}
            </div>
            <InfoItem
              label="Effective Date"
              value={new Date(productInfo.effectiveDate).toLocaleDateString()}
            />
            <InfoItem
              label="Last Updated"
              value={new Date(productInfo.lastUpdated).toLocaleDateString()}
            />
          </div>
        </div>

        {/* Base Coverages */}
        <TableSection
          icon={FileText}
          iconColor="text-purple-600"
          title="Base Coverages"
          badge={`${baseCoverages.length} coverages`}
          buttonLabel="Add Coverage"
        >
          {baseCoverages.map((cov) => (
            <tr key={cov.id} className="hover:bg-blue-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold">{cov.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{cov.type}</td>
              <td className="px-6 py-4 font-medium">{cov.limit}</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  <CheckCircle className="w-3 h-3" /> Yes
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <IconButtons />
              </td>
            </tr>
          ))}
        </TableSection>

        {/* Riders */}
        <TableSection
          icon={Layers}
          iconColor="text-blue-600"
          title="Available Riders"
          badge="Optional Add-ons"
          buttonLabel="Add Rider"
        >
          {availableRiders.map((rider) => (
            <tr key={rider.id} className="hover:bg-blue-50">
              <td className="px-6 py-4 font-semibold">{rider.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {rider.category}
              </td>
              <td className="px-6 py-4 font-medium">{rider.priceImpact}</td>
              <td className="px-6 py-4">
                {rider.underwritingRequired ? (
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                    Yes
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    No
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <IconButtons />
              </td>
            </tr>
          ))}
        </TableSection>

        {/* Structure */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-1" />
            <p className="text-gray-700">
              A product contains multiple versions. Each version defines base
              coverages and optional riders.
            </p>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="flex justify-end gap-4">
          <button className="px-6 py-2 border rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

/* Small reusable helpers */
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="text-sm font-medium text-gray-500 block mb-1">
      {label}
    </label>
    <p className="font-semibold text-gray-900">{value}</p>
  </div>
);

const IconButtons = () => (
  <div className="flex items-center justify-end gap-2">
    <button className="p-2 hover:bg-blue-100 rounded-lg">
      <Eye className="w-4 h-4 text-gray-600" />
    </button>
    <button className="p-2 hover:bg-blue-100 rounded-lg">
      <Edit className="w-4 h-4 text-gray-600" />
    </button>
  </div>
);

const TableSection = ({
  icon: Icon,
  iconColor,
  title,
  badge,
  buttonLabel,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  title: string;
  badge: string;
  buttonLabel: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-blue-100">
    <div className="p-6 border-b border-blue-100 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
          {badge}
        </span>
      </div>
      <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        <Plus className="w-4 h-4" />
        {buttonLabel}
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full">
        <tbody className="divide-y divide-blue-50">{children}</tbody>
      </table>
    </div>
  </div>
);

export default ProductConfigurationPage;
