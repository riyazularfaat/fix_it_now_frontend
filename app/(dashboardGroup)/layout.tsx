import { Navbar } from "@/components/shared/navbar";


const DashboardLayout = async (
    {
        children
    }: {
        children: React.ReactNode
    }
) => {
 
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar user={{ success: true, data: { profile: { name: "John Doe", email: "john@example.com", role: "CUSTOMER" } } }} />
            {children}
        </div>
    );
};

export default DashboardLayout