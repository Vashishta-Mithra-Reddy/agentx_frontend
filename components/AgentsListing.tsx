"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { toast } from 'sonner';
import { Edit2Icon, TrashIcon } from 'lucide-react';
import EditAgentForm from './EditAgentForm';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "../components/ui/dialog"

interface Task {
  _id: string;
  firstName: string;
  phone: string;
  notes: string;
  completed: boolean;
}

interface Agent {
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  countryCode: string;
  active: boolean;
  tasks: Task[];
}

interface AgentListingProps {
    refreshAgents: boolean;
}

export default function AgentListing(){
    const [agents, setAgents] = useState<Agent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

    const fetchAgents = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/agents`,{withCredentials:true});
                setAgents(response.data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch agents');
            } finally {
                setLoading(false);
            }
        };
        
    useEffect(() => {
        fetchAgents();
    }, []);

    const deleteAgent = async(id:string) =>{
        try {
                await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/agent/delete/${id}`,{withCredentials:true});
                toast.success('Agent deleted successfully!');
                fetchAgents();
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to delete agent');
            } finally {
                setLoading(false);
            }
    }

    const handleEditClick = (agent: Agent) => {
        setSelectedAgent(agent);
        setIsEditDialogOpen(true);
    };

    const handleAgentUpdated = () => {
        fetchAgents();
        setIsEditDialogOpen(false);
    };

    if(loading){
        return <Spinner/>;
    }

    if (error) {
        return (
            <div className="text-red-500 text-center mt-8">
                <p>{error}</p>
            </div>
        );
    }

    return(
        <div className="p-4 border-1 rounded-xl my-16 py-12">
            <h2 className="text-3xl mb-12 text-center">Agent List</h2>
            {agents.length === 0 ? (
                <p className="text-center text-gray-500">No agents found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {agents.map((agent) => (
                        <div key={agent._id} className="px-6 py-5 rounded-lg border border-foreground/20 relative">
                            
                            <div className='flex gap-2 absolute top-4 right-4'>
                            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                <DialogTrigger asChild>
                                    <button
                                        onClick={() => handleEditClick(agent)}
                                        className="flex flex-row items-center gap-2 bg-blue-500 hover:bg-blue-500/80 text-white rounded-xl py-3 px-4 text-xs leading-none cursor-pointer active:scale-95 transition-all duration-500"
                                    >
                                        <span className='text-md'>Edit</span>
                                        <Edit2Icon size={16}/>
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    {selectedAgent && (
                                        <EditAgentForm
                                            agent={selectedAgent}
                                            onAgentUpdated={handleAgentUpdated}
                                            onClose={() => setIsEditDialogOpen(false)}
                                        />
                                    )}
                                </DialogContent>
                            </Dialog>
                            <button 
                                onClick={() => deleteAgent(agent._id)}
                                className="bg-red-500 hover:bg-red-500/80 text-white rounded-xl p-3 text-xs leading-none cursor-pointer active:scale-95 transition-all duration-500"
                            >
                                <TrashIcon size={16}/>
                            </button>
                            </div>

                            <h3 className="text-xl pb-2 font-semibold">{agent.name}</h3>
                            <p className="text-foreground/80">Email: {agent.email}</p>
                            <p className="text-foreground/80">Mobile: {agent.mobileNumber}</p>
                            <p className={`text-sm font-medium ${agent.active ? 'text-green-500' : 'text-red-500'}`}>
                                {agent.active ? 'Active' : 'Inactive'}
                            </p>

                            {agent.tasks && agent.tasks.length > 0 && (
                            <div className="mt-4 w-full">
                                <h4 className="text-lg font-semibold mb-2">Assigned Tasks:</h4>
                                    <ul className="list-inside text-left w-full">
                                        {agent.tasks.map((task) => (
                                            <li key={task._id} className={`text-foreground/70 space-y-2 my-4 border rounded-xl px-4 py-2 ${task.completed?"bg-green-50/80":""}`}>
                                                <ul className={`my-2`}>
                                                    <li className='text-foreground font-semibold'>{task.firstName}</li>
                                                    <li>{task.phone}</li>
                                                    <li>{task.notes}</li>
                                                    {task.completed?<li className='text-green-500'>Completed</li>:<li className='text-red-500/70'>Pending</li>}
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}