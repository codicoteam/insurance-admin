'use client';

import React, { useState, useMemo } from 'react';
import {
  Car,
  Building2,
  Wrench,
  Briefcase,
  Search,
  Plus,
  Upload,
  Download,
  Edit,
  Trash2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Clock,
  Shield,
  DollarSign,
  MapPin,
  FileText,
  Hash,
  Calendar,
  SlidersHorizontal,
  Package,
  Activity,
  Zap,
  Filter,
  Info
} from 'lucide-react';
import InsuranceSidebar from '../Components/sidebar'; // Adjust the import path as needed

// ─── TypeScript Interfaces ────────────────────────────────────────────────────

interface Asset {
  id: string;
  policyId: string;
  type: 'Vehicle' | 'Property' | 'Equipment' | 'Commercial';
  name: string;
  description: string;
  insuredValue: number;
  purchaseDate: string;
  serialNumber: string;
  location: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  status: 'Active' | 'Expired' | 'Under Review' | 'Damaged';
}

interface AssetFormData {
  policyId: string;
  type: 'Vehicle' | 'Property' | 'Equipment' | 'Commercial';
  name: string;
  description: string;
  insuredValue: string;
  purchaseDate: string;
  serialNumber: string;
  location: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  status: 'Active' | 'Expired' | 'Under Review' | 'Damaged';
}

