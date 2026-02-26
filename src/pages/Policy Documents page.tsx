'use client';

import React, { useState, useMemo } from 'react';
import {
  FileText, Search, Upload, Download, Eye, Trash2,
  CheckCircle, XCircle, Clock, ChevronLeft, ChevronRight, X,
  AlertCircle, User, Briefcase, Activity,
  FileCheck, FileBadge, FileX, Calendar, Hash, MessageSquare,
  Package, Filter, ThumbsUp, ThumbsDown, Info, Heart
} from 'lucide-react';
import InsuranceSidebar from '../Components/sidebar'; // Adjust the import path as needed

interface PolicyDocument {
  id: string;
  policyId: string;
  ownerType: 'Policyholder' | 'Beneficiary' | 'Asset' | 'Claim';
  documentType: 'Policy Document' | 'KYC' | 'Asset Document' | 'Claim Document';
  fileName: string;
  fileFormat: string;
  uploadDate: string;
  expiryDate?: string;
  status: 'Pending' | 'Verified' | 'Rejected';
  notes?: string;
}

interface UploadFormData {
  policyId: string;
  ownerType: PolicyDocument['ownerType'];
  documentType: PolicyDocument['documentType'];
  fileName: string;
  expiryDate: string;
  notes: string;
}

interface FormErrors { policyId?: string; fileName?: string; }

const MOCK_DOCS: PolicyDocument[] = [
  { id: 'DOC-001', policyId: 'POL-001', ownerType: 'Policyholder',  documentType: 'Policy Document',  fileName: 'policy_contract_harrington.pdf',    fileFormat: 'PDF',  uploadDate: '2024-01-10', expiryDate: '2026-01-10', status: 'Verified', notes: 'Original signed contract' },
  { id: 'DOC-002', policyId: 'POL-001', ownerType: 'Policyholder',  documentType: 'KYC',              fileName: 'harrington_national_id.jpg',         fileFormat: 'JPG',  uploadDate: '2024-01-10', expiryDate: '2029-06-01', status: 'Verified', notes: 'National ID – front & back' },
  { id: 'DOC-003', policyId: 'POL-002', ownerType: 'Beneficiary',   documentType: 'KYC',              fileName: 'caldwell_birth_certificate.pdf',      fileFormat: 'PDF',  uploadDate: '2024-02-14',                           status: 'Pending',  notes: 'Awaiting manual review' },
  { id: 'DOC-004', policyId: 'POL-003', ownerType: 'Asset',         documentType: 'Asset Document',   fileName: 'vehicle_registration_bmw_x5.pdf',    fileFormat: 'PDF',  uploadDate: '2024-02-20', expiryDate: '2025-11-20', status: 'Verified', notes: 'Vehicle title document' },
  { id: 'DOC-005', policyId: 'POL-003', ownerType: 'Asset',         documentType: 'Asset Document',   fileName: 'car_inspection_report_2024.docx',     fileFormat: 'DOCX', uploadDate: '2024-03-01',                           status: 'Pending',  notes: '' },
  { id: 'DOC-006', policyId: 'POL-004', ownerType: 'Claim',         documentType: 'Claim Document',   fileName: 'claim_incident_report_pol004.pdf',    fileFormat: 'PDF',  uploadDate: '2024-03-08',                           status: 'Rejected', notes: 'Illegible scan – resubmit required' },
  { id: 'DOC-007', policyId: 'POL-004', ownerType: 'Policyholder',  documentType: 'KYC',              fileName: 'whitfield_passport_copy.png',         fileFormat: 'PNG',  uploadDate: '2024-03-12', expiryDate: '2031-04-22', status: 'Verified', notes: 'Passport verified' },
  { id: 'DOC-008', policyId: 'POL-005', ownerType: 'Claim',         documentType: 'Claim Document',   fileName: 'medical_invoice_boston_clinic.pdf',   fileFormat: 'PDF',  uploadDate: '2024-03-20',                           status: 'Pending',  notes: 'MRI claim supporting doc' },
  { id: 'DOC-009', policyId: 'POL-005', ownerType: 'Asset',         documentType: 'Asset Document',   fileName: 'mri_equipment_appraisal.pdf',         fileFormat: 'PDF',  uploadDate: '2024-03-22', expiryDate: '2026-03-22', status: 'Verified', notes: 'Third-party appraisal' },
  { id: 'DOC-010', policyId: 'POL-006', ownerType: 'Policyholder',  documentType: 'Policy Document',  fileName: 'thornton_policy_renewal_2024.pdf',    fileFormat: 'PDF',  uploadDate: '2024-04-01', expiryDate: '2025-04-01', status: 'Verified', notes: 'Annual renewal document' },
  { id: 'DOC-011', policyId: 'POL-007', ownerType: 'Beneficiary',   documentType: 'KYC',              fileName: 'bellamy_marriage_certificate.pdf',     fileFormat: 'PDF',  uploadDate: '2024-04-10',                           status: 'Pending',  notes: 'Supporting relationship proof' },
  { id: 'DOC-012', policyId: 'POL-007', ownerType: 'Claim',         documentType: 'Claim Document',   fileName: 'fire_damage_assessment_2024.pdf',     fileFormat: 'PDF',  uploadDate: '2024-04-18',                           status: 'Rejected', notes: 'Missing adjuster signature' },
  { id: 'DOC-013', policyId: 'POL-008', ownerType: 'Policyholder',  documentType: 'KYC',              fileName: 'nambiar_drivers_license.png',          fileFormat: 'PNG',  uploadDate: '2024-05-02', expiryDate: '2027-09-15', status: 'Verified', notes: "Driver's license verified" },
  { id: 'DOC-014', policyId: 'POL-009', ownerType: 'Asset',         documentType: 'Asset Document',   fileName: 'ski_cabin_title_deed.pdf',            fileFormat: 'PDF',  uploadDate: '2024-05-14', expiryDate: '2034-05-14', status: 'Pending',  notes: 'Title deed under review' },
  { id: 'DOC-015', policyId: 'POL-010', ownerType: 'Claim',         documentType: 'Claim Document',   fileName: 'motorcycle_accident_report.pdf',      fileFormat: 'PDF',  uploadDate: '2024-05-20',                           status: 'Verified', notes: 'Police report attached' },
];

