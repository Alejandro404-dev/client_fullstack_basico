// definimos los tipos del  formulario
export type FormValues = { name: string; price: number } 


// tipo de datos que el server (backend) nos va a devolver en el listado y tambien al crear
export type Product =  FormValues & { id: number }


