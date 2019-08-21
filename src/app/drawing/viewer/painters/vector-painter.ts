import { Point2D } from '@app/structures/point';
import { Vector } from '@app/structures/vector';
import { CanvasManager } from '@app/canvas/canvas_manager';

export class VectorPainter {

  protected rgb: string = "255, 255, 255";
  protected arrowAngle: number = 50;
  protected canvasManager: CanvasManager;

  constructor(canvasManager: CanvasManager) {
    this.canvasManager = canvasManager;
  }

  public paint(vectors: Vector[]): void {
    this.canvasManager.setLineWidth(1);
    this.canvasManager.setStrokeStyle(`rgba(${this.rgb}, 1)`);

    vectors.forEach((v: Vector, i: number) => {
      if (!i)
        return;

      this.canvasManager.paintLine(v.start, v.end);
      this.paintVectorArrow(v, this.arrowAngle / 2);
      this.paintVectorArrow(v, -this.arrowAngle / 2);
    });
  }

  protected paintVectorArrow(v: Vector, rotation: number) {
    let len = v.length() * 0.1,
        angle = v.getReverseVector().direction() + (rotation * Math.PI / 180),
        x = v.end.x + (len * Math.cos(angle)),
        y = v.end.y + (len * Math.sin(angle));

    this.canvasManager.paintLine(v.end, new Point2D(x, y));
  }

}