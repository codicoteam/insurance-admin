import { useState } from "react";
import {
  Search,
  Filter,
  UserPlus,
  MoreVertical,
  Phone,
  Calendar,
  MapPin,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  Bell,
  TrendingUp,
} from "lucide-react";

// Define types
interface Address {
  street?: string;
  city: string;
  state: string;
  country: string;
  zipCode?: string;
}

interface IdDocument {
  type: string;
  number: string;
}

interface Profile {
  address: Address;
  idDocument?: IdDocument;
}

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: Date;
  role: "customer" | "agent" | "admin" | "adjuster";
  kycStatus: "verified" | "pending" | "in_review" | "rejected";
  isEmailVerified: boolean;
  profile: Profile;
  createdAt: Date;
}

// Sample user data based on the schema
const initialUsers: User[] = [
  {
    _id: "1",
    email: "john.doe@email.com",
    firstName: "John",
    lastName: "Doe",
    phone: "+1 (555) 123-4567",
    dateOfBirth: new Date("1985-03-15"),
    role: "customer",
    kycStatus: "verified",
    isEmailVerified: true,
    profile: {
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        country: "USA",
        zipCode: "10001",
      },
      idDocument: {
        type: "Passport",
        number: "P123456789",
      },
    },
    createdAt: new Date("2024-01-15"),
  },
  {
    _id: "2",
    email: "sarah.smith@email.com",
    firstName: "Sarah",
    lastName: "Smith",
    phone: "+1 (555) 234-5678",
    dateOfBirth: new Date("1990-07-22"),
    role: "agent",
    kycStatus: "verified",
    isEmailVerified: true,
    profile: {
      address: {
        city: "Los Angeles",
        state: "CA",
        country: "USA",
      },
    },
    createdAt: new Date("2023-11-20"),
  },
  {
    _id: "3",
    email: "mike.johnson@email.com",
    firstName: "Mike",
    lastName: "Johnson",
    phone: "+1 (555) 345-6789",
    dateOfBirth: new Date("1988-12-10"),
    role: "customer",
    kycStatus: "pending",
    isEmailVerified: false,
    profile: {
      address: {
        city: "Chicago",
        state: "IL",
        country: "USA",
      },
    },
    createdAt: new Date("2024-09-05"),
  },
  {
    _id: "4",
    email: "emma.wilson@email.com",
    firstName: "Emma",
    lastName: "Wilson",
    phone: "+1 (555) 456-7890",
    dateOfBirth: new Date("1992-05-18"),
    role: "adjuster",
    kycStatus: "verified",
    isEmailVerified: true,
    profile: {
      address: {
        city: "Houston",
        state: "TX",
        country: "USA",
      },
    },
    createdAt: new Date("2023-08-12"),
  },
  {
    _id: "5",
    email: "david.brown@email.com",
    firstName: "David",
    lastName: "Brown",
    phone: "+1 (555) 567-8901",
    dateOfBirth: new Date("1995-09-30"),
    role: "customer",
    kycStatus: "in_review",
    isEmailVerified: true,
    profile: {
      address: {
        city: "Phoenix",
        state: "AZ",
        country: "USA",
      },
    },
    createdAt: new Date("2024-10-01"),
  },
];

