import { UserList } from "../components/UsersList"
import "../styles/Dashboard.css"
import { FiltersProvider } from "../context/Filters"
export const Dashboard = () =>{
   return(
      <FiltersProvider>
      <main>
        <UserList  />
     </main>
      </FiltersProvider>
   )    
}