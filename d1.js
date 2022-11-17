const fs = require("fs");

const input = fs.readFileSync("d1.txt", { encoding: "utf-8" }).split(", ");

const changeDir = (dir, turn) => {
  switch (dir) {
    case "N":
      return turn == "R" ? "E" : "W";
    case "E":
      return turn == "R" ? "S" : "N";
    case "S":
      return turn == "R" ? "W" : "E";
    case "W":
      return turn == "R" ? "N" : "S";
    default:
      return dir;
  }
};

const deltas = {
  N: [0, 1],
  E: [1, 0],
  S: [0, -1],
  W: [-1, 0],
};

const solve = () => {
  let dir = "N";
  let xy = [0, 0];
  const vis = {};
  let p2 = 0;
  for (let i = 0; i < input.length; i++) {
    const [turn, ...d] = input[i].split("");
    const dist = d.join("");
    dir = changeDir(dir, turn);

    if (dir === "E") {
      for (let x = xy[0]; x < xy[0] + deltas[dir][0] * +dist; x++) {
        if (vis[`${x},${xy[1]}`] && p2 === 0) {
          p2 = Math.abs(x) + Math.abs(xy[1]);
        }
        vis[`${x},${xy[1]}`] = true;
      }
    }
    if (dir === "W") {
      for (let x = xy[0]; x > xy[0] + deltas[dir][0] * +dist; x--) {
        if (vis[`${x},${xy[1]}`] && p2 === 0) {
          p2 = Math.abs(x) + Math.abs(xy[1]);
        }
        vis[`${x},${xy[1]}`] = true;
      }
    }
    if (dir === "N") {
      for (let y = xy[1]; y < xy[1] + deltas[dir][1] * +dist; y++) {
        if (vis[`${xy[0]},${y}`] && p2 === 0) {
          p2 = Math.abs(xy[0]) + Math.abs(y);
        }
        vis[`${xy[0]},${y}`] = true;
      }
    }
    if (dir === "S") {
      for (let y = xy[1]; y > xy[1] + deltas[dir][1] * +dist; y--) {
        if (vis[`${xy[0]},${y}`] && p2 === 0) {
          p2 = Math.abs(xy[0]) + Math.abs(y);
        }
        vis[`${xy[0]},${y}`] = true;
      }
    }

    xy[0] = xy[0] + deltas[dir][0] * +dist;
    xy[1] = xy[1] + deltas[dir][1] * +dist;
  }

  return { p1: Math.abs(xy[0]) + Math.abs(xy[1]), p2 };
};

console.log(solve());
