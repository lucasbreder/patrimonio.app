export default function varType(data) {
    
    const fileType = ['png', 'jpg', 'jpeg']

    if (typeof data === 'object') {
        return 'object'
       
    } else if ((typeof data === 'string')) {
        
        const reFileExt = /(?:\.([^.]+))?$/
        const ext = data.match(reFileExt)
        const reDate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
        const date = data.match(reDate)
        
        if (fileType.includes(ext[1])) {
            return 'file'
        }  else if (date) {
            return 'date'
        } else {
            return 'string'
        }
    }
}