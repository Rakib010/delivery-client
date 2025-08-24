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

  const getRoleVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "destructive";
      case "sender":
        return "secondary";
      case "receiver":
        return "default";
      default:
        return "outline";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-destructive">Failed to load users</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center gap-2 mb-6">
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <p className="mb-3 text-orange-400 ">
          {data?.data?.length || 0} users in system
        </p>
      </div>

      <Card>
        <CardContent>
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
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-4 text-left font-medium">User Info</th>
                    <th className="p-4 text-left font-medium">Contact</th>
                    <th className="p-4 text-left font-medium">Role</th>
                    <th className="p-4 text-left font-medium">Status</th>
                    <th className="p-4 text-left font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((user: any) => (
                    <tr key={user._id} className="border-b hover:bg-muted/30">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium capitalize">
                              {user.name || "Unknown User"}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ID: {user._id.slice(-8)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            {user.email}
                          </div>
                          {user.phone && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="h-4 w-4" />
                              {user.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={getRoleVariant(user.role)}
                          className="capitalize"
                        >
                          <Shield className="h-3 w-3 mr-1" />
                          {user.role.toLowerCase()}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={user.isBlock ? "destructive" : "default"}
                          className="flex items-center gap-1"
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
                      <td className="p-4">
                        <Button
                          variant={user.isBlock ? "default" : "destructive"}
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
