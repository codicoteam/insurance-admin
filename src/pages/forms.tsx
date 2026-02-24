import {
  FileText,
  Shield,
  AlertCircle,
  CheckCircle,
  Info,
  ArrowRight,
  Users,
  Heart,
  DollarSign,
  Clock,
  Lock,
  BookOpen,
  Layers,
} from "lucide-react";

export default function FormsDisclosuresOverview() {
  const formsUseCases = [
    { icon: Users, text: "Gather customer details" },
    { icon: Heart, text: "Record beneficiary information" },
    { icon: Shield, text: "Capture health or risk data" },
    { icon: FileText, text: "Define policy terms" },
    { icon: CheckCircle, text: "Process policy changes" },
    { icon: DollarSign, text: "Process claims" },
  ];

  const commonForms = [
    "Application form",
    "Beneficiary designation",
    "Change of address",
    "Claim form",
    "Replacement form",
  ];

  const disclosureItems = [
    { icon: AlertCircle, text: "Exclusions", color: "text-red-600" },
    { icon: Shield, text: "Limitations", color: "text-orange-600" },
    { icon: Clock, text: "Waiting periods", color: "text-amber-600" },
    { icon: DollarSign, text: "Surrender charges", color: "text-purple-600" },
    { icon: Lock, text: "Privacy practices", color: "text-blue-600" },
    { icon: Info, text: "How premiums may change", color: "text-green-600" },
  ];

  const policyStructure = [
    {
      label: "Product",
      description: "the plan",
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Version",
      description: "edition of the plan",
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Coverage",
      description: "protection provided",
      color: "from-green-500 to-green-600",
    },
    {
      label: "Rider",
      description: "optional extra",
      color: "from-orange-500 to-orange-600",
    },
    {
      label: "Forms",
      description: "paperwork to enroll or manage",
      color: "from-pink-500 to-pink-600",
    },
    {
      label: "Disclosures",
      description: "legal explanations to the customer",
      color: "from-teal-500 to-teal-600",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      {/* Top title bar */}
      <div className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Forms & Disclosures
              </h1>
              <p className="text-sm text-gray-600">
                Essential documentation for operations and compliance
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Page body */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* ========== FORMS ========== */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Forms</h2>
          </div>

          <p className="text-gray-700 mb-6">
            A <span className="font-semibold text-blue-600">form</span> is an
            official document used to collect information or define part of the
            insurance contract. Approved forms are required to issue and manage
            policies.
          </p>

          <h3 className="font-semibold text-gray-900 mb-3">
            What forms are used for
          </h3>
          <div className="grid md:grid-cols-2 gap-3 mb-6">
            {formsUseCases.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
                >
                  <Icon className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-800">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>

          <h3 className="font-semibold text-gray-900 mb-3">Common examples</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {commonForms.map((form, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-white border border-blue-200 rounded-lg text-sm"
              >
                {form}
              </span>
            ))}
          </div>

          <div className="flex items-start gap-3 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-lg">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            <p className="text-amber-800 text-sm">
              Without the correct forms, a policy usually cannot be issued.
            </p>
          </div>
        </div>

        {/* ========== DISCLOSURES ========== */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900">Disclosures</h2>
          </div>

          <p className="text-gray-700 mb-6">
            A <span className="font-semibold text-purple-600">disclosure</span>{" "}
            is information the insurer must provide to ensure transparency about
            coverage, costs, risks, and rights.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {disclosureItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <Icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-sm font-medium text-gray-800">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========== EXAMPLE ========== */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-gray-900">Example</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Form</h3>
              <p className="text-sm text-blue-800">
                Customer completes an application with personal and health
                information.
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-2">Disclosure</h3>
              <p className="text-sm text-purple-800">
                Company explains exclusions, clauses, and fees before the policy
                is finalized.
              </p>
            </div>
          </div>

          <div className="hidden lg:flex justify-center my-4">
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* ========== STRUCTURE ========== */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Layers className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Where this fits in the policy structure
            </h2>
          </div>

          <div className="space-y-2">
            {policyStructure.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div
                  className={`px-3 py-1 text-white text-sm font-semibold rounded bg-gradient-to-r ${item.color}`}
                >
                  {item.label}
                </div>
                <span className="text-gray-700 text-sm">
                  = {item.description}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              Products, versions, coverages, and riders define protection.
              <strong> Forms and disclosures</strong> make the transaction
              compliant and transparent.
            </p>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 pt-4">
          Part of your onboarding training materials • Insurance Operations
        </div>
      </div>
    </div>
  );
}
