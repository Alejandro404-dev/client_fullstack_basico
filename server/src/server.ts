//conectarnos a un puerto y darle la conexion
import app from "./index"

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`)
})

/*
En desarrollo (local) el servidor utilizara el 3000

    Por que igual se pone process.env.PORT ?
    Esta pensado para cuando subas tu backend a produccion. ahi, la plataforma le pasa al servidor un puerto propio a traves de una variable.
    que pasa si no la pusieramos?
    Si no pusieramos, y dejaramos fijo el 3000, en la nube podria fallar porque la plataforma no usaria el puerto que espera

*/