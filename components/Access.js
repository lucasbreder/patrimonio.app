
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'

export default function Access({children}) {

  const [token, setToken] = useState()
  const router = useRouter()

  useEffect(() => {
    //Incluir metodo para validacaodo token via server-side
    const cookies = parseCookies()
    const tokenStorage = cookies.token

    
    setToken(tokenStorage)
    if (!tokenStorage) {
      router.push('/login')
    }
  }, [])
  

  if (token) {
    return children
  } else {
    return ''
  }
  
	
}
