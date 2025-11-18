import { useApiQuery } from "../hooks/useApi";
import type { User } from "../types";
import { ButtonsCard } from "./ButtonsCard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
export const UserList = () => {
    const {id} = useAuth()
    const navigate = useNavigate();
    const controller = new AbortController()
      const axiosPrivate = useAxiosPrivate();
    const getUsers = async() =>{
      const users = await axiosPrivate.get('/users',{
        signal : controller.signal
      })
      return  users.data
    }
    
    const { data: users, isLoading, isError } = useApiQuery('users', getUsers); 
    useEffect(() => {
        if (isError) {
            navigate('/');
        }
    }, [isError, navigate]);
    if (isLoading) {
        return <div className="user-list-status">Cargando usuarios...</div>;
    }
    
    if (isError) {
        return <div className="user-list-status user-list-error">Ha habido un error al cargar los usuarios.</div>;
        
    }

    if (!users || users.length === 0) {
        return <div className="user-list-status">No hay usuarios disponibles.</div>;
    }
    return (
        <section className="user-list-container">
           
            <ul className="user-cards-grid">
                {users.filter((user : User) => user.id !== id).map((user: User) => (
                    <li key={user.id} className="user-card">
                        <div className="card-header">
                            <h3 className="user-name">{user.userName}</h3>
                            <ButtonsCard userId={user.id}/>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}