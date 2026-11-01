import { useForm } from "react-hook-form"
import { useCreateProduct } from "../api/products.hook"
import type { FormValues } from "../types"

export default function ProductNew() {

  //1- HOOK para el post
  const create = useCreateProduct()

  //2- Creamos el formulario con react-hook-form y extraemos sus herramientas mediante destructuring
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isValid } } = useForm<FormValues>({
    mode: "onTouched", // valida cuando el usuario salio del input
    defaultValues: { name: "", price: undefined as unknown as number } // valores iniciales
  })

  // 3 - Que es lo que sucede al enviar el formulario
  const onSubmit = (valor: FormValues) =>
    new Promise<void>((resolver) => {
      create.mutate(
        { name: valor.name.trim(), price: valor.price },
        {
          onSuccess: () => { reset(); resolver() },
          onError: () => { resolver() }
        })
    })

  return (
    <section className="bg-white border border-b-slate-200 rounded-2xl p-4 max-w-lg " >
      <h2 className="text-xl font-semibold text-slate-900 mb-3 text-center " >Nuevo producto</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-3 "
      >
        <div>
          <label className="grid gap-1" >
            <span className="text-sm text-slate-700" >Nombre</span>
            <input
              className=" px-3 py-2 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-300  "
              placeholder="Lapicera"
              {...register("name", {
                required: "El nombre es obligatorio",
                validate: (validamos) => validamos.trim().length > 0 || "El nombre no puede estar vacio"
              })}
              disabled={isSubmitting || create.isPending}//  bloqueamos mientras envia
            />
            {errors.name && <p className="mt-1 text-sm text-amber-700 " >{errors.name.message} </p>}
          </label>
        </div>

        <div>
          <label className="grid gap-1" >
            <span className="text-sm text-slate-700">Precio</span>
            <input
              type="text"
              inputMode="decimal"
              className=" px-3 py-2 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-300  "
              placeholder="10.50"
              {...register("price", {
                valueAsNumber: true,
                required: "El precio es obligatorio",
                validate: (validamos) => Number.isFinite(validamos) && validamos > 0 ? true : "El precio debe ser mayor a 0"
              })}
              disabled={isSubmitting || create.isPending}//  bloqueamos mientras envia
            />
            {errors.price && <p className="mt-1 text-sm text-amber-700 " >{errors.price.message} </p>}
          </label>
        </div>

        <div className="flex justify-end " >
          <button
            type="submit"
            className="px-4 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-800 disabled:opacity-60 font-semibold hover:cursor-pointer  "
            disabled={isSubmitting || create.isPending || !isValid}//  Se desactiva si se esta enviando o hay errores
          >
            {create.isPending || isSubmitting ? "Creando..." : "crear"}
          </button>
        </div>
      </form>
    </section>
  )
}
