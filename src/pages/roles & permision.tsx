import React, { useState } from "react";
import {
  Shield,
  Users,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Search,
  Menu,
} from "lucide-react";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
}

const RolesPermissionsManager: React.FC = () => {
  const [, setSidebarOpen] = useState(false);
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "Super Admin",
      description: "Full system access and control",
      userCount: 3,
      permissions: ["all"],
    },
    {
      id: "2",
      name: "Claims Manager",
      description: "Manage and approve insurance claims",
      userCount: 12,
      permissions: [
        "view_claims",
        "edit_claims",
        "approve_claims",
        "view_policies",
      ],
    },
    {
      id: "3",
      name: "Policy Manager",
      description: "Create and manage insurance policies",
      userCount: 8,
      permissions: [
        "view_policies",
        "create_policies",
        "edit_policies",
        "view_customers",
      ],
    },
    {
      id: "4",
      name: "Customer Support",
      description: "Handle customer inquiries and basic operations",
      userCount: 25,
      permissions: ["view_customers", "view_policies", "view_claims"],
    },
  ]);

  const [permissions] = useState<Permission[]>([
    {
      id: "view_claims",
      name: "View Claims",
      description: "View insurance claims",
      category: "Claims",
    },
    {
      id: "edit_claims",
      name: "Edit Claims",
      description: "Modify claim details",
      category: "Claims",
    },
    {
      id: "approve_claims",
      name: "Approve Claims",
      description: "Approve or reject claims",
      category: "Claims",
    },
    {
      id: "delete_claims",
      name: "Delete Claims",
      description: "Remove claims from system",
      category: "Claims",
    },
    {
      id: "view_policies",
      name: "View Policies",
      description: "View insurance policies",
      category: "Policies",
    },
    {
      id: "create_policies",
      name: "Create Policies",
      description: "Create new policies",
      category: "Policies",
    },
    {
      id: "edit_policies",
      name: "Edit Policies",
      description: "Modify policy details",
      category: "Policies",
    },
    {
      id: "delete_policies",
      name: "Delete Policies",
      description: "Remove policies",
      category: "Policies",
    },
    {
      id: "view_customers",
      name: "View Customers",
      description: "View customer information",
      category: "Customers",
    },
    {
      id: "edit_customers",
      name: "Edit Customers",
      description: "Modify customer details",
      category: "Customers",
    },
    {
      id: "view_reports",
      name: "View Reports",
      description: "Access system reports",
      category: "Reports",
    },
    {
      id: "manage_users",
      name: "Manage Users",
      description: "Add/remove system users",
      category: "Administration",
    },
  ]);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newRole, setNewRole] = useState<Partial<Role>>({
    name: "",
    description: "",
    permissions: [],
  });

  const handleEditRole = (role: Role) => {
    setSelectedRole({ ...role });
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleSaveRole = () => {
    if (selectedRole) {
      setRoles(roles.map((r) => (r.id === selectedRole.id ? selectedRole : r)));
      setIsEditing(false);
      setSelectedRole(null);
    }
  };

  const handleDeleteRole = (roleId: string) => {
    if (confirm("Are you sure you want to delete this role?")) {
      setRoles(roles.filter((r) => r.id !== roleId));
      if (selectedRole?.id === roleId) {
        setSelectedRole(null);
        setIsEditing(false);
      }
    }
  };

  const handleCreateRole = () => {
    setIsCreating(true);
    setIsEditing(false);
    setSelectedRole(null);
    setNewRole({
      name: "",
      description: "",
      permissions: [],
    });
  };

  const handleSaveNewRole = () => {
    if (newRole.name && newRole.description) {
      const roleToAdd: Role = {
        id: String(Date.now()),
        name: newRole.name,
        description: newRole.description,
        userCount: 0,
        permissions: newRole.permissions || [],
      };
      setRoles([...roles, roleToAdd]);
      setIsCreating(false);
      setSelectedRole(roleToAdd);
      setNewRole({ name: "", description: "", permissions: [] });
    } else {
      alert("Please fill in role name and description");
    }
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
    setNewRole({ name: "", description: "", permissions: [] });
  };

  const togglePermission = (permissionId: string) => {
    if (selectedRole) {
      const hasPermission = selectedRole.permissions.includes(permissionId);
      setSelectedRole({
        ...selectedRole,
        permissions: hasPermission
          ? selectedRole.permissions.filter((p) => p !== permissionId)
          : [...selectedRole.permissions, permissionId],
      });
    }
  };

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const groupedPermissions = permissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    },
    {} as Record<string, Permission[]>,
  );

  return (
    <div className="flex-1 min-h-screen bg-white">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">InsureCore</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">
                Roles & Permissions
              </h1>
              <p className="text-gray-600 text-sm lg:text-base">
                Manage user roles and access permissions for your insurance
                system
              </p>
            </div>
            <button
              onClick={handleCreateRole}
              className="px-4 py-2 lg:px-6 lg:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm lg:text-base shadow-lg shadow-blue-600/30 flex items-center gap-2"
            >
              <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
              Create Role
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Roles List - Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {filteredRoles.map((role) => (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className={`bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-all cursor-pointer ${
                  selectedRole?.id === role.id ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {role.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {role.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {role.name !== "Super Admin" && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditRole(role);
                          }}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRole(role.id);
                          }}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Users:</span>
                    <span className="font-semibold text-gray-900">
                      {role.userCount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Permissions:</span>
                    <span className="font-semibold text-gray-900">
                      {role.permissions.includes("all")
                        ? "All"
                        : role.permissions.length}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Roles List - Desktop */}
          <div className="hidden lg:block lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Roles
                </h2>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="overflow-y-auto max-h-[600px]">
              {filteredRoles.map((role) => (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                    selectedRole?.id === role.id
                      ? "bg-blue-50 border-l-4 border-l-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {role.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {role.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {role.userCount} users
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {role.permissions.includes("all")
                            ? "All"
                            : role.permissions.length}{" "}
                          permissions
                        </span>
                      </div>
                    </div>
                    {role.name !== "Super Admin" && (
                      <div className="flex gap-1 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditRole(role);
                          }}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRole(role.id);
                          }}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Permissions Panel */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200">
            {selectedRole ? (
              <>
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {selectedRole.name}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedRole.description}
                      </p>
                    </div>
                    {isEditing ? (
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveRole}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setSelectedRole(
                              roles.find((r) => r.id === selectedRole.id) ||
                                null,
                            );
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    ) : (
                      selectedRole.name !== "Super Admin" && (
                        <button
                          onClick={() => handleEditRole(selectedRole)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit Permissions
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[600px]">
                  {selectedRole.permissions.includes("all") ? (
                    <div className="text-center py-12">
                      <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Full System Access
                      </h3>
                      <p className="text-gray-600">
                        This role has unrestricted access to all system features
                        and permissions.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {Object.entries(groupedPermissions).map(
                        ([category, perms]) => (
                          <div key={category}>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
                              {category}
                            </h3>
                            <div className="space-y-2">
                              {perms.map((permission) => (
                                <label
                                  key={permission.id}
                                  className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                                    isEditing
                                      ? "cursor-pointer hover:bg-blue-50"
                                      : "cursor-default"
                                  } ${
                                    selectedRole.permissions.includes(
                                      permission.id,
                                    )
                                      ? "bg-blue-50 border-blue-200"
                                      : "bg-gray-50 border-gray-200"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedRole.permissions.includes(
                                      permission.id,
                                    )}
                                    onChange={() =>
                                      isEditing &&
                                      togglePermission(permission.id)
                                    }
                                    disabled={!isEditing}
                                    className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                  />
                                  <div className="flex-1">
                                    <div className="font-medium text-gray-800">
                                      {permission.name}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      {permission.description}
                                    </div>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full py-24">
                <div className="text-center">
                  <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Select a Role
                  </h3>
                  <p className="text-gray-500">
                    Choose a role from the list to view and manage its
                    permissions
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Create Role Modal */}
        {isCreating && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Create New Role
                </h2>
                <button
                  onClick={handleCancelCreate}
                  className="text-gray-500 hover:text-gray-700 text-2xl p-1"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 font-medium">
                    Role Name
                  </label>
                  <input
                    type="text"
                    value={newRole.name}
                    onChange={(e) =>
                      setNewRole({ ...newRole, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter role name"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 font-medium">
                    Description
                  </label>
                  <textarea
                    value={newRole.description}
                    onChange={(e) =>
                      setNewRole({ ...newRole, description: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter role description"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={handleSaveNewRole}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Create Role
                </button>
                <button
                  onClick={handleCancelCreate}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RolesPermissionsManager;
