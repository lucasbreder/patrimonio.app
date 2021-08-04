import { useRouter } from "next/router";
import DetailsBaseMaterial from "./DetailsBaseMaterial";
import DetailsMaterial from "./DetailsMaterial";

export default function Details({ data }) {
    const path = useRouter()
    
    switch (path.query.slug) {
        case 'base_materials':
            return <DetailsBaseMaterial data={data} />
        case 'materials':
            return <DetailsMaterial data={data}/>
    
        default:
            return <DetailsBaseMaterial data={data}/>
    }

}