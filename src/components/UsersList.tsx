import { useApiQuery } from "../hooks/useApi";
import type { User } from "../types";
import { getUsers } from "../utils/users";
import { ButtonsCard } from "./ButtonsCard";

export const UserList = () => {

    const { data: users, isLoading, isError } = useApiQuery('users', getUsers); 
    
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
                {users.map((user: User) => (
                    <li key={user.id} className="user-card">
                        <div className="card-header">
                            <h3 className="user-name">{user.firstName} {user.lastName || ''}</h3>
                            <ButtonsCard userId={user.id}/>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}