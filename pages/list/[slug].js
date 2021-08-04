import axios from "axios"
import List from "../../components/List"
import nookies from 'nookies'
import ListBox from "../../components/ListBox"
import ListLoan from "../../components/ListLoan"

export default function ListQuery({list, slug}) {
  
  switch (slug) {
    case 'categories':
      return <ListBox data={list} slug={slug} />
    case 'locals':
      return <ListBox data={list} slug={slug} />
    case 'sublocals':
      return <ListBox data={list} slug={slug} />
    case 'loans':
      return <ListLoan data={list} slug={slug} />  
    default:
      return <List data={list} slug={slug} />
  }

}

export async function getServerSideProps(ctx) {

  const cookies = nookies.get(ctx)

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API}${ctx.params.slug}`, {
    headers: {
      'Authorization': `bearer ${cookies.token}`
    }
  })
  const list = await res.data
  const slug = ctx.params.slug
      
      if (!list) {
        return {
          notFound: true,
        }
      }
      
      return {
        props: {
          list,
          slug,
        },
      }
  }