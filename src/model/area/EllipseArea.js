export default class EllipseArea {
  constructor(X, Y, minRadius, maxRadius, angle) {
    this.X = parseFloat(X); // center X coordinate
    this.Y = parseFloat(Y); // center Y coordinate
    this.minRadius = parseFloat(minRadius);
    this.maxRadius = parseFloat(maxRadius);
    this.angle = parseFloat(angle);
  }
}
