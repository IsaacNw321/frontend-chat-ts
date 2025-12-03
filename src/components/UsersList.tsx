import { useApiQuery } from "../hooks/useApi";
import { Role, type ChatWitUsers, type User } from "../types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; 
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useFilteredUsers } from "../hooks/useFilters";
import { Filters } from "./FiltersSelect";
import { Searcher } from "./Searcher"; 
import { UserCard } from "./UserCard";
import { ChatGroupMaker } from "./ChatGroupMaker";
import { MyChats } from "./MyChats";
import { getUsers } from "../utils/users"; 

export const UserList = () => {
  const {id, role} = useAuth()
  const navigate = useNavigate();
  const controller = new AbortController()
  const axiosPrivate = useAxiosPrivate();
  const [searchTerm, setSearchTerm] = useState(''); 
  const [isGroupMakerOpen, setIsGroupMakerOpen] = useState(false);
  const fetchUsers = async() => {
    return getUsers(axiosPrivate, controller.signal);
  }
  
  const { data: users, isLoading, isError } = useApiQuery<User[], Error, User[]>(
    'users', 
    fetchUsers 
  ); 
  
  useEffect(() => {
    return () => {
      controller.abort(); 
    };
  }, []);
  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);
  
  const dataForFilterHook = users ?? []; 
  const roleFilteredData = role === Role.USER
    ? dataForFilterHook.filter((user : User) => user.role === Role.SUPERUSER )
    : dataForFilterHook;
  const filteredUsersByRole = useFilteredUsers(roleFilteredData);
  const finalFilteredUsers = filteredUsersByRole.filter((user: User) => 
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="user-list-status">Cargando usuarios...</div>;
  }
  
  if (isError) {
    return <div className="user-list-status user-list-error">Ha habido un error al cargar los usuarios.</div>;
  }
  
  const currentUser = users?.find((user: User) => user.id === id)
  const chats: ChatWitUsers[] = currentUser?.chats || [] 
  
  return (
    <section className="user-list-container">
      {role === Role.SUPERUSER ? (
        <>
          <Filters/>
          <Searcher 
            users={roleFilteredData} 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
        </>
      ) : null}   
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setIsGroupMakerOpen(prevState => !prevState)}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
           Iniciar Chat Grupal
        </button>
      </div>
      <ChatGroupMaker
        isOpen={isGroupMakerOpen} 
        onClose={() => setIsGroupMakerOpen(false)}
      />   
      {finalFilteredUsers.length === 0 ? (
        <div className="user-list-status">
          No se encontraron resultados para "{searchTerm}".
        </div>
      ) : (
        <ul className="user-cards-grid">
          {finalFilteredUsers.filter((user : User) => user.id !== id).map((user: User) => (
            <UserCard key={user.id} user={user} />
          ))}
        </ul>
      )}
      {chats.length > 0 && (  
        <MyChats chats={chats} />
      )}
    </section>
  );
}