import { useState , useEffect } from 'react';

// Definimos dos tipos de datos: Data y ErrorType.
type Data <T> = T | null;
type ErrorType = Error | null;

// Params es un objeto que contiene tres propiedades: 
// data, loading y error. 
// La propiedad data es de tipo Data<T>, que es un tipo genérico que puede ser cualquier tipo de dato o null. 
// La propiedad loading es un booleano que indica si la solicitud de datos está en curso. 
// La propiedad error es de tipo ErrorType, que puede ser un objeto de error o null.
interface Params<T> {
  data: Data<T>;
  loading: boolean;
  error: ErrorType | null;  
}

// Este es un Hook personalizado llamado useFetch 
// acepta una URL como argumento y devuelve un objeto 
// con las propiedades data, loading y error.
export const useFetch = <T,>(url: string): Params<T> => {

    const controller = new AbortController();


    const [data, setData] = useState<Data<T>>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ErrorType>(null);

    useEffect(() => {
        // La función fetchData es una función asíncrona que realiza la solicitud de datos 
        // a la URL proporcionada.
        const fetchData = async () => {
            try {
                const response = await fetch(url,controller);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result: T = await response.json();
                setData(result);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };


        fetchData();

        return () => {
            controller.abort();
        }
    }, [ url]);
    return { data, loading, error };
};
