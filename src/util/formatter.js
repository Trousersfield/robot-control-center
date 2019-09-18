const qte = require('quaternion-to-euler')

const toEuler = quat => {
  if (!quat) return
  let eulerOri = qte([quat.y, quat.x, quat.z, quat.w])
  let formattedOri = {
    Y: `${((eulerOri[0] / (2 * Math.PI))  * 360).toFixed(6)}\xB0`,
    X: `${((eulerOri[1] / (2 * Math.PI))  * 360).toFixed(6)}\xB0`,
    Z: `${((eulerOri[2] / (2 * Math.PI))  * 360).toFixed(6)}\xB0`
  }
  return formattedOri
}

const prettyPos = pos => {
  if (!pos) return
  let formattedPos = {
    Y: pos.y.toFixed(6),
    X: pos.x.toFixed(6),
    Z: pos.z.toFixed(6)
  }
  return formattedPos
}

const prettyOrientation = (ori, toAngle = false) => {
  if (!ori) return
  let formattedOri = toAngle ? toEuler(ori) : {
    Y: ori.y.toFixed(6),
    X: ori.x.toFixed(6),
    Z: ori.z.toFixed(6),
    W: ori.w.toFixed(6)
  }
  return formattedOri
}

const prettyJoints = (joints) => {
  if (!joints) return
  let formattedJoints = {}
  Object.keys(joints).forEach(key => {
    formattedJoints[key] = joints[key].toFixed(6)
  })
  return formattedJoints
}

const prettyGripper = gripper => {
  if (!gripper) return
  let formattedGripper = {
    'Name': gripper.name[0],
    'Effort': gripper.effort,
    'Position': `${gripper.position[0].toFixed(3)} | ${gripper.position[1].toFixed(3)}`,
    'Velocity': gripper.velocity
  }
  return formattedGripper
}

export default {
  prettyPos, prettyOrientation, prettyJoints, prettyGripper
}
