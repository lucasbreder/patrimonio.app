export default function fieldToSlug(string) {
    const slugs = {
        'category': 'categories',
        'user_id': 'users',
        'update_user_id': 'users',
        'unit_id': 'units',
        'destination_unit_id': 'units',
        'destination_user_id': 'users',
        'category_id': 'partnercategories',
        'local_id': 'locals',
        'sublocal_id': 'sublocals',
        'base_material_id': 'base_materials',
        'material_id': 'materials'
    }

    const slug = slugs[string]

    if (slug) {
        return slug
    }
    return string
}