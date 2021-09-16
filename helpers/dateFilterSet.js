export default function dateFilterSet(slug) {
    const filters = {
        loans: [
            {
                title: "Devolução entre",
                term: "devolutionStart",
            },
            {
                title: "e",
                term: "devolutionEnd",
            },
            {
                title: "Criação entre",
                term: "createStart",
            },
            {
                title: "e",
                term: "createEnd",
            }
        ]
    }

    if (slug) {
        return filters[slug]
    }

}