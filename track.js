let trackRoadPic = document.createElement('img');
let trackWallPic = document.createElement('img');

const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_ROWS = 15;
const TRACK_COLUMNS = 20;
let trackGrid = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
  1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
  1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;

function drawTracks() {
  for (let i = 0; i < TRACK_ROWS; i++) {
    for (let j = 0; j < TRACK_COLUMNS; j++) {
      let trackIndex = trackIndexAtRowColumn(i, j);

      if (trackGrid[trackIndex] == TRACK_WALL) {
        drawBitmap(trackWallPic, TRACK_W * j, TRACK_H * i);
      } else if (trackGrid[trackIndex] == TRACK_ROAD) {
        drawBitmap(trackRoadPic, TRACK_W * j, TRACK_H * i);
      }
    }
  }
}

function handleTrackCollision() {
  let trackIndex = trackIndexAt(carX, carY);
  if (trackIndex >= 0 && trackIndex < trackGrid.length && carX > 0 && carX < canvas.width) {
    if (trackGrid[trackIndex] == 1) {
      carSpeed *= -0.25;

      // avoid getting stuck in this condition
      carX += Math.cos(carAng) * carSpeed;
      carY += Math.sin(carAng) * carSpeed;
    }
  }
}

function trackIndexAt(x, y) {
  let trackRowColumn = trackRowColumnAt(x, y);
  return trackIndexAtRowColumn(trackRowColumn.row, trackRowColumn.column);
}

function trackIndexAtRowColumn(row, column) {
  return (row * TRACK_COLUMNS) + column;
}

function trackRowColumnAt(x, y) {
  return {
    row: Math.floor(y / TRACK_H),
    column: Math.floor(x / TRACK_W)
  }
}

function loadTrackImages() {
  trackRoadPic.src = "track_road.png";
  trackWallPic.src = "track_wall.png";
}