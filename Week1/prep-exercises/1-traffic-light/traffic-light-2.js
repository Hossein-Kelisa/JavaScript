"use strict";

const trafficLight = {
  possibleStates: ["green", "orange", "red"],
  stateIndex: 0,
};

let cycle = 0;

while (cycle < 2) {
  const currentState = trafficLight.possibleStates[trafficLight.stateIndex];
  console.log("The traffic light is on", currentState);

  if (currentState === "green") {
    trafficLight.stateIndex = 1; // go to orange
  } else if (currentState === "orange") {
    trafficLight.stateIndex = 2; // go to red
  } else if (currentState === "red") {
    cycle += 1; // when red light is on cycle increase 1
    trafficLight.stateIndex = 0; // again go to green
  }
}