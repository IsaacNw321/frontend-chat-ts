import { type User } from "../types";
import { ButtonsCard } from "./ButtonsCard";

interface UserCardProps {
    user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user}) => {
    return (
        <li key={user.id} className="user-card">
            <div className="card-header">
                <h3 className="user-name">{user.userName}</h3>
            </div>
            <ButtonsCard userId={user.id}/>
        </li>
    );
};