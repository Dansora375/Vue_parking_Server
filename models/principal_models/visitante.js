import mongoose from 'mongoose'
// const Schema = mongoose.Schema
// const options_type = ['Carro', 'Moto', 'Ninguno']
const opts = {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
}
// Creando el Schema
const NewVisitorSche = new mongoose.Schema({
// Datos del visitante
  nombre: {
    type: String,
    required: [true, 'Nombre obligatorio']
  },
  cedula: {
    type: Number,
    required: [true, 'CC obligatorio']
  },

  // Datos sobre residencia a la que se dirige
  apto_num: {
    type: Number,
    required: [true, 'numero de apartamento obligatorio']
  },
  tower: String,

  // Datos sobre su vehiculo
  placa: {
    type: String,
    required: [true, 'Placa es obligatoria']
  },
  tipo: {
    type: String,
    enum: ['Carro', 'Moto', 'Ninguno'],
    default: ['Carro', 'Moto', 'Ninguno'].lastItem
  },
  datos_extra: String,

  ocupado: {
    type: Boolean,
    default: true
  },
  activo: {
    type: Boolean,
    default: true
  },
  // En cuanto se cree un nuevo ingreso de
  // visitante la fecha entrada sera establecida
  hora_entrada: {
    type: Date,
    default: Date.now
  },
  hora_salida: Date
  // Recordar agregar parqueadero

},
{ timestamps: true },
opts
)

// Creando el modelo
const Entrada_vehiculo = mongoose.model('Entrada_vehiculo', NewVisitorSche)

export default Entrada_vehiculo