interface FormErrors {
  policyId?: string;
  name?: string;
  insuredValue?: string;
  location?: string;
  serialNumber?: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_ASSETS: Asset[] = [
  { id: 'AST-001', policyId: 'POL-001', type: 'Vehicle',    name: '2022 Tesla Model S',          description: 'Electric luxury sedan, full coverage',         insuredValue: 89000,   purchaseDate: '2022-03-15', serialNumber: '5YJSA1E26MF123456', location: 'New York, NY',    riskLevel: 'Low',    status: 'Active'       },
  { id: 'AST-002', policyId: 'POL-001', type: 'Property',   name: 'Manhattan Apartment',          description: '3-bed, 2-bath on 5th Ave',                     insuredValue: 1250000, purchaseDate: '2019-07-01', serialNumber: 'PROP-MN-00421',     location: 'New York, NY',    riskLevel: 'Medium', status: 'Active'       },
  { id: 'AST-003', policyId: 'POL-002', type: 'Vehicle',    name: '2021 BMW X5',                  description: 'SUV, comprehensive plan',                      insuredValue: 62000,   purchaseDate: '2021-11-20', serialNumber: '5UXCR6C05M9D23456', location: 'Los Angeles, CA', riskLevel: 'Low',    status: 'Active'       },
  { id: 'AST-004', policyId: 'POL-003', type: 'Equipment',  name: 'CNC Milling Machine',          description: 'Industrial precision equipment',               insuredValue: 145000,  purchaseDate: '2020-05-10', serialNumber: 'CNC-HVY-2020-7712', location: 'Chicago, IL',     riskLevel: 'High',   status: 'Under Review' },
  { id: 'AST-005', policyId: 'POL-003', type: 'Commercial', name: 'Retail Store – Chicago Loop',  description: 'Commercial premises, ground floor',            insuredValue: 890000,  purchaseDate: '2018-01-15', serialNumber: 'COMM-CHI-00115',    location: 'Chicago, IL',     riskLevel: 'Medium', status: 'Active'       },
  { id: 'AST-006', policyId: 'POL-004', type: 'Vehicle',    name: '2019 Ford F-150',              description: 'Fleet truck, liability + collision',           insuredValue: 38000,   purchaseDate: '2019-09-05', serialNumber: '1FTEW1E58KFB45678', location: 'Houston, TX',     riskLevel: 'Medium', status: 'Expired'      },
  { id: 'AST-007', policyId: 'POL-004', type: 'Property',   name: 'Houston Warehouse',            description: '20,000 sqft storage facility',                 insuredValue: 450000,  purchaseDate: '2017-06-30', serialNumber: 'PROP-HOU-00230',    location: 'Houston, TX',     riskLevel: 'High',   status: 'Active'       },
  { id: 'AST-008', policyId: 'POL-005', type: 'Equipment',  name: 'MRI Scanner – Model 3T',       description: 'Medical imaging equipment, clinic',            insuredValue: 1200000, purchaseDate: '2021-02-28', serialNumber: 'MRI-3T-2021-00891', location: 'Boston, MA',      riskLevel: 'High',   status: 'Active'       },
  { id: 'AST-009', policyId: 'POL-006', type: 'Vehicle',    name: '2023 Porsche 911',             description: 'Sports car, agreed value policy',              insuredValue: 115000,  purchaseDate: '2023-01-10', serialNumber: 'WP0AB2A96PS123789', location: 'Miami, FL',       riskLevel: 'Low',    status: 'Active'       },
  { id: 'AST-010', policyId: 'POL-007', type: 'Commercial', name: 'Seattle Office Complex',       description: '12-floor office building, downtown',           insuredValue: 4200000, purchaseDate: '2015-11-01', serialNumber: 'COMM-SEA-00078',    location: 'Seattle, WA',     riskLevel: 'Medium', status: 'Active'       },
  { id: 'AST-011', policyId: 'POL-008', type: 'Equipment',  name: 'Solar Panel Array – 500kW',    description: 'Commercial solar installation',                insuredValue: 320000,  purchaseDate: '2022-08-15', serialNumber: 'SOL-500KW-2022-034', location: 'Phoenix, AZ',    riskLevel: 'Low',    status: 'Active'       },
  { id: 'AST-012', policyId: 'POL-009', type: 'Vehicle',    name: '2020 Harley-Davidson Road King',description: 'Motorcycle, agreed value',                   insuredValue: 22000,   purchaseDate: '2020-04-22', serialNumber: '1HD1KRM1XLB123901', location: 'Denver, CO',      riskLevel: 'High',   status: 'Damaged'      },
  { id: 'AST-013', policyId: 'POL-009', type: 'Property',   name: 'Denver Ski Cabin',             description: 'Mountain property, seasonal use',              insuredValue: 675000,  purchaseDate: '2016-12-10', serialNumber: 'PROP-DEN-00567',    location: 'Denver, CO',      riskLevel: 'Medium', status: 'Active'       },
  { id: 'AST-014', policyId: 'POL-010', type: 'Commercial', name: 'Portland Food Hall',           description: 'Multi-tenant F&B commercial space',            insuredValue: 1800000, purchaseDate: '2021-05-20', serialNumber: 'COMM-POR-00341',    location: 'Portland, OR',    riskLevel: 'Medium', status: 'Under Review' },
  { id: 'AST-015', policyId: 'POL-011', type: 'Equipment',  name: 'Industrial Generator 500kVA',  description: 'Backup power for data center',                insuredValue: 78000,   purchaseDate: '2020-10-01', serialNumber: 'GEN-500KVA-00214',  location: 'Austin, TX',      riskLevel: 'Low',    status: 'Active'       },
];

const EMPTY_FORM: AssetFormData = {
  policyId: '', type: 'Vehicle', name: '', description: '',
  insuredValue: '', purchaseDate: '', serialNumber: '', location: '',
  riskLevel: 'Low', status: 'Active',
};

const ITEMS_PER_PAGE = 9;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

const TypeIcon: React.FC<{ type: string; className?: string }> = ({ type, className = 'w-5 h-5' }) => {
  switch (type) {
    case 'Vehicle':    return <Car className={className} />;
    case 'Property':   return <Building2 className={className} />;
    case 'Equipment':  return <Wrench className={className} />;
    case 'Commercial': return <Briefcase className={className} />;
    default:           return <Package className={className} />;
  }
};

const TypeIconLarge: React.FC<{ type: string }> = ({ type }) => {
  const styles = {
    Vehicle: 'from-blue-500 to-blue-600',
    Property: 'from-purple-500 to-purple-600',
    Equipment: 'from-teal-500 to-teal-600',
    Commercial: 'from-indigo-500 to-indigo-600'
  };
  return (
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${styles[type as keyof typeof styles]} flex items-center justify-center text-white shadow-md`}>
      <TypeIcon type={type} className="w-6 h-6" />
    </div>
  );
};

// ─── Reusable UI ──────────────────────────────────────────────────────────────

const StatusBadge: React.FC<{ status: Asset['status'] }> = ({ status }) => {
  const styles: Record<Asset['status'], { cls: string; icon: React.ReactNode }> = {
    'Active':       { cls: 'bg-green-50 text-green-700 border-green-200',  icon: <CheckCircle className="w-3 h-3" /> },
    'Expired':      { cls: 'bg-gray-100 text-gray-600 border-gray-300',    icon: <Clock className="w-3 h-3" /> },
    'Under Review': { cls: 'bg-amber-50 text-amber-700 border-amber-200',  icon: <AlertCircle className="w-3 h-3" /> },
    'Damaged':      { cls: 'bg-red-50 text-red-600 border-red-200',        icon: <AlertTriangle className="w-3 h-3" /> },
  };
  const { cls, icon } = styles[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${cls}`}>
      {icon}{status}
    </span>
  );
};

