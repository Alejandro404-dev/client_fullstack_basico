import * as Dialog from "@radix-ui/react-dialog";
import { type FormValues, type Product } from "../types";
import { useForm } from "react-hook-form";

type EditProductModalProps = {
    open: boolean         // abrir o cerrar el modal
    product: Product      // Tenemos el componente que se monta solo si hay producto
    busy?: boolean        // Bloquea inputs o botones mientras guardamos cambios
    onCancel: () => void  // Cierra sin guardar
    onSubmit: (changes: Partial<FormValues>) => void //Devuelve solo lo que cambio
}

export default function EditProductModal({ open, product, busy = false, onCancel, onSubmit }: EditProductModalProps) {

    const { register, handleSubmit, formState: { errors, isDirty, dirtyFields }, reset } = useForm<FormValues>({
        mode: "onTouched",
        values: {
            name: product.name,
            price: product.price as unknown as number,
        }
    })


    const submit = (data: FormValues) => {
        const changes: Partial<FormValues> = {}

        //si toco el nombre - se envia sin espacio a los costados
        if (dirtyFields.name) {
            changes.name = data.name.trim()

        }

        //si toco el precio - se envia como numero
        if (dirtyFields.price) {
            changes.price = Number(data.price)

        }

        //si no retorna nada - no enviamos nada
        if (Object.keys(changes).length === 0) return

        // Entregamos los cambios al padre que es el que hace el patch real
        onSubmit(changes)


    }


    return (
        <Dialog.Root open={open} >
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 " />

                <Dialog.Content
                    className=" fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw, 28rem)] max-h-[85vh] overflow-auto rounded-2xl bg-white p-6 shadow-xl focus:outline-none "
                >
                    <Dialog.Title className="text-xl font-semibold text-slate-900 " >
                        Editar Producto Numero: {product.id}
                    </Dialog.Title>
                    <Dialog.Description className="mt-1 text-slate-600 " >
                        Modifica uno o ambos campos. Solo se enviara lo que cambies.
                    </Dialog.Description>

                    <form onSubmit={handleSubmit(submit)} className="mt-4 space-y-4 " >
                        <div>
                            <label className="block text-sm mb-1 text-slate-700 " >Nombre</label>
                            <input
                                className=" w-full rounded-xl border-slate-300 px-3 py-2 focus:outline-none focus:ring-blue-500 "
                                placeholder="Nombre del producto"
                                {...register("name", {
                                    validate: (validar) => {
                                        if (!dirtyFields.name) return true // si no lo toco - retornamos un true (no molesta, dejalo tranquilo)
                                        return validar.trim().length > 0 || "El nombre no puede quedar vacio" //si si lo toco exigir que no quede vacio
                                    }
                                })}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-700 " >{(String(errors.name.message))}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm mb-1 text-slate-700 " >Precio</label>
                            <input
                                className=" w-full rounded-xl border-slate-300 px-3 py-2 focus:outline-none focus:ring-blue-500 "
                                placeholder="12.5"
                                {...register("price", {
                                    valueAsNumber: true,
                                    validate: (validar) => {
                                        if (!dirtyFields.price) return true  // si no lo toco - retornamos un true (no molesta, dejalo tranquilo)
                                        return (Number.isFinite(validar) && Number(validar) > 0 || "el precio debe ser > 0 ")
                                    }
                                })}
                            />
                            {errors.price && (
                                <p className="mt-1 text-sm text-red-700 " >{(String(errors.price.message))}</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 pt-2 " >
                            <Dialog.Close asChild>
                                <button
                                    className="px-4 py-2 rounded-xl bg-slate-300 text-slate-700 hover:bg-slate-400 disabled:opacity-60"
                                    onClick={() => { reset(); onCancel() }}
                                    type="button"
                                >
                                    Cancelar
                                </button>
                            </Dialog.Close>

                            <button
                                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 "
                                type="submit"
                                disabled={busy || !isDirty}
                            >
                                {busy ? "Guardando..." : "Guardar cambios"}
                            </button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
