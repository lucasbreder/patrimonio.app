export default function filterSet(slug) {
    const filters = {
        base_materials: [
            {
                title: "Salvamento",
                term: "category_id",
                value: "1"
            },
            {
                title: "APH",
                term: "category_id",
                value: "2"
            },
            {
                title: "Todos",
                term: "",
                value: ""
            } 
        ],
        sublocals: [
            {
                title: "Deposito 1",
                term: "local_id",
                value: "1"
            },
            {
                title: "ASE",
                term: "local_id",
                value: "2"
            },
            {
                title: "Todos",
                term: "",
                value: ""
            } 
        ],
        loans: [
            {
                title: "Devolvido",
                term: "status",
                value: "Devolvido"
            },
            {
                title: "Cedido",
                term: "status",
                value: "Cedido"
            },
            {
                title: "Atrasado",
                term: "status",
                value: "Atrasado"
            },
            {
                title: "Todos",
                term: "",
                value: ""
            } 
        ],
        materials: [
            {
                title: "Cedido",
                term: "status",
                value: "Cedido"
            },
            {
                title: "Ativo",
                term: "status",
                value: "Ativo"
            },
            {
                title: "Inativo",
                term: "status",
                value: "Inativo"
            },
            {
                title: "Doado",
                term: "status",
                value: "Doado"
            },
            {
                title: "Inutilizado",
                term: "status",
                value: "Inutilizado"
            },
            {
                title: "Todos",
                term: "",
                value: ""
            } 
        ]
    }

    if (slug) {
        return filters[slug]
    }

}