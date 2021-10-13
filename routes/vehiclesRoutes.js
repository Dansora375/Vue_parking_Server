import express from 'express'
import vehiculo from '../models/vehiculo'
import parqueadero from '../models/Parqueadero'
import Residente from '../models/principal_models/residente'
const router = express.Router()

router.post('/vehiculos', async (req, res) => {
  const {
    placa,
    marca,
    color,
    tipo,
    datos_extra,
    parkingName,
    homeOwnerCC
  } = req.body

  // console.log(parkingName)
  // que pasara si no se ingresa el nombre del parqueadero porque no tiene.Y solucionado

  parqueadero.findOne({ nombre_Parqueadero: parkingName }, async (err, data) => {
    if (err) {
      return
    } if (data) {
      const traerParking = await parqueadero.findOne({ nombre_Parqueadero: parkingName })

      const traerResiednt = await Residente.findOne({ cedula: homeOwnerCC })

      const newvehicle = new vehiculo({
        placa,
        marca,
        color,
        tipo,
        datos_extra,
        parqueadero: traerParking._id,
        ResidentOwner: traerResiednt._id,
        haveParq: true
      })
      try {
        const saveVehicle = await newvehicle.save()

        traerParking.vehiculo = saveVehicle._id
        await traerParking.save()

        traerResiednt.vehiculo = traerResiednt.vehiculo.concat(saveVehicle._id)
        // lo siguiente se hara mientras se encuntra como hacer deepsearhc
        await traerResiednt.save()

        res.status(200).json(saveVehicle)
      } catch (error) {
        return res.status(500).json({
          mensaje: ` Ocurrio un error al crear un vehiculo', ${error}`,
          error
        })
      }
    } else {
      const traerResiednt = await Residente.findOne({ cedula: homeOwnerCC })
      // Quedan por realizar mas confirmaciones, como por ejemplo si el CC que se da no existe o no coincide, posteriormente implmentar
      const newvehicle = new vehiculo({
        placa,
        marca,
        color,
        tipo,
        datos_extra,
        ResidentOwner: traerResiednt._id

      })
      try {
        const saveVehicle = await newvehicle.save()

        traerResiednt.vehiculo = traerResiednt.vehiculo.concat(saveVehicle._id)
        await traerResiednt.save()

        res.status(200).json(saveVehicle)
      } catch (error) {
        return res.status(500).json({
          mensaje: `Ocurrio un error al crear un vehiculo', ${error}`,
          error
        })
      }
    }
  })
})

router.get('/vehiculos', async (req, res) => {
  try {
    const vehiculos = await vehiculo.find({})
      .populate('parqueadero', {
        nombre_Parqueadero: 1
      })
      .populate('ResidentOwner', {
        nombre: 1,
        cedula: 1
      })
    res.status(200).json(vehiculos)
  } catch (error) {
    return res.status(400).json({
      mensaje: `Ocurrio un error', ${error}`, error
    })
  }
})

module.exports = router
