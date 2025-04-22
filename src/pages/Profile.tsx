
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>{user ? `${user.name}'s Profile` : "User Profile"} - FileShare</title>
      </Helmet>
      
      {!user ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Card className="max-w-md w-full p-6 flex flex-col items-center">
            <CardHeader>
              <CardTitle>Not signed in</CardTitle>
              <CardDescription>Please log in to view your profile.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Card className="max-w-md w-full p-6 flex flex-col items-center">
            <CardHeader className="flex flex-col items-center gap-4">
              <Avatar>
                <AvatarFallback className="bg-primary text-white text-xl">
                  {user.name?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="mt-2">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-2 mt-2">
              <div>
                <span className="font-medium">Plan: </span>
                <Badge variant={user.isPro ? "secondary" : "outline"}>
                  {user.isPro ? "Pro" : "Free"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Profile;
