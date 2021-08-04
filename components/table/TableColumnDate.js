import Moment from 'react-moment';
import TableColumnTitleMobile from './TableColumnTitleMobile';

export default function TableColumnDate({ data, title }) {
    
    return (
        <td>
            <TableColumnTitleMobile title={title}/>
            <Moment format="DD/MM/YYYY HH:mm">
                {data}
            </Moment>
        </td>
    )
    
}