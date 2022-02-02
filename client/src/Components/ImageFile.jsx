import redPanda from "../ImagesAnimals/redPanda.jpg"
import ostrich from "../ImagesAnimals/ostrich.jpg"
import lizard from "../ImagesAnimals/lizard.jpg"
import greyWolf from "../ImagesAnimals/greyWolf.jpg"
import baldEagle from "../ImagesAnimals/baldEagle.jpg"
import alpineIbex from "../ImagesAnimals/alpineIbex.jpg"
import walrus from "../ImagesAnimals/walrus.jpg"
import greatGreyOwl from "../ImagesAnimals/greatGreyOwl.jpg"
import commonChameleon from "../ImagesAnimals/commonChameleon.jpg"
import grasshopper from "../ImagesAnimals/grasshopper.jpg"
import honeybee from "../ImagesAnimals/honeyBee.jpg"
import killerWhale from "../ImagesAnimals/killerWhale.jpg"
import poisonDartFrog from "../ImagesAnimals/poisonDartFrog.jpg"
import seaOtter from "../ImagesAnimals/seaOtter.jpg"
import obstacleCourse from "../ImagesDisciplines/obstacleCourse.jpg"
import rockClimbing from "../ImagesDisciplines/rockClimbing.jpg"
import sheepHerding from "../ImagesDisciplines/sheepHerding.jpg"

export default function ImageFile(name) {
  if (name == "Red Panda") {
    return redPanda
  } else if (name == "Ostrich") {
    return ostrich
  } else if (name == "Great Grey Owl") {
    return greatGreyOwl
  } else if (name == "Basilisk Lizard") {
    return lizard
  } else if (name == "Grey Wolf") {
    return greyWolf
  } else if (name == "Alpine Ibex") {
    return alpineIbex
  } else if (name == "Bald Eagle") {
    return baldEagle
  } else if (name == "Walrus") {
    return walrus
  } else if (name == "Common Chameleon") {
    return commonChameleon
  } else if (name == "Grasshopper") {
    return grasshopper
  } else if (name == "Honey Bee") {
    return honeybee
  } else if (name == "Killer Whale") {
    return killerWhale
  } else if (name == "Poison Dart Frog") {
    return poisonDartFrog
  } else if (name == "Sea Otter") {
    return seaOtter
  } else if (name == "Obstacle Course") {
    return obstacleCourse
  } else if (name == "Rock Climbing") {
    return rockClimbing
  } else if (name == "Sheep Herding") {
    return sheepHerding
  }
}
