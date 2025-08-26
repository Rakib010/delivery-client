/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useAllUsersQuery,
  useManageUserMutation,
} from "@/redux/features/admin/admin.api";
import {
  User,
  Mail,
  Shield,
  Lock,
  LockOpen,
  Loader2,
  Phone,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { handleLoadingError } from "@/utils/ErrorHandle";
import { getRoleVariant } from "@/utils/status";

export default function AllUsers() {
  const { data, isLoading, isError, refetch } = useAllUsersQuery(undefined);
  const [manageUser, { isLoading: isManaging }] = useManageUserMutation();

  const handleToggleBlock = async (userId: string) => {
    try {
      const result = await manageUser(userId).unwrap();

      if (result.success) {
        const user = data?.data?.find((u: any) => u._id === userId);
        const action = user?.isBlock ? "unblocked" : "blocked";
        toast.success(`User ${action} successfully`);
        refetch();
      }
    } catch (error) {
      // console.log(error);
      toast.error("Failed to update user status");
    }
  };

  // loading/error
  const loadingErrorUI = handleLoadingError(isLoading, isError);
  if (loadingErrorUI) return loadingErrorUI;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center gap-2 mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-600 dark:text-gray-400">
          Controlling user accounts, roles, and access
        </h1>
      </div>

      <Card>
        <CardContent className="font-mono">
          {!data?.data || data.data.length === 0 ? (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No users found</h3>
              <p className="text-muted-foreground">
                There are no users in the system yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200">
                    <th className="p-4 text-left font-semibold">User Info</th>
                    <th className="p-4 text-left font-semibold">Contact</th>
                    <th className="p-4 text-left font-semibold">Role</th>
                    <th className="p-4 text-left font-semibold">Status</th>
                    <th className="p-4 text-left font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((user: any, idx: number) => (
                    <tr
                      key={user._id}
                      className={`${
                        idx % 2 === 0
                          ? "bg-white dark:bg-stone-900"
                          : "bg-stone-50 dark:bg-stone-950"
                      } hover:bg-amber-50 dark:hover:bg-stone-800 transition`}
                    >
                      {/* User Info */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-amber-100 dark:bg-stone-700 p-2 rounded-full">
                            <User className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <div className="font-medium capitalize">
                              {user.name || "Unknown User"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ID: {user._id.slice(-8)}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="p-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            {user.email}
                          </div>
                          {user.phone && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="h-4 w-4" />
                              {user.phone}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Role */}
                      <td className="p-4">
                        <Badge
                          variant={getRoleVariant(user.role)}
                          className="capitalize px-2 py-1"
                        >
                          <Shield className="h-3 w-3 mr-1" />
                          {user.role.toLowerCase()}
                        </Badge>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <Badge
                          variant={user.isBlock ? "destructive" : "secondary"}
                          className="flex items-center gap-1 px-2 py-1"
                        >
                          {user.isBlock ? (
                            <>
                              <Lock className="h-3 w-3" />
                              Blocked
                            </>
                          ) : (
                            <>
                              <LockOpen className="h-3 w-3" />
                              Active
                            </>
                          )}
                        </Badge>
                      </td>

                      {/* Action */}
                      <td className="p-4">
                        <Button
                          variant={user.isBlock ? "secondary" : "destructive"}
                          size="sm"
                          onClick={() => handleToggleBlock(user._id)}
                          disabled={isManaging}
                          className="gap-1"
                        >
                          {isManaging ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : user.isBlock ? (
                            <>
                              <LockOpen className="h-4 w-4" />
                              Unblock
                            </>
                          ) : (
                            <>
                              <Lock className="h-4 w-4" />
                              Block
                            </>
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
