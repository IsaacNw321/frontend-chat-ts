import { createContext, useState, type ReactNode } from "react";

interface Filters {
  role: string;
}

interface FiltersContextType {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

interface FiltersProviderProps {
  children: ReactNode;
}

export const FiltersProvider = ({ children }: FiltersProviderProps) => {
  const [filters, setFilters] = useState<Filters>({
    role: 'all'
  });

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};