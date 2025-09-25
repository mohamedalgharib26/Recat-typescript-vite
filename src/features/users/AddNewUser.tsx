/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "../../Components/Loader";
import { type User, PostData } from "../../store/Api/ReactQuery";

// Initial users data (from the provided JSON)

const UserManagement = ({
  editingUserProp,
}: {
  editingUserProp?: User | null;
}) => {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });

  const qc = useQueryClient();
  const Mutation = useMutation({
    mutationFn: async (body: User) =>
      PostData<User, User>("http://localhost:3000/users", body, {
        method: "POST",
      }),
    onSuccess: async () => {
      toast.success("User Added ...");
      await qc.invalidateQueries();
    },
    onError: () => toast.error("Error .. "),
  });
  const updateMutation = useMutation({
    mutationFn: async (updatedUser: User) =>
      PostData<User, User>(
        `http://localhost:3000/users/${updatedUser.id}`,
        updatedUser,
        {
          method: "PUT",
        }
      ),
    onSuccess: async () => {
      await qc.invalidateQueries();
      toast.success("User Updated ...");
    },
    onError: () => toast.error("Error .. "),
  });
  useEffect(() => {
    if (editingUserProp) {
      setFormData(editingUserProp);
      setEditingUser(editingUserProp);
    } else {
      setFormData({ name: "", email: "", role: "", status: "" });
      setEditingUser(null);
    }
  }, [editingUserProp]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.role ||
      !formData.status
    ) {
      alert("Please fill in all fields."); // Simple UI feedback
      return;
    }

    if (editingUserProp) {
      const updatedUserInfo = { ...formData, id: editingUserProp.id };
      updateMutation.mutate({ ...updatedUserInfo });
      setEditingUser(null);
    } else {
      const newUser = {
        ...formData,
        id: Date.now().toString().slice(-3),
      };
      Mutation.mutate({ ...newUser });
    }
    // Reset form
    setFormData({ name: "", email: "", role: "", status: "" });
    console.log(editingUser ? "User  updated:" : "New user added:", formData);
    setEditingUser(null);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", role: "", status: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Add/Edit User Form */}

      {Mutation.isPending || updateMutation.isPending ? (
        <div className="mt-2">
          <Loader loading={true} />
        </div>
      ) : (
        <div className="mb-8 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {editingUser ? `Edit User` : "Add New User"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              {/* Role Field */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="mt-1 block w-full text-black  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select a role</option>
                  <option value="Admin">Admin</option>
                  <option value="User   ">User </option>
                  <option value="Moderator">Moderator</option>
                </select>
              </div>

              {/* Status Field */}
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {editingUser ? "Update User" : "Add User"}
              </button>
              {editingUser && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
