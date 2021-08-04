import axios from "axios"
import Edit from "../../../components/Edit"
import nookies from 'nookies'


export default function EditQuery({form, data, slug}) {

    return (
      <Edit data={data} form={form} slug={slug}/>
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
  const slug = ctx.params.slug

    const formRequest = await axios.options(`${process.env.NEXT_PUBLIC_API}${ctx.params.slug}`, {
      headers: {
        'Authorization': `bearer ${cookies.token}`
      }
    })
  
    const form = await formRequest.data
      
      if (!data) {
        return {
          notFound: true,
        }
      }
      
      return {
        props: {
          form,
          data,
          slug
        },
      }
  }