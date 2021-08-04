import axios from "axios"
import nookies from 'nookies'
import Details from "../../../components/Details"


export default function DetailsQuery({data}) {

    return (
      <Details data={data}/>
    )

}

export async function getServerSideProps(ctx) {

  const cookies = nookies.get(ctx)

  
  const resRequest = await axios.get(`${process.env.NEXT_PUBLIC_API}${ctx.params.slug}/${ctx.params.id}`, {
    headers: {
      'Authorization': `bearer ${cookies.token}`
    }
  })
  const data = resRequest.data

      
      if (!data) {
        return {
          notFound: true,
        }
      }
      
      return {
        props: {
          data,
        },
      }
  }