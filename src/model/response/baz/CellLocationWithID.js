export default class CellLocationWithID {
  constructor(cellId, X, Y, angle, adres) {
    this.cellId = cellId;
    this.X = parseFloat(X); // center X coordinate
    this.Y = parseFloat(Y); // center Y coordinate
    // angle of the cell, if 0 than its a full circle,
    // if angle exist, draw default sector, see Constants,
    // default angle limit is +-32, and default radius is 100m
    this.angle = parseFloat(angle);

    this.adres = adres;
  }
}