const RiskBadge: React.FC<{ level: Asset['riskLevel'] }> = ({ level }) => {
  const styles: Record<Asset['riskLevel'], string> = {
    Low:    'bg-emerald-50 text-emerald-700 border-emerald-200',
    Medium: 'bg-orange-50 text-orange-700 border-orange-200',
    High:   'bg-red-50 text-red-700 border-red-200',
  };
  const dotColor = { Low: 'bg-emerald-500', Medium: 'bg-orange-500', High: 'bg-red-500' }[level];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[level]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />{level}
    </span>
  );
};

const TypeBadge: React.FC<{ type: Asset['type'] }> = ({ type }) => {
  const styles: Record<Asset['type'], string> = {
    Vehicle:    'bg-blue-50 text-blue-700 border-blue-200',
    Property:   'bg-purple-50 text-purple-700 border-purple-200',
    Equipment:  'bg-teal-50 text-teal-700 border-teal-200',
    Commercial: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[type]}`}>
      <TypeIcon type={type} className="w-3 h-3" />{type}
    </span>
  );
};

// ─── Modal Component ──────────────────────────────────────────────────────────

interface ModalProps {
  mode: 'add' | 'edit' | 'view';
  asset: Asset | null;
  formData: AssetFormData;
  formErrors: FormErrors;
  onClose: () => void;
  onSave: () => void;
  onChange: (field: keyof AssetFormData, value: string) => void;
  onEditSwitch: () => void;
}

const AssetModal: React.FC<ModalProps> = ({
  mode, asset, formData, formErrors, onClose, onSave, onChange, onEditSwitch
}) => {
  const isView = mode === 'view';

  const inputBase = (err?: string) =>
    `w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
      err ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'
    }`;

  const Field: React.FC<{ label: string; required?: boolean; error?: string; children: React.ReactNode }> =
    ({ label, required, error, children }) => (
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {children}
        {error && (
          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />{error}
          </p>
        )}
      </div>
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* Modal header */}
        <div className={`px-6 py-5 border-b border-gray-200 flex items-center justify-between rounded-t-2xl ${isView ? 'bg-gradient-to-r from-blue-50 to-indigo-50' : 'bg-white'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${mode === 'add' ? 'bg-blue-100' : mode === 'edit' ? 'bg-green-100' : 'bg-indigo-100'}`}>
              {mode === 'add' ? <Plus className="w-5 h-5 text-blue-600" /> :
               mode === 'edit' ? <Edit className="w-5 h-5 text-green-600" /> :
               <Eye className="w-5 h-5 text-indigo-600" />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {mode === 'add' ? 'Add New Asset' : mode === 'edit' ? 'Edit Asset' : 'Asset Details'}
              </h2>
              <p className="text-xs text-gray-500">
                {mode === 'add' ? 'Fill in asset information below' :
                 mode === 'edit' ? `Editing ${asset?.id}` : asset?.id}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {isView && asset ? (
            /* ── View mode ── */
            <div className="space-y-5">
              <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <TypeIconLarge type={asset.type} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-xl truncate">{asset.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{asset.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <TypeBadge type={asset.type} />
                    <StatusBadge status={asset.status} />
                    <RiskBadge level={asset.riskLevel} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Asset ID',       value: asset.id,                  icon: Hash },
                  { label: 'Policy ID',      value: asset.policyId,            icon: FileText },
                  { label: 'Insured Value',  value: fmt(asset.insuredValue),   icon: DollarSign },
                  { label: 'Location',       value: asset.location,            icon: MapPin },
                  { label: 'Purchase Date',  value: asset.purchaseDate,        icon: Calendar },
                  { label: 'Serial / Reg',   value: asset.serialNumber,        icon: Hash },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className="w-4 h-4 text-blue-500" />
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 truncate">{value}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-1">
                <button onClick={onEditSwitch}
                  className="flex-1 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold text-sm flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4" />Edit Asset
                </button>
                <button onClick={onClose}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm">
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* ── Add / Edit form ── */
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Policy ID" required error={formErrors.policyId}>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input type="text" placeholder="e.g. POL-001" value={formData.policyId}
                      onChange={e => onChange('policyId', e.target.value)}
                      className={`${inputBase(formErrors.policyId)} pl-9`} />
                  </div>
                </Field>

                <Field label="Asset Type">
                  <select value={formData.type} onChange={e => onChange('type', e.target.value)} className={inputBase()}>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Property">Property</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </Field>

                <Field label="Asset Name" required error={formErrors.name}>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input type="text" placeholder="e.g. 2023 Tesla Model S" value={formData.name}
                      onChange={e => onChange('name', e.target.value)}
                      className={`${inputBase(formErrors.name)} pl-9`} />
                  </div>
                </Field>

                <Field label="Insured Value (USD)" required error={formErrors.insuredValue}>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input type="number" placeholder="e.g. 95000" value={formData.insuredValue}
                      onChange={e => onChange('insuredValue', e.target.value)}
                      className={`${inputBase(formErrors.insuredValue)} pl-9`} />
                  </div>
                </Field>

                <Field label="Serial / Registration Number" required error={formErrors.serialNumber}>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input type="text" placeholder="VIN / Serial / Reg No." value={formData.serialNumber}
                      onChange={e => onChange('serialNumber', e.target.value)}
                      className={`${inputBase(formErrors.serialNumber)} pl-9`} />
                  </div>
                </Field>

                <Field label="Purchase Date">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input type="date" value={formData.purchaseDate}
                      onChange={e => onChange('purchaseDate', e.target.value)}
                      className={`${inputBase()} pl-9`} />
                  </div>
                </Field>

                <Field label="Location" required error={formErrors.location}>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input type="text" placeholder="City, State" value={formData.location}
                      onChange={e => onChange('location', e.target.value)}
                      className={`${inputBase(formErrors.location)} pl-9`} />
                  </div>
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Risk Level">
                    <select value={formData.riskLevel} onChange={e => onChange('riskLevel', e.target.value)} className={inputBase()}>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </Field>
                  <Field label="Status">
                    <select value={formData.status} onChange={e => onChange('status', e.target.value)} className={inputBase()}>
                      <option value="Active">Active</option>
                      <option value="Expired">Expired</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Damaged">Damaged</option>
                    </select>
                  </Field>
                </div>
              </div>

              <Field label="Description">
                <textarea rows={3} placeholder="Brief description of the asset…" value={formData.description}
                  onChange={e => onChange('description', e.target.value)}
                  className={`${inputBase()} resize-none`} />
              </Field>

              <div className="flex gap-3 pt-2">
                <button onClick={onSave}
                  className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-sm flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {mode === 'edit' ? 'Save Changes' : 'Add Asset'}
                </button>
                <button onClick={onClose}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function PolicyAssetsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | Asset['type']>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | Asset['status']>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState<{ open: boolean; mode: 'add' | 'edit' | 'view'; asset: Asset | null }>({
    open: false, mode: 'add', asset: null
  });
  const [formData, setFormData] = useState<AssetFormData>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // ── Stats ──
  const totalInsuredValue = useMemo(() => assets.reduce((s, a) => s + a.insuredValue, 0), [assets]);
  const activeCount       = useMemo(() => assets.filter(a => a.status === 'Active').length, [assets]);
  const highRiskCount     = useMemo(() => assets.filter(a => a.riskLevel === 'High').length, [assets]);
  const uniquePolicies    = useMemo(() => new Set(assets.map(a => a.policyId)).size, [assets]);

  // Stats for the header
  const stats = [
    { label: 'Total Assets', value: assets.length, sub: `Across ${uniquePolicies} policies`, icon: Package, color: 'blue' },
    { label: 'Insured Value', value: fmt(totalInsuredValue), sub: 'Combined portfolio value', icon: DollarSign, color: 'green' },
    { label: 'Active Assets', value: activeCount, sub: `${Math.round((activeCount / assets.length) * 100)}% of total`, icon: Activity, color: 'teal' },
    { label: 'High Risk', value: highRiskCount, sub: 'Requires monitoring', icon: Zap, color: 'red' }
  ];

  // Quick action buttons
  const actionButtons = [
    { icon: Car, label: 'Add Vehicle', onClick: () => { setFormData({ ...EMPTY_FORM, type: 'Vehicle' }); setModal({ open: true, mode: 'add', asset: null }); }, color: 'blue' },
    { icon: Building2, label: 'Add Property', onClick: () => { setFormData({ ...EMPTY_FORM, type: 'Property' }); setModal({ open: true, mode: 'add', asset: null }); }, color: 'purple' },
    { icon: Wrench, label: 'Add Equipment', onClick: () => { setFormData({ ...EMPTY_FORM, type: 'Equipment' }); setModal({ open: true, mode: 'add', asset: null }); }, color: 'teal' },
    { icon: Briefcase, label: 'Add Commercial', onClick: () => { setFormData({ ...EMPTY_FORM, type: 'Commercial' }); setModal({ open: true, mode: 'add', asset: null }); }, color: 'indigo' },
    { icon: Download, label: 'Export CSV', onClick: handleExportCSV, color: 'green' },
    { icon: Upload, label: 'Import', onClick: () => {}, color: 'orange' }
  ];

  // ── Filter + Paginate ──
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return assets.filter(a => {
      const matchSearch = !q || a.name.toLowerCase().includes(q) || a.policyId.toLowerCase().includes(q) || a.serialNumber.toLowerCase().includes(q);
      const matchType   = typeFilter === 'All' || a.type === typeFilter;
      const matchStatus = statusFilter === 'All' || a.status === statusFilter;
      return matchSearch && matchType && matchStatus;
    });
  }, [assets, search, typeFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated  = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const resetPage  = () => setCurrentPage(1);

  // ── Modal actions ──
  const openEdit = (a: Asset) => {
    setFormData({ policyId: a.policyId, type: a.type, name: a.name, description: a.description, insuredValue: String(a.insuredValue), purchaseDate: a.purchaseDate, serialNumber: a.serialNumber, location: a.location, riskLevel: a.riskLevel, status: a.status });
    setFormErrors({});
    setModal({ open: true, mode: 'edit', asset: a });
  };
  const openView     = (a: Asset) => setModal({ open: true, mode: 'view', asset: a });
  const closeModal   = () => { setModal({ open: false, mode: 'add', asset: null }); setFormData(EMPTY_FORM); setFormErrors({}); };
  const switchToEdit = () => modal.asset && openEdit(modal.asset);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.policyId.trim())    e.policyId    = 'Policy ID is required';
    if (!formData.name.trim())        e.name        = 'Asset name is required';
    if (!formData.insuredValue || isNaN(Number(formData.insuredValue)) || Number(formData.insuredValue) <= 0)
                                      e.insuredValue = 'Enter a valid insured value';
    if (!formData.location.trim())    e.location    = 'Location is required';
    if (!formData.serialNumber.trim()) e.serialNumber = 'Serial / registration number is required';
    setFormErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    if (modal.mode === 'add') {
      const next: Asset = { 
        id: `AST-${String(Date.now()).slice(-4)}`, 
        policyId: formData.policyId, 
        type: formData.type, 
        name: formData.name, 
        description: formData.description, 
        insuredValue: Number(formData.insuredValue), 
        purchaseDate: formData.purchaseDate, 
        serialNumber: formData.serialNumber, 
        location: formData.location, 
        riskLevel: formData.riskLevel, 
        status: formData.status 
      };
      setAssets(p => [next, ...p]);
    } else if (modal.mode === 'edit' && modal.asset) {
      setAssets(p => p.map(a => a.id === modal.asset!.id ? { ...a, ...formData, insuredValue: Number(formData.insuredValue) } : a));
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this asset? This action cannot be undone.'))
      setAssets(p => p.filter(a => a.id !== id));
  };

  function handleExportCSV() {
    const headers = ['ID', 'Policy ID', 'Type', 'Name', 'Insured Value', 'Location', 'Risk Level', 'Status'];
    const rows = assets.map(a => [a.id, a.policyId, a.type, `"${a.name}"`, a.insuredValue, a.location, a.riskLevel, a.status]);
    const blob = new Blob([[headers, ...rows].map(r => r.join(',')).join('\n')], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    Object.assign(document.createElement('a'), { href: url, download: 'policy_assets.csv' }).click();
    URL.revokeObjectURL(url);
  }

  const handleChange = (field: keyof AssetFormData, value: string) => {
    setFormData(p => ({ ...p, [field]: value }));
    if (formErrors[field as keyof FormErrors]) setFormErrors(p => ({ ...p, [field]: undefined }));
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <InsuranceSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-gray-100">
            <Filter className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
          {/* Header */}
          <div className="bg-white border-b border-blue-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Policy Assets Management</h1>
                  <p className="text-sm text-gray-600">Manage and monitor insured assets across all policies</p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                const colorClasses = {
                  blue: 'bg-blue-50 text-blue-600',
                  green: 'bg-green-50 text-green-600',
                  teal: 'bg-teal-50 text-teal-600',
                  red: 'bg-red-50 text-red-600'
                };
                return (
                  <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                        <Icon size={24} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {actionButtons.map((action, idx) => {
                  const Icon = action.icon;
                  const colorClasses: Record<string, string> = {
                    blue: 'from-blue-500 to-blue-600',
                    purple: 'from-purple-500 to-purple-600',
                    teal: 'from-teal-500 to-teal-600',
                    indigo: 'from-indigo-500 to-indigo-600',
                    green: 'from-green-500 to-green-600',
                    orange: 'from-orange-500 to-orange-600'
                  };
                  return (
                    <button
                      key={idx}
                      onClick={action.onClick}
                      className={`flex flex-col items-center justify-center gap-2 p-4 bg-gradient-to-br ${colorClasses[action.color]} text-white rounded-xl shadow hover:shadow-lg transition-all transform hover:-translate-y-0.5`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-semibold text-center">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Asset Records</h2>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, policy ID, or serial…"
                    value={search}
                    onChange={e => { setSearch(e.target.value); resetPage(); }}
                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <select 
                    value={typeFilter} 
                    onChange={e => { setTypeFilter(e.target.value as typeof typeFilter); resetPage(); }}
                    className="pl-9 pr-8 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                  >
                    <option value="All">All Types</option>
                    <option value="Vehicle">Vehicles</option>
                    <option value="Property">Properties</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div className="relative">
                  <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <select 
                    value={statusFilter} 
                    onChange={e => { setStatusFilter(e.target.value as typeof statusFilter); resetPage(); }}
                    className="pl-9 pr-8 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Damaged">Damaged</option>
                  </select>
                </div>
                <p className="text-sm text-gray-500 flex items-center">
                  {filtered.length} record{filtered.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>

            {/* Assets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {paginated.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-gray-100 rounded-full">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No assets found</p>
                    <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
                  </div>
                </div>
              ) : (
                paginated.map((asset) => (
                  <div
                    key={asset.id}
                    className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all p-5"
                  >
                    {/* Header with type icon and actions */}
                    <div className="flex items-start justify-between mb-4">
                      <TypeIconLarge type={asset.type} />
                      <div className="flex gap-1">
                        <button
                          onClick={() => openView(asset)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEdit(asset)}
                          className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(asset.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Asset info */}
                    <div className="mb-3">
                      <h3 className="font-bold text-gray-900 text-lg truncate">{asset.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{asset.description}</p>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <TypeBadge type={asset.type} />
                      <StatusBadge status={asset.status} />
                      <RiskBadge level={asset.riskLevel} />
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-sm border-t border-gray-100 pt-3 mt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{asset.policyId}</span>
                        </div>
                        <span className="font-bold text-gray-900">{fmt(asset.insuredValue)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 truncate">{asset.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 text-xs truncate">{asset.serialNumber}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-600 text-xs">Purchased: {asset.purchaseDate}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Showing{' '}
                  <span className="font-semibold text-gray-700">{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}</span>–
                  <span className="font-semibold text-gray-700">{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}</span>{' '}
                  of <span className="font-semibold text-gray-700">{filtered.length}</span> records
                </p>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button 
                      key={page} 
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 text-sm font-medium rounded-lg transition-colors ${
                        currentPage === page ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            )}

            {/* Info Note */}
            <div className="mt-8 flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Info className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <p className="text-blue-900 text-sm">
                This dashboard provides a comprehensive view of all insured assets. Monitor values, track risk levels, 
                and manage asset details efficiently. High-risk assets require additional attention and monitoring.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      {modal.open && (
        <AssetModal
          mode={modal.mode} 
          asset={modal.asset} 
          formData={formData}
          formErrors={formErrors} 
          onClose={closeModal} 
          onSave={handleSave}
          onChange={handleChange} 
          onEditSwitch={switchToEdit}
        />
      )}
    </div>
  );
}