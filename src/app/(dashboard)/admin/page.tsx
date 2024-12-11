import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";  

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  if(session?.user){
    return <h2 className="text-2xl">Welcome back {session?.user.username || session.user.name } </h2>
  }

  return (
    <h2 className="2xl">Please login to see this Admin Page</h2>
  ) 
};

export default page;
