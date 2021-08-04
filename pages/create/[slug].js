import axios from "axios"
import Create from "../../components/Create"
import nookies from 'nookies'

export default function CreateQuery({form, slug}) {

    return (
      <Create form={form} slug={slug}/>
    )

}

export async function getServerSideProps(ctx) {

  const cookies = nookies.get(ctx)

    const formRequest = await axios.options(`${process.env.NEXT_PUBLIC_API}${ctx.params.slug}`, {
      headers: {
        'Authorization': `bearer ${cookies.token}`
      }
    })
  
  const form = await formRequest.data
  const slug = ctx.params.slug
      
      if (!form) {
        return {
          notFound: true,
        }
      }
      
      return {
        props: {
          form,
          slug
        },
      }
  }