const EMPTY_FORM: UploadFormData = { policyId: '', ownerType: 'Policyholder', documentType: 'Policy Document', fileName: '', expiryDate: '', notes: '' };
const ITEMS_PER_PAGE = 9;
const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });

const fileFormatColor: Record<string, string> = {
  PDF: 'bg-red-50 text-red-700 border-red-200', 
  JPG: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  PNG: 'bg-blue-50 text-blue-700 border-blue-200', 
  DOCX: 'bg-indigo-50 text-indigo-700 border-indigo-200',
};

const ownerTypeIcon = (t: PolicyDocument['ownerType'], className = 'w-4 h-4') => {
  const icons = { 
    Policyholder: User, 
    Beneficiary: Heart, 
    Asset: Package, 
    Claim: Briefcase 
  };
  const Icon = icons[t];
  return <Icon className={className} />;
};

const ownerTypeColor = (t: PolicyDocument['ownerType']) => {
  const colors = {
    Policyholder: 'from-blue-500 to-blue-600',
    Beneficiary: 'from-purple-500 to-purple-600',
    Asset: 'from-teal-500 to-teal-600',
    Claim: 'from-orange-500 to-orange-600'
  };
  return colors[t];
};

const docTypeIcon = (t: PolicyDocument['documentType']) => {
  const icons = { 
    'Policy Document': FileText, 
    KYC: FileBadge, 
    'Asset Document': FileCheck, 
    'Claim Document': FileX 
  };
  const Icon = icons[t];
  return <Icon className="w-4 h-4" />;
};

const StatusBadge: React.FC<{ status: PolicyDocument['status'] }> = ({ status }) => {
  const map = {
    Pending:  { cls: 'bg-amber-50 text-amber-700 border-amber-200',  icon: <Clock className="w-3 h-3" /> },
    Verified: { cls: 'bg-green-50 text-green-700 border-green-200',  icon: <CheckCircle className="w-3 h-3" /> },
    Rejected: { cls: 'bg-red-50 text-red-600 border-red-200',        icon: <XCircle className="w-3 h-3" /> },
  };
  const { cls, icon } = map[status];
  return <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${cls}`}>{icon}{status}</span>;
};

const OwnerBadge: React.FC<{ type: PolicyDocument['ownerType'] }> = ({ type }) => {
  const map = { 
    Policyholder: 'bg-blue-50 text-blue-700 border-blue-200', 
    Beneficiary: 'bg-purple-50 text-purple-700 border-purple-200', 
    Asset: 'bg-teal-50 text-teal-700 border-teal-200', 
    Claim: 'bg-orange-50 text-orange-700 border-orange-200' 
  };
  return <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${map[type]}`}>{ownerTypeIcon(type, 'w-3 h-3')}{type}</span>;
};

const DocTypeBadge: React.FC<{ type: PolicyDocument['documentType'] }> = ({ type }) => {
  const map = { 
    'Policy Document': 'bg-indigo-50 text-indigo-700 border-indigo-200', 
    KYC: 'bg-cyan-50 text-cyan-700 border-cyan-200', 
    'Asset Document': 'bg-emerald-50 text-emerald-700 border-emerald-200', 
    'Claim Document': 'bg-rose-50 text-rose-700 border-rose-200' 
  };
  return <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${map[type]}`}>{docTypeIcon(type)}{type}</span>;
};

// ─── Modal Components ─────────────────────────────────────────────────────────

const PreviewModal: React.FC<{ doc: PolicyDocument; onClose: () => void }> = ({ doc, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-100 rounded-xl"><Eye className="w-5 h-5 text-blue-600" /></div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Document Preview</h2>
            <p className="text-xs text-gray-500">{doc.id}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/80 rounded-xl transition-colors"><X className="w-5 h-5 text-gray-500" /></button>
      </div>
      <div className="p-6 space-y-5">
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-200 mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <p className="font-semibold text-gray-700">{doc.fileName}</p>
          <p className="text-sm text-gray-400 mt-1">{doc.fileFormat} • Preview not available in demo</p>
          <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />Download File
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Document ID',  value: doc.id,                                        icon: Hash },
            { label: 'Policy ID',    value: doc.policyId,                                  icon: FileText },
            { label: 'Owner Type',   value: doc.ownerType,                                 icon: User },
            { label: 'Doc Type',     value: doc.documentType,                              icon: FileBadge },
            { label: 'Upload Date',  value: fmtDate(doc.uploadDate),                       icon: Calendar },
            { label: 'Expiry Date',  value: doc.expiryDate ? fmtDate(doc.expiryDate) : 'N/A', icon: Calendar },
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
        {doc.notes && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-start gap-2">
              <MessageSquare className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">Notes</p>
                <p className="text-sm text-amber-900">{doc.notes}</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between pt-1">
          <StatusBadge status={doc.status} />
          <button onClick={onClose} className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm">Close Preview</button>
        </div>
      </div>
    </div>
  </div>
);

const UploadModal: React.FC<{ 
  formData: UploadFormData; 
  formErrors: FormErrors; 
  onClose: () => void; 
  onUpload: () => void; 
  onChange: (f: keyof UploadFormData, v: string) => void 
}> = ({ formData, formErrors, onClose, onUpload, onChange }) => {
  const base = (err?: string) => `w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${err ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'}`;
  
  const Field: React.FC<{ label: string; required?: boolean; error?: string; children: React.ReactNode }> = ({ label, required, error, children }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
    </div>
  );
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 rounded-xl"><Upload className="w-5 h-5 text-blue-600" /></div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Upload Document</h2>
              <p className="text-xs text-gray-500">Fill in document details below</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><X className="w-5 h-5 text-gray-500" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Policy ID" required error={formErrors.policyId}>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input type="text" placeholder="e.g. POL-001" value={formData.policyId} onChange={e => onChange('policyId', e.target.value)} className={`${base(formErrors.policyId)} pl-9`} />
              </div>
            </Field>
            <Field label="Owner Type">
              <select value={formData.ownerType} onChange={e => onChange('ownerType', e.target.value)} className={base()}>
                <option value="Policyholder">Policyholder</option>
                <option value="Beneficiary">Beneficiary</option>
                <option value="Asset">Asset</option>
                <option value="Claim">Claim</option>
              </select>
            </Field>
            <Field label="Document Type">
              <select value={formData.documentType} onChange={e => onChange('documentType', e.target.value)} className={base()}>
                <option value="Policy Document">Policy Document</option>
                <option value="KYC">KYC</option>
                <option value="Asset Document">Asset Document</option>
                <option value="Claim Document">Claim Document</option>
              </select>
            </Field>
            <Field label="Expiry Date">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input type="date" value={formData.expiryDate} onChange={e => onChange('expiryDate', e.target.value)} className={`${base()} pl-9`} />
              </div>
            </Field>
          </div>
          <Field label="File Upload" required error={formErrors.fileName}>
            <label className={`block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${formErrors.fileName ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'}`}>
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700 mb-1">Click to select or drag and drop</p>
              <p className="text-xs text-gray-400">PDF, JPG, PNG, DOCX up to 10MB</p>
              <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png,.docx" onChange={e => onChange('fileName', e.target.files?.[0]?.name ?? '')} />
              {formData.fileName && <p className="mt-2 text-xs text-blue-600 font-medium">{formData.fileName}</p>}
            </label>
          </Field>
          <Field label="Notes">
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
              <textarea rows={3} placeholder="Optional notes or remarks…" value={formData.notes} onChange={e => onChange('notes', e.target.value)} className={`${base()} pl-9 resize-none`} />
            </div>
          </Field>
          <div className="flex gap-3 pt-2">
            <button onClick={onUpload} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-sm flex items-center justify-center gap-2">
              <Upload className="w-4 h-4" />Upload Document
            </button>
            <button onClick={onClose} className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function PolicyDocumentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [docs, setDocs] = useState<PolicyDocument[]>(MOCK_DOCS);
  const [search, setSearch] = useState('');
  const [docTypeFilter, setDocTypeFilter] = useState<'All' | PolicyDocument['documentType']>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | PolicyDocument['status']>('All');
  const [ownerFilter, setOwnerFilter] = useState<'All' | PolicyDocument['ownerType']>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<PolicyDocument | null>(null);
  const [formData, setFormData] = useState<UploadFormData>(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const pendingCount  = useMemo(() => docs.filter(d => d.status === 'Pending').length, [docs]);
  const verifiedCount = useMemo(() => docs.filter(d => d.status === 'Verified').length, [docs]);
  const rejectedCount = useMemo(() => docs.filter(d => d.status === 'Rejected').length, [docs]);
  const totalPolicies = useMemo(() => new Set(docs.map(d => d.policyId)).size, [docs]);

  // Stats for the header
  const stats = [
    { label: 'Total Documents', value: docs.length, sub: `Across ${totalPolicies} policies`, icon: FileText, color: 'blue' },
    { label: 'Pending', value: pendingCount, sub: 'Awaiting review', icon: Clock, color: 'amber' },
    { label: 'Verified', value: verifiedCount, sub: `${Math.round((verifiedCount / docs.length) * 100)}% approved`, icon: FileCheck, color: 'green' },
    { label: 'Rejected', value: rejectedCount, sub: 'Require resubmission', icon: FileX, color: 'red' }
  ];

  // Quick action buttons
  const actionButtons = [
    { icon: Upload, label: 'Upload Document', onClick: () => { setFormData(EMPTY_FORM); setFormErrors({}); setUploadModalOpen(true); }, color: 'blue' },
    { icon: Download, label: 'Export CSV', onClick: handleExportCSV, color: 'green' },
    { icon: FileText, label: 'Policy Docs', onClick: () => setDocTypeFilter('Policy Document'), color: 'indigo' },
    { icon: FileBadge, label: 'KYC', onClick: () => setDocTypeFilter('KYC'), color: 'cyan' },
    { icon: FileCheck, label: 'Asset Docs', onClick: () => setDocTypeFilter('Asset Document'), color: 'emerald' },
    { icon: FileX, label: 'Claim Docs', onClick: () => setDocTypeFilter('Claim Document'), color: 'rose' }
  ];

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return docs.filter(d => {
      const matchSearch = !q || d.policyId.toLowerCase().includes(q) || d.fileName.toLowerCase().includes(q) || d.id.toLowerCase().includes(q);
      const matchType   = docTypeFilter === 'All' || d.documentType === docTypeFilter;
      const matchStatus = statusFilter === 'All' || d.status === statusFilter;
      const matchOwner  = ownerFilter === 'All' || d.ownerType === ownerFilter;
      return matchSearch && matchType && matchStatus && matchOwner;
    });
  }, [docs, search, docTypeFilter, statusFilter, ownerFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated  = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const resetPage  = () => setCurrentPage(1);

  const handleApprove = (id: string) => { 
    if (window.confirm('Approve this document? This will mark it as Verified.')) 
      setDocs(p => p.map(d => d.id === id ? { ...d, status: 'Verified' as const } : d)); 
  };
  
  const handleReject  = (id: string) => { 
    if (window.confirm('Reject this document? This will mark it as Rejected.'))  
      setDocs(p => p.map(d => d.id === id ? { ...d, status: 'Rejected' as const } : d)); 
  };
  
  const handleDelete  = (id: string) => { 
    if (window.confirm('Delete this document? This action cannot be undone.'))   
      setDocs(p => p.filter(d => d.id !== id)); 
  };

  const closeUpload = () => { setUploadModalOpen(false); setFormData(EMPTY_FORM); setFormErrors({}); };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.policyId.trim()) e.policyId = 'Policy ID is required';
    if (!formData.fileName.trim()) e.fileName  = 'Please select a file to upload';
    setFormErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleUpload = () => {
    if (!validate()) return;
    const ext = formData.fileName.split('.').pop()?.toUpperCase() ?? 'PDF';
    const newDoc: PolicyDocument = { 
      id: `DOC-${String(Date.now()).slice(-4)}`, 
      policyId: formData.policyId, 
      ownerType: formData.ownerType, 
      documentType: formData.documentType, 
      fileName: formData.fileName, 
      fileFormat: ext, 
      uploadDate: new Date().toISOString().slice(0, 10), 
      expiryDate: formData.expiryDate || undefined, 
      status: 'Pending', 
      notes: formData.notes 
    };
    setDocs(p => [newDoc, ...p]);
    closeUpload();
  };

  const handleChange = (field: keyof UploadFormData, value: string) => {
    setFormData(p => ({ ...p, [field]: value }));
    if (formErrors[field as keyof FormErrors]) setFormErrors(p => ({ ...p, [field]: undefined }));
  };

  function handleExportCSV() {
    const headers = ['Doc ID', 'Policy ID', 'Owner Type', 'Doc Type', 'File Name', 'Format', 'Upload Date', 'Expiry Date', 'Status'];
    const rows = docs.map(d => [d.id, d.policyId, d.ownerType, d.documentType, `"${d.fileName}"`, d.fileFormat, d.uploadDate, d.expiryDate ?? '', d.status]);
    const blob = new Blob([[headers, ...rows].map(r => r.join(',')).join('\n')], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    Object.assign(document.createElement('a'), { href: url, download: 'policy_documents.csv' }).click();
    URL.revokeObjectURL(url);
  }

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
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Policy Documents Management</h1>
                  <p className="text-sm text-gray-600">Manage, verify, and monitor all uploaded insurance documents</p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                const colorClasses: Record<string, string> = {
                  blue: 'bg-blue-50 text-blue-600',
                  amber: 'bg-amber-50 text-amber-600',
                  green: 'bg-green-50 text-green-600',
                  red: 'bg-red-50 text-red-600',
                  indigo: 'bg-indigo-50 text-indigo-600',
                  cyan: 'bg-cyan-50 text-cyan-600',
                  emerald: 'bg-emerald-50 text-emerald-600',
                  rose: 'bg-rose-50 text-rose-600'
                };
                return (
                  <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
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
                    green: 'from-green-500 to-green-600',
                    indigo: 'from-indigo-500 to-indigo-600',
                    cyan: 'from-cyan-500 to-cyan-600',
                    emerald: 'from-emerald-500 to-emerald-600',
                    rose: 'from-rose-500 to-rose-600'
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
              <h2 className="text-xl font-bold text-gray-900 mb-4">Document Records</h2>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by policy ID, doc name, or ID…"
                    value={search}
                    onChange={e => { setSearch(e.target.value); resetPage(); }}
                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <select 
                    value={docTypeFilter} 
                    onChange={e => { setDocTypeFilter(e.target.value as typeof docTypeFilter); resetPage(); }}
                    className="pl-9 pr-8 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                  >
                    <option value="All">All Doc Types</option>
                    <option value="Policy Document">Policy Document</option>
                    <option value="KYC">KYC</option>
                    <option value="Asset Document">Asset Document</option>
                    <option value="Claim Document">Claim Document</option>
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
                    <option value="Pending">Pending</option>
                    <option value="Verified">Verified</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <select 
                    value={ownerFilter} 
                    onChange={e => { setOwnerFilter(e.target.value as typeof ownerFilter); resetPage(); }}
                    className="pl-9 pr-8 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                  >
                    <option value="All">All Owners</option>
                    <option value="Policyholder">Policyholder</option>
                    <option value="Beneficiary">Beneficiary</option>
                    <option value="Asset">Asset</option>
                    <option value="Claim">Claim</option>
                  </select>
                </div>
                <p className="text-sm text-gray-500 flex items-center">
                  {filtered.length} record{filtered.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {paginated.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-gray-100 rounded-full">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No documents found</p>
                    <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
                  </div>
                </div>
              ) : (
                paginated.map((doc) => {
                  const OwnerIcon = doc.ownerType === 'Policyholder' ? User : 
                                   doc.ownerType === 'Beneficiary' ? Heart : 
                                   doc.ownerType === 'Asset' ? Package : Briefcase;
                  
                  return (
                    <div
                      key={doc.id}
                      className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all p-5"
                    >
                      {/* Header with owner icon and actions */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ownerTypeColor(doc.ownerType)} flex items-center justify-center text-white shadow-md`}>
                          <OwnerIcon className="w-6 h-6" />
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setPreviewDoc(doc)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            title="Download"
                            className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          {doc.status !== 'Verified' && (
                            <button
                              onClick={() => handleApprove(doc.id)}
                              title="Approve"
                              className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </button>
                          )}
                          {doc.status !== 'Rejected' && (
                            <button
                              onClick={() => handleReject(doc.id)}
                              title="Reject"
                              className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(doc.id)}
                            title="Delete"
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Document info */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-900 text-lg truncate">{doc.fileName}</h3>
                        </div>
                        <p className="text-xs text-gray-500">ID: {doc.id}</p>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <OwnerBadge type={doc.ownerType} />
                        <DocTypeBadge type={doc.documentType} />
                        <StatusBadge status={doc.status} />
                      </div>

                      {/* Details */}
                      <div className="space-y-2 text-sm border-t border-gray-100 pt-3 mt-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{doc.policyId}</span>
                          </div>
                          <span className={`px-2 py-0.5 text-xs font-bold rounded-md border ${fileFormatColor[doc.fileFormat] ?? 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                            {doc.fileFormat}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-600 text-xs">Uploaded: {fmtDate(doc.uploadDate)}</span>
                        </div>
                        {doc.expiryDate && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="text-gray-600 text-xs">Expires: {fmtDate(doc.expiryDate)}</span>
                          </div>
                        )}
                        {doc.notes && (
                          <div className="flex items-start gap-2 mt-2 p-2 bg-gray-50 rounded-lg">
                            <MessageSquare className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-gray-600 line-clamp-2">{doc.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
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
                This dashboard provides a comprehensive view of all policy-related documents. 
                Track verification status, manage expirations, and take action on pending documents. 
                Documents can be filtered by type, status, or owner for easy management.
              </p>
            </div>
          </div>
        </div>
      </div>

      {uploadModalOpen && <UploadModal formData={formData} formErrors={formErrors} onClose={closeUpload} onUpload={handleUpload} onChange={handleChange} />}
      {previewDoc && <PreviewModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />}
    </div>
  );
}