/**
 * @author Niklas Korz
 * @author Daniel Salomon
 */
import { RoomDimensions, ResonanceAudio, RoomMaterials } from "resonance-audio";
import {
  AmbientLight,
  BoxGeometry,
  GridHelper,
  Mesh,
  MeshLambertMaterial,
  Object3D,
  PerspectiveCamera,
  PointLight,
  Scene,
  Vector3
} from "three";
import Serializable, { SerializedData } from "../data/Serializable";
import { RoomData } from "../data/schema";
import AudioScene from "../audio/AudioScene";
import Audio3D from "../audio/Audio3D";
import AudioLibrary from "./AudioLibrary";
import GameObject from "./GameObject";
import SpawnMarker from "./SpawnMarker";
import Project from "./Project";

const wallGeometry = new BoxGeometry(1, 1, 1);
const wallMaterial = new MeshLambertMaterial();

// A "room" is analog to levels of a game.
// The user will only hear sounds that are part of the current room.
// Also, this abstraction is necessary to support Resonance Audio as one of many
// spatial audio implementations.
export default class Room extends Scene implements Serializable {
  audioLibrary: AudioLibrary;
  roomDimensions: RoomDimensions;
  roomMaterials: RoomMaterials;
  project: Project;
  grid: GridHelper;
  wallNorth = new Mesh(wallGeometry, wallMaterial);
  wallEast = new Mesh(wallGeometry, wallMaterial);
  wallSouth = new Mesh(wallGeometry, wallMaterial);
  wallWest = new Mesh(wallGeometry, wallMaterial);
  camera = new PerspectiveCamera(60, 1, 0.1, 1000);

  collisionAudio: Audio3D; // Audio3D Objects for playing collision/footstep/interaction sounds, needed per room.
  footstepAudio: Audio3D;
  interactAvailAudio: Audio3D;

  roomState = new Map<string, any>(); // Needed by runtime

  audioScene: AudioScene;
  spawns: SpawnMarker[] = [];

  get dimensions(): RoomDimensions {
    return this.roomDimensions;
  }

  set dimensions(dimensions: RoomDimensions) {
    this.roomDimensions = dimensions;

    this.audioScene.setRoomProperties(dimensions, this.roomMaterials);

    this.remove(this.grid);

    const gridSize = Math.max(dimensions.width, dimensions.depth);
    this.grid = new GridHelper(gridSize, gridSize, 0xffffff, 0xffffff);

    this.add(this.grid);

    this.updateWalls();
  }

  get materials(): RoomMaterials {
    return this.roomMaterials;
  }

  set materials(materials: RoomMaterials) {
    this.roomMaterials = materials;
    this.audioScene.setRoomProperties(this.roomDimensions, materials);
  }

  constructor(
    project: Project,
    audioLibrary: AudioLibrary,
    name: string = "",
    dimensions: RoomDimensions = { width: 15, depth: 15, height: 3 },
    materials: RoomMaterials = ResonanceAudio.Utils.DEFAULT_ROOM_MATERIALS
  ) {
    super();

    this.audioLibrary = audioLibrary;
    this.name = name;
    this.roomDimensions = dimensions;
    this.roomMaterials = materials;
    this.project = project;
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    this.add(ambientLight);
    const light = new PointLight(0xffffff, 0.5);
    light.position.set(5, 5, 0);
    light.lookAt(0, 0, 0);
    this.add(light);

    const gridSize = Math.max(dimensions.width, dimensions.depth);
    this.grid = new GridHelper(gridSize, gridSize, 0xffffff, 0xffffff);
    this.add(this.grid);

    this.updateWalls();
    this.add(this.wallNorth);
    this.add(this.wallEast);
    this.add(this.wallSouth);
    this.add(this.wallWest);

    this.camera.position.z = 4;
    this.camera.position.y = 3;
    this.camera.lookAt(new Vector3(0, 1, 0));

    // Audio setup
    this.audioScene = new AudioScene({
      dimensions: dimensions,
      materials: materials
    });

    this.camera.add(this.audioScene.listener3D);

    //Init audio objects for collision/footstep/... sounds
    this.collisionAudio = this.audioScene.createAudio3D();
    this.footstepAudio = this.audioScene.createAudio3D();
    this.interactAvailAudio = this.audioScene.createAudio3D();

    //Add audio objects for collision/footstep/... sounds to their parents
    this.camera.add(this.footstepAudio);
    //this.footstepAudio.position.setY(-1.3); //Causes strange problems at some implementations (Footsteps only right or left)
    this.add(this.collisionAudio);
    this.add(this.interactAvailAudio);
  }

  addSpawn(): SpawnMarker {
    const marker = new SpawnMarker();
    marker.name = "New spawn";
    this.spawns.push(marker);
    this.add(marker);
    return marker;
  }

  addObject(): GameObject {
    const object = new GameObject(this.audioLibrary, this.audioScene);
    object.position.y += 0.5;
    object.name = "New object";

    // Options
    object.audio.webAudioPannerNode.panningModel = this.project.panningModel;
    object.audio.webAudioPannerNode.distanceModel = this.project.distanceModel;
    object.audio.resonanceSource.setRolloff(this.project.rollofModel);

    this.add(object);
    return object;
  }

  updateWalls(): void {
    const { width, depth, height } = this.roomDimensions;

    this.wallNorth.scale.set(width, height, 0.25);
    this.wallEast.scale.set(0.25, height, depth);
    this.wallSouth.scale.set(width, height, 0.25);
    this.wallWest.scale.set(0.25, height, depth);

    this.wallNorth.position.set(0, height / 2, depth / 2);
    this.wallEast.position.set(width / 2, height / 2, 0);
    this.wallSouth.position.set(0, height / 2, -depth / 2);
    this.wallWest.position.set(-width / 2, height / 2, 0);
  }

  toData(): RoomData {
    return {
      uuid: this.uuid,
      name: this.name,
      dimensions: this.dimensions,
      materials: this.materials,
      spawns: this.spawns.map(s => s.toData()),
      objects: this.children
        .filter((c: Object3D): c is GameObject => c instanceof GameObject)
        .map(go => go.toData())
    };
  }

  fromData(data: SerializedData): this {
    this.uuid = data.uuid != null ? data.uuid : this.uuid;
    this.name = data.name;
    this.dimensions = data.dimensions;
    if (data.materials) {
      this.materials = data.materials;
    }

    if (data.spawns) {
      this.spawns = data.spawns.map((s: SerializedData) =>
        new SpawnMarker().fromData(s)
      );
      this.add(...this.spawns);
    } else {
      this.addSpawn();
    }

    const gameObjects = data.objects.map((o: SerializedData) =>
      new GameObject(this.audioLibrary, this.audioScene).fromData(o)
    );
    this.add(...gameObjects);

    return this;
  }
}
