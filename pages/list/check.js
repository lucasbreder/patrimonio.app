import axios from "axios"
import nookies from 'nookies'
import Check from "../../components/Check"

export default function CheckQuery({locals}) {
  
  return <Check locals={locals} />

}

export async function getServerSideProps(ctx) {

  const cookies = nookies.get(ctx)

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API}locals`, {
    headers: {
      'Authorization': `bearer ${cookies.token}`
    }
  })
  const locals = await res.data
      
      if (!locals) {
        return {
          notFound: true,
        }
      }
      
      return {
        props: {
          locals,
        },
      }
  }