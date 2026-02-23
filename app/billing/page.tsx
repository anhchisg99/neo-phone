import { getServerSession } from "next-auth";
import CreditCard from "./CreditCard";
import { redirect } from 'next/navigation'
import { authConfig } from "@/lib/auth";

export default async function Billing() {
            const session = await getServerSession(authConfig)
            console.log('session: ',session);
            
            if(!session){
                // Source - https://stackoverflow.com/a/4001713
// Posted by Fred, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-10, License - CC BY-SA 3.0

                redirect('/login')

            }
    
  return (
    <div className="min-h-screen bg-[#0e1a17] flex items-center justify-center p-6">
      <CreditCard />
    </div>
  );
}
