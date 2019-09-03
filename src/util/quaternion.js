const Quaternion = require('quaternion')
const qte = require('quaternion-to-euler')

const turn = (orientation, direction, angle) => {
    console.log('got quat: ', orientation, ' and angle: ', angle)
    const quaternionList = [orientation.y, orientation.x, orientation.z, orientation.w]
    let eulerOrientation = qte(quaternionList)
    const quaterionTurn = (angle / 360) * (2 * Math.PI)
    console.log('quat Turn: ', quaterionTurn)
    console.log('eulerwinkel: ', eulerOrientation)
    console.log('Y: ', (eulerOrientation[0] / (2 * Math.PI))  * 360)
    console.log('X: ', (eulerOrientation[1] / (2 * Math.PI))  * 360)
    console.log('z: ', (eulerOrientation[2] / (2 * Math.PI))  * 360)
    switch (direction) {
        case 'y':
            eulerOrientation[0] += quaterionTurn
            break
        case 'x':
            eulerOrientation[1] += quaterionTurn
            break
        case 'z':
            eulerOrientation[2] += quaterionTurn
            break
        default:
            break
    }
    let newQuat = Quaternion.fromEuler(eulerOrientation[0], eulerOrientation[1], eulerOrientation[2], "YXZ")
    console.log('Y after: ', (eulerOrientation[0] / (2 * Math.PI))  * 360)
    console.log('X after: ', (eulerOrientation[1] / (2 * Math.PI))  * 360)
    console.log('z after: ', (eulerOrientation[2] / (2 * Math.PI))  * 360)
    // newQuat.w = orientation.w
    console.log('computed quaternion: ', newQuat)
    return newQuat
}

export default {
    turn
}
