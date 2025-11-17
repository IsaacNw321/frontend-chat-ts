import { UserList } from "../components/UsersList"
import "../styles/Dashboard.css"
import useAuth from "../hooks/useAuth"
export const Dashboard = () =>{
   const {id} = useAuth()
   console.log(id)
   return(
      <main>
        <UserList  />
     </main>
   )    
}