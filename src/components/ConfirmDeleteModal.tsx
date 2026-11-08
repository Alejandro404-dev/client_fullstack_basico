import * as Dialog from "@radix-ui/react-dialog"
import type { Product } from "../types"

type ConfirmDeleteModalProp = {
    open: boolean            // abrir o cerrar el modal
    onCancel: () => void     //cerrar sin eliminar
    onConfirm: () => void    //confirmar eliminacion
    product: Product         //Producto a eliminar
    busy?: boolean           //deshabilita botnes mientras elimina
}


export default function ConfirmDeleteModal({ open, onCancel, onConfirm, product, busy = false }: ConfirmDeleteModalProp) {
    return (
        <Dialog.Root open={open} >
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 " />

                <Dialog.Content
                    className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md rounded-2xl bg-white p-6 shadow-xl focus:outline-none "
                >
                    <Dialog.Title className="text-xl font-semibold text-slate-900" >
                        Eliminar el producto #{product.id}?
                    </Dialog.Title>

                    <Dialog.Description>
                        Esta accion es permanente y no se puede deshacer. Se eliminara el producto {""}
                        <span className="font-bold " > {product.name} </span> (${product.price})
                    </Dialog.Description>

                    <div className="mt-6 flex justify-end gap-2" >
                        <Dialog.Close asChild>
                            <button
                                type="button"
                                onClick={onCancel}
                                className=" px-4 py-2 rounded-xl border bg-slate-400 border-slate-300 text-slate-700 hover:bg-slate-300 disabled:opacity-60 cursor-pointer "
                            >
                                Cancelar
                            </button>
                        </Dialog.Close>

                        <button
                            type="button"
                            onClick={onConfirm}
                            className="px-4 py-2 rounded-xl text-white bg-red-600 hover:bg-red-700 disabled:opacity-60 cursor-pointer "
                        >
                            {busy ? "Eliminando..." : "Eliminar"}
                        </button>
                    </div>
                </Dialog.Content>

            </Dialog.Portal>
        </Dialog.Root>
    )
}
