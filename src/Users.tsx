import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import type React from "react";
import { fetchUsers, PostData, type User } from "./store/Api/ReactQuery";
import UserManagement from "./AddNewUser";
import ConfirmModel from "./ConfirmModel";
import { useState } from "react";
import toast from "react-hot-toast";

const Users: React.FC = () => {
  const { data: users } = useSuspenseQuery({
    queryFn: fetchUsers,
    queryKey: ["users"],
  });
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id: string) =>
      PostData<void, void>(`http://localhost:3000/users/${id}`, undefined, {
        method: "DELETE",
      }),
    onSuccess: async () => {
      toast.success("User Deleted ...");
      await qc.invalidateQueries();
    },
    onError: () => toast.error("Error .. "),
  });

  const [modal, setModel] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<User | null>(
    null
  );

  const handleDelete = (user: User) => {
    setModel(true);
    setSelectedUser(user);
  };

  const handleConfirm = (id: string) => {
    mutation.mutate(id);
    setModel(false);
  };

  function handleEdit(user: User): void {
    setSelectedUserForEdit(null);
    setTimeout(() => {
      setSelectedUserForEdit(user);
    }, 0);
  }

  return (
    <div>
      Users
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {modal && (
          <ConfirmModel
            showModel={modal}
            cancel={() => {
              setModel(false);
              setSelectedUser(null);
            }}
            confirm={() => selectedUser && handleConfirm(selectedUser.id)}
          />
        )}
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users &&
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-yellow-600 hover:text-white mr-4"
                        onClick={() => {
                          handleEdit(user);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-300 hover:text-white"
                        onClick={() => handleDelete(user)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <UserManagement editingUserProp={selectedUserForEdit} />
    </div>
  );
};

export default Users;
