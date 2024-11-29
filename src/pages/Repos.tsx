

import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

export type Repository ={
    full_name:string;
    description:string;
  }
  
export function Repos() {

    const {data, isFetching} = useQuery<Repository[]>('repos', async () =>{
      const response = await axios.get('https://api.github.com/users/CamilaPrado27/repos')
      return response.data
    }, {
      refetchOnWindowFocus: true,
        //quanto tempo quero manter os dados em cache
      staleTime: 1000 * 60, //1min
    })
    
  
    return (
      <>
        <ul>
          {isFetching && <p>Carregando...</p>}
          {data?.map(repo =>{
            return(
              <li key={repo.full_name}>
                <Link to={`repo/${repo.full_name}`}>{repo.full_name}</Link>
                <p>{repo.description}</p>
              </li>
            )
          })}
        </ul>
      </>
    )
  }