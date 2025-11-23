import { FiltersContext } from '../context/Filters';
import { useContext } from 'react';
import { Role } from '../types';

export const Filters = () => {
const context = useContext(FiltersContext);
if (!context) {
 throw new Error('Filters must be used within a FiltersProvider');
}
const { setFilters } = context;
const handleSelect = (e : React.ChangeEvent<HTMLSelectElement>) => {
 const newValue = e.target.value; 
  
 setFilters(prevState => ({
 ...prevState,
 role : newValue
 }))
}

return(
 <div className="filters-container">
    <select className="filter-select" onChange={handleSelect}>
        <option value="all">Todos los usuarios</option>
        <option value={Role.USER}>Estudiantes</option>
        <option value={Role.SUPERUSER}>Psicologos</option>
    </select>
 </div>
)
}