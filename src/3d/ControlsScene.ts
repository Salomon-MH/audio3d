/**
 * @author Niklas Korz
 */
import {
  BoxGeometry,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Plane,
  PlaneGeometry,
  Raycaster,
  Scene,
  SphereGeometry,
  Vector3
} from "three";

// The object drag direction is required for calculating the plane to ray cast
// against later on. Also, of course, to determine whether the object should be
// moved on one or two axes.
export enum ObjectDragDirection {
  AxisX,
  AxisY,
  AxisZ,
  PlaneYZ,
  PlaneXZ,
  PlaneXY
}

export interface ControlsOptions {
  onTranslate(position: Vector3): void;
  onScale(scale: Vector3): void;
}

// Inspired by https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/TransformControls.js
// As in the example, we are using ray casting for calculating the movements of planes and axes.
// Everything else in this implementation has resulted either from trial and error or by
// consulting the Three.js documentation.
// The controls are grouped as a scene instead of a group object to allow drawing
// them separately, on top of the main scene, to avoid any controls to be obscured
// by objects that would theoretically appear in front of them based on their Z coordinate.
// Furthermore, the scene's position is set to the active mesh's when one is
// selected. This way, coordinates in the controls scene are always relative to the
// active mesh.
// Theoretically, it could also be added as a child node to the active mesh,
// but this would result in the rotation being copied as well, which is not desirable
// in this case.
// Beware though that intersection points are always given in absolute world coordinates.
export default class ControlsScene extends Scene {
  activeMesh: Mesh | null = null;
  objectDragDirection: ObjectDragDirection | null = null;
  isScaling: boolean = false;
  // The drag offset is used to determine the distance of the point where the
  // user started dragging and the center of the object.
  // This way, the cursor will always have the same relative position to the
  // object while dragging.
  dragOffset = new Vector3();

  // In contrast to the Three.js example, we will be using a real plane instead of a
  // mesh that only represents an area on a plane.
  // As a consequence, the ray generated by the ray caster will be used directly
  // for calculating the intersection.
  plane = new Plane();

  // The visual controls
  axisX: Mesh;
  axisY: Mesh;
  axisZ: Mesh;
  planeYZ: Mesh;
  planeXZ: Mesh;
  planeXY: Mesh;

  constructor(private options: ControlsOptions) {
    super();

    // Setup visual controls for transformation

    const materialConfig = {
      transparent: true,
      opacity: 0.75,
      side: DoubleSide // Needed to make the planes viewable from both sides
    };

    // The X, Y and Z axes, represented as cuboids

    const axisGeometry = new BoxGeometry(0.05, 0.05, 0.5);

    this.axisX = new Mesh(
      axisGeometry,
      new MeshBasicMaterial({
        ...materialConfig,
        color: 0xff0000
      })
    );
    this.axisX.position.set(0.275, 0.0, 0.0);
    this.axisX.rotation.y = Math.PI / 2;
    this.axisX.userData.direction = ObjectDragDirection.AxisX;

    this.axisY = new Mesh(
      axisGeometry,
      new MeshBasicMaterial({
        ...materialConfig,
        color: 0x00ff00
      })
    );
    this.axisY.position.set(0.0, 0.275, 0.0);
    this.axisY.rotation.x = Math.PI / 2;
    this.axisY.userData.direction = ObjectDragDirection.AxisY;

    this.axisZ = new Mesh(
      axisGeometry,
      new MeshBasicMaterial({
        ...materialConfig,
        color: 0x0000ff
      })
    );
    this.axisZ.position.set(0.0, 0.0, 0.275);
    this.axisZ.userData.direction = ObjectDragDirection.AxisZ;

    this.add(this.axisX);
    this.add(this.axisY);
    this.add(this.axisZ);

    // Scaling controls per axis, represented as spheres

    const scaleGeometry = new SphereGeometry(0.05, 16, 16);

    const scaleX = new Mesh(
      scaleGeometry,
      new MeshBasicMaterial({ ...materialConfig, color: 0xff0000 })
    );
    scaleX.position.set(0.65, 0, 0);
    scaleX.userData.direction = ObjectDragDirection.AxisX;
    scaleX.userData.isScale = true;

    const scaleY = new Mesh(
      scaleGeometry,
      new MeshBasicMaterial({ ...materialConfig, color: 0x00ff00 })
    );
    scaleY.position.set(0, 0.65, 0);
    scaleY.userData.direction = ObjectDragDirection.AxisY;
    scaleY.userData.isScale = true;

    const scaleZ = new Mesh(
      scaleGeometry,
      new MeshBasicMaterial({ ...materialConfig, color: 0x0000ff })
    );
    scaleZ.position.set(0, 0, 0.65);
    scaleZ.userData.direction = ObjectDragDirection.AxisZ;
    scaleZ.userData.isScale = true;

    this.add(scaleX);
    this.add(scaleY);
    this.add(scaleZ);

    // The YZ, XZ, XY planes, represented as areas on each plane.
    // Declaration is ordered by the normal of the plane, i.e.
    // the axis that will not be moved by it.

    const planeGeometry = new PlaneGeometry(0.25, 0.25);

    this.planeYZ = new Mesh(
      planeGeometry,
      new MeshBasicMaterial({ ...materialConfig, color: 0x00ffff })
    );
    this.planeYZ.position.set(0.0, 0.25, 0.25);
    this.planeYZ.rotation.y = Math.PI / 2;
    this.planeYZ.userData.direction = ObjectDragDirection.PlaneYZ;

    this.planeXZ = new Mesh(
      planeGeometry,
      new MeshBasicMaterial({ ...materialConfig, color: 0xff00ff })
    );
    this.planeXZ.position.set(0.25, 0.0, 0.25);
    this.planeXZ.rotation.x = Math.PI / 2;
    this.planeXZ.userData.direction = ObjectDragDirection.PlaneXZ;

    this.planeXY = new Mesh(
      planeGeometry,
      new MeshBasicMaterial({ ...materialConfig, color: 0xffff00 })
    );
    this.planeXY.position.set(0.25, 0.25, 0.0);
    this.planeXY.userData.direction = ObjectDragDirection.PlaneXY;

    this.add(this.planeYZ);
    this.add(this.planeXZ);
    this.add(this.planeXY);
  }

