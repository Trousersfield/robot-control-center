const qte = require('quaternion-to-euler')

const toEuler = quat => {
  let eulerOri = qte([quat.y, quat.x, quat.z, quat.w])
  let formattedOri = {
    Y: `${((eulerOri[0] / (2 * Math.PI))  * 360).toFixed(6)}\xB0`,
    X: `${((eulerOri[1] / (2 * Math.PI))  * 360).toFixed(6)}\xB0`,
    Z: `${((eulerOri[2] / (2 * Math.PI))  * 360).toFixed(6)}\xB0`
  }
  return formattedOri
}

const prettyPos = pos => {
  let formattedPos = {
    Y: pos.y.toFixed(6),
    X: pos.x.toFixed(6),
    Z: pos.z.toFixed(6)
  }
  return formattedPos
}

const prettyOrientation = (ori, toAngle = false) => {
  let formattedOri = toAngle ? toEuler(ori) : {
    Y: ori.y.toFixed(6),
    X: ori.x.toFixed(6),
    Z: ori.z.toFixed(6),
    W: ori.w.toFixed(6)
  }
  return formattedOri
}

export default {
  prettyPos, prettyOrientation
}
