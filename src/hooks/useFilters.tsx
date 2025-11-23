import { useContext } from "react"
import { FiltersContext } from "../context/Filters";
import { type User } from "../types";
export const useFilteredUsers = (users : User[] | undefined) => { 
 const context = useContext(FiltersContext);

 if (!context) {
  throw new Error("useFilteredUsers must be used within a FiltersProvider");
 }
 const {filters} = context

 if (!users) {
  return [];
 }


 return users.filter((user : User)  => {
  return filters.role === 'all' || filters.role === user.role
 })
}