  getControlFromRaycaster(raycaster: Raycaster): Object3D | null {
    if (!this.activeMesh) {
      return null;
    }

    this.position.copy(this.activeMesh.position);

    const intersections = raycaster.intersectObjects(this.children);
    for (const intersection of intersections) {
      const o = intersection.object;
      if (o.userData.hasOwnProperty("direction")) {
        // Save the drag offset by subtracting the absolute position of the cursor
        // (absolute meaning world coordinates) from the object's absolute position.
        this.dragOffset.copy(intersection.point).sub(this.activeMesh.position);
        return o;
      }
    }
    return null;
  }

  // As we don't have access to the camera here and to avoid creating the ray caster
  // twice, we just pass it from the initial mouse click handler and use it here.
  // The original mouse event and screen coordinates are not required for the functionality
  // of the controls, so they will not be taken as parameters here.
  onClick(raycaster: Raycaster): boolean {
    const o = this.getControlFromRaycaster(raycaster);
    if (o && o.userData.hasOwnProperty("direction")) {
      this.objectDragDirection = o.userData.direction;
      this.isScaling = !!o.userData.isScale;
      this.onMove(raycaster);
      return true;
    }
    return false;
  }

  // Initially, I used a Vector3(dx, dy, 0) here and applied the world rotation
  // that can be calculated by the camera with camera.getWorldQuaternion(),
  // followed by zeroing out the directions that should not be changed based on
  // the plane or axis selected by the user.
  // This resulted in a "weird" feeling though, as the zeroed axis gets completely lost,
  // therefore making one of the two remaining axis movements feel slower than the other
  // even if both are dragged equally on the screen.
  //
  // Similar to the Three.js transform controls example, this now uses a ray
  // casted from the camera origin onto a plane that represents the axes to move
  // on and sets the position of the object to the intersection point.
  onMove({ ray }: Raycaster): void {
    if (this.objectDragDirection === null || !this.activeMesh) {
      return;
    }

    const c = this.activeMesh.position;
    const p = this.plane;
    let altPlane: Plane | null = null;

    // Update the normal and constant (^= position) of the plane
    // TODO: The origin of the plane has to be negative somehow, otherwise everything is mirrored. Why?
    switch (this.objectDragDirection) {
      case ObjectDragDirection.AxisX:
        p.set(new Vector3(0, 1, 0), -c.y);
        altPlane = new Plane(new Vector3(0, 0, 1), -c.z);
        break;
      case ObjectDragDirection.AxisY:
        p.set(new Vector3(1, 0, 0), -c.x);
        altPlane = new Plane(new Vector3(0, 0, 1), -c.z);
        break;
      case ObjectDragDirection.AxisZ:
        p.set(new Vector3(1, 0, 0), -c.x);
        altPlane = new Plane(new Vector3(0, 1, 0), -c.y);
        break;
      case ObjectDragDirection.PlaneXY:
        p.set(new Vector3(0, 0, 1), -c.z);
        break;
      case ObjectDragDirection.PlaneYZ:
        p.set(new Vector3(1, 0, 0), -c.x);
        break;
      case ObjectDragDirection.PlaneXZ:
        p.set(new Vector3(0, 1, 0), -c.y);
        break;
    }

    // If there is an alternative plane (i.e., for axes),
    // check which one is farther away from the ray's origin.
    // This is needed to prevent issues when the camera comes too close to the
    // plane.
    if (
      altPlane &&
      Math.abs(altPlane.distanceToPoint(ray.origin)) >
        Math.abs(p.distanceToPoint(ray.origin))
    ) {
      p.copy(altPlane);
    }

    const point = ray.intersectPlane(p, new Vector3());
    if (!point) {
      // No intersection
      return;
    }

    if (this.isScaling) {
      point.sub(this.activeMesh.position);

      switch (this.objectDragDirection) {
        case ObjectDragDirection.AxisX:
          this.activeMesh.scale.x = point.x * 2;
          break;
        case ObjectDragDirection.AxisY:
          this.activeMesh.scale.y = point.y * 2;
          break;
        case ObjectDragDirection.AxisZ:
          this.activeMesh.scale.z = point.z * 2;
          break;
      }

      this.options.onScale(this.activeMesh.scale);
    } else {
      point.sub(this.dragOffset);

      // If we are operating on an axis instead of a plane, ensure only the relevant
      // coordinate is changed.
      switch (this.objectDragDirection) {
        case ObjectDragDirection.AxisX:
          this.activeMesh.position.x = point.x;
          break;
        case ObjectDragDirection.AxisY:
          this.activeMesh.position.y = point.y;
          break;
        case ObjectDragDirection.AxisZ:
          this.activeMesh.position.z = point.z;
          break;
        default:
          // The selected direction is a plane, so we can just copy the
          // intersection point.
          this.activeMesh.position.copy(point);
      }

      this.options.onTranslate(this.activeMesh.position);
    }
  }
}
