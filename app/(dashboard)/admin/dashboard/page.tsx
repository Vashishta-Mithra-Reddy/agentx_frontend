import AddAgentForm from "@/components/AddAgentForm";
import FileUpload from "@/components/FileUpload";

export default function AdminDashboardPage() {
    return (
        <main className="wrapperx font-outfit">
        <h1 className='md:hidden block text-2xl mb-8 text-center'>Admin Dashboard</h1>
        <div className="flex flex-col md:flex-row justify-evenly gap-8">
        <FileUpload />
        <AddAgentForm />
        </div>
        </main>
    );
}