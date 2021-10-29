import ListQRCode from "../components/ListQRCode"
import nookies from 'nookies'
import axios from "axios"

export default function QRCodes({list}) {

  return <ListQRCode data={list} />
}

export async function getServerSideProps(ctx) {

  const cookies = nookies.get(ctx)

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API}materials/?perPage=all`, {
    headers: {
      'Authorization': `bearer ${cookies.token}`
    }
  })
  const list = await res.data.data ? res.data.data : res.data
      
      if (!list) {
        return {
          notFound: true,
        }
      }
      
      return {
        props: {
          list,
        },
      }
  }