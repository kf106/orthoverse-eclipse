THREE = require('three')

const x=0
const y=0
const z=0

  const sunDist = 610
  const moonDist = 600
  // orbit raise factor
  const sunH = Math.cos(2 * Math.PI * 4000 / 24000) * sunDist
  const moonH = Math.cos(2 * Math.PI * 4000 / 24000) * moonDist

  function sunPositionCalculation (age) {
    const time = age % 24000
    const day = Math.floor(age/24000)
    if (typeof x === 'undefined') {
      return { pos: { x: 0, y: -1 * sunDist, z: 0 } }
    }
    const theta =
      Math.PI / 4 +
      (
        ((
          Math.floor(day / 180) / 2 === Math.floor(Math.floor(day / 180) / 2)
            ? day % 180 + 1
            : 180 - (day % 180)
        ) / 180) *
        Math.PI / 4
      )
    // const theta = Math.PI/2
    const rads = ((time / 24000) * 2 * Math.PI)
    const sunX =
      x +
      Math.sin(rads) * sunDist
    const sunY =
      (-1 * Math.cos(rads) * Math.sin(theta) * sunDist)
      + sunH
      // + y
    const sunZ = z - (Math.cos(theta) * Math.cos(rads) * (sunDist + sunH))
    return { pos: {x: sunX, y: sunY, z: sunZ } }
  }

  function moonPositionCalculation (age) {
    const time = (age + 6000) % 20000
    const day = Math.floor(age/24000)
    if (typeof x === 'undefined') {
      return { pos: {x: 0, y: -1 * moonDist, z: 0 } }
    }
    const theta =
      Math.PI / 6 +
      (
        ((
          Math.floor(day / 14) / 2 === Math.floor(Math.floor(day / 14) / 2)
            ? day % 14 + 1
            : 14 - (day % 14)
        ) / 14)
        * Math.PI / 2
      )
    const rads = ((time / 20000) * 2 * Math.PI)
    const moonX =
      x +
      Math.sin(rads) * moonDist
    const moonY =
      (-1 * Math.cos(rads) * Math.sin(theta) * moonDist)
      + moonH
      // + y
    const moonZ = z - (Math.cos(theta) * Math.cos(rads) * (moonDist + moonH))
    return  { pos: { x: moonX, y: moonY, z: moonZ } }
  }

for (let time = 0; time < 360*24000*10; time++) {
      sunP = sunPositionCalculation(time)
      moonP = moonPositionCalculation(time)

      // calculate eclipse conditions
      const playerPos3 = new THREE.Vector3(
        0,
        0,
        0
      )
      const sunDir = (new THREE.Vector3().subVectors(playerPos3, sunP.pos)).normalize()
      const moonDir = (new THREE.Vector3().subVectors(playerPos3, moonP.pos)).normalize()
      const angle = moonDir.angleTo(sunDir)

      // eclipse affects daylight if angle between sun and moon is < 0.02
      if (angle < 0.02) {
        intensity = Math.abs((angle * 50)) * Math.abs((angle * 50))
        console.log(time, intensity, sunP.pos.y)
        time = time + 20000
      }

}
