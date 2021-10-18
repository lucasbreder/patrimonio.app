module.exports = {
  module: {
    loaders: [
      {
        test: /plugin\.css$/,
        loaders: ['style-loader', 'css'],
      },
    ],
  },
  env: {
    NEXT_PUBLIC_NAME: "Patrimonio",
    NEXT_PUBLIC_LANGUAGE: 'pt-br',
    NEXT_BASE_PATH: "http://localhost:3000",
    NEXT_PUBLIC_API: "https://patrimonio-321811.uc.r.appspot.com",
    NEXT_PUBLIC_NAME_STORAGEBASEURL: "https://storage.googleapis.com/patrimonio-321811.appspot.com/",
    NEXT_PUBLIC_EXCLUDEFROMLIST: ['id', 'description', 'features', 'check_default', 'content', 'project', 'text', 'path', 'file', 'speech', 'remember_me_token', 'testimony', 'user_id', 'update_user_id', 'created_at', 'updated_at', 'baseMaterial', 'serial_number', 'management', 'subitem', 'price'],
    NEXT_PUBLIC_FOREIGNKEYLIST: ['update_user_id', 'user_id', 'unit_id', 'category_id', 'local_id', 'sublocal_id', 'destination_user_id', 'destination_unit_id', 'material_id', 'base_material_id'],
    NEXT_PUBLIC_BOOLEANLIST: ['active', 'feature', 'terms'],
    NEXT_PUBLIC_ROUTES: [
      {
        title: "Materiais Modelo",
        path: "/base_materials",
        icon: "box"
      },
      {
        title: "Categorias",
        path: "/categories",
        icon: "tag"
      },
      {
        title: "Materiais da Unidade",
        path: "/materials",
        icon: "unit"
      },
      {
        title: "Locais da Unidade",
        path: "/locals",
        icon: "door"
      },
      {
        title: "SubLocais da Unidade",
        path: "/sublocals",
        icon: "tools"
      },
      {
        title: "Cautelas",
        path: "/loans",
        icon: "doc"
      },
      {
        title: "Usuarios",
        path: "/users",
        icon: "users"
      },
      {
        title: "Checagem",
        path: "/check",
        icon: "check"
      },
      {
        title: "Imagens",
        path: "/pictures",
        icon: "image"
      },

    ]
  },
    
}