const UsersScreen = () => {
  const [users] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedKyc, setSelectedKyc] = useState("all");
  const [, setSelectedUser] = useState<User | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      customer: "bg-blue-100 text-blue-700",
      agent: "bg-purple-100 text-purple-700",
      admin: "bg-red-100 text-red-700",
      adjuster: "bg-green-100 text-green-700",
    };
    return colors[role] || "bg-gray-100 text-gray-700";
  };

  const getKycIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "in_review":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getKycColor = (status: string) => {
    const colors: Record<string, string> = {
      verified: "bg-green-50 text-green-700 border-green-200",
      rejected: "bg-red-50 text-red-700 border-red-200",
      in_review: "bg-yellow-50 text-yellow-700 border-yellow-200",
      pending: "bg-gray-50 text-gray-700 border-gray-200",
    };
    return colors[status] || "bg-gray-50 text-gray-700";
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesKyc = selectedKyc === "all" || user.kycStatus === selectedKyc;
    return matchesSearch && matchesRole && matchesKyc;
  });

  const stats = [
    {
      label: "Total Users",
      value: users.length.toString(),
      change: "+12%",
      trend: "up",
      icon: Shield,
      color: "blue",
    },
    {
      label: "Verified Users",
      value: users.filter((u) => u.kycStatus === "verified").length.toString(),
      change: "+8%",
      trend: "up",
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "Pending Review",
      value: users
        .filter((u) => u.kycStatus === "pending" || u.kycStatus === "in_review")
        .length.toString(),
      change: "-3%",
      trend: "down",
      icon: Clock,
      color: "orange",
    },
    {
      label: "Agents",
      value: users.filter((u) => u.role === "agent").length.toString(),
      change: "+5%",
      trend: "up",
      icon: Shield,
      color: "purple",
    },
  ];

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">
              Users
            </h1>
            <p className="text-gray-600 text-sm lg:text-base">
              Manage and monitor all users in the system
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 lg:p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors relative">
              <Bell className="w-5 h-5 text-gray-700" />
              <span className="absolute top-1 right-1 lg:top-2 lg:right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm lg:text-base shadow-lg shadow-blue-600/30">
              <UserPlus className="w-4 h-4 lg:w-5 lg:h-5" />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 lg:p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-3 lg:mb-4">
              <div
                className={`p-2 lg:p-3 rounded-xl ${
                  stat.color === "red"
                    ? "bg-red-100"
                    : stat.color === "orange"
                      ? "bg-orange-100"
                      : stat.color === "yellow"
                        ? "bg-yellow-100"
                        : stat.color === "green"
                          ? "bg-green-100"
                          : stat.color === "blue"
                            ? "bg-blue-100"
                            : "bg-purple-100"
                }`}
              >
                <stat.icon
                  className={`w-5 h-5 lg:w-6 lg:h-6 ${
                    stat.color === "red"
                      ? "text-red-600"
                      : stat.color === "orange"
                        ? "text-orange-600"
                        : stat.color === "yellow"
                          ? "text-yellow-600"
                          : stat.color === "green"
                            ? "text-green-600"
                            : stat.color === "blue"
                              ? "text-blue-600"
                              : "text-purple-600"
                  }`}
                />
              </div>
              <div
                className={`flex items-center gap-1 text-xs lg:text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
              >
                <TrendingUp
                  className={`w-3 h-3 lg:w-4 lg:h-4 ${stat.trend === "down" ? "rotate-180" : ""}`}
                />
                {stat.change}
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-xs lg:text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 sm:flex-initial min-w-0 w-full sm:w-64 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 lg:pl-11 pr-4 py-2 lg:py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base"
          />
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 lg:px-4 lg:py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm lg:text-base flex-1 sm:flex-initial"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customer</option>
            <option value="agent">Agent</option>
            <option value="adjuster">Adjuster</option>
            <option value="admin">Admin</option>
          </select>

          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="px-3 py-2 lg:px-4 lg:py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm lg:text-base"
            >
              <Filter className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
              <span className="font-medium text-gray-700 hidden sm:inline">
                Filter
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-600 transition-transform ${filterOpen ? "rotate-180" : ""}`}
              />
            </button>

            {filterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-10">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                  KYC Status
                </div>
                {["all", "verified", "pending", "in_review", "rejected"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setSelectedKyc(status);
                        setFilterOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-50 text-sm ${
                        selectedKyc === status
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() +
                        status.slice(1).replace("_", " ")}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  KYC Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold shadow-md">
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {user.firstName} {user.lastName}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-gray-500">{user.email}</p>
                          {user.isEmailVerified && (
                            <CheckCircle className="w-3 h-3 text-green-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {user.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Phone className="w-4 h-4 text-gray-400" />
                          {user.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getKycColor(user.kycStatus)}`}
                    >
                      {getKycIcon(user.kycStatus)}
                      {user.kycStatus
                        .replace("_", " ")
                        .charAt(0)
                        .toUpperCase() +
                        user.kycStatus.replace("_", " ").slice(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {user.profile?.address?.city && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {user.profile.address.city},{" "}
                        {user.profile.address.state}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="border-b border-gray-200 last:border-b-0 p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold shadow-md">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-gray-500">{user.email}</p>
                      {user.isEmailVerified && (
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUser(user)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <MoreVertical className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <Phone className="w-3 h-3 text-gray-400" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span>
                      {user.profile?.address?.city},{" "}
                      {user.profile?.address?.state}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="mb-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </div>
                  <div>
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getKycColor(user.kycStatus)}`}
                    >
                      {getKycIcon(user.kycStatus)}
                      {user.kycStatus
                        .replace("_", " ")
                        .charAt(0)
                        .toUpperCase() +
                        user.kycStatus.replace("_", " ").slice(1)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-700 mt-3 pt-3 border-t border-gray-100">
                <Calendar className="w-3 h-3 text-gray-400" />
                <span>
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12 lg:py-16">
          <div className="inline-block p-4 lg:p-6 bg-gray-100 rounded-full mb-4">
            <Search className="w-8 h-8 lg:w-12 lg:h-12 text-gray-400" />
          </div>
          <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
            No users found
          </h3>
          <p className="text-gray-600 text-sm lg:text-base">
            No users match your current search criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default UsersScreen;
