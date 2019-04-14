/**
 * @author Niklas Korz
 */
import React from "react";
import { RoomDimensions, ResonanceAudio, RoomMaterials } from "resonance-audio";
import { Group, Input, InputGroup, Select } from "./styled";
import { EditorRoom } from "./types";

const materials = Object.keys(ResonanceAudio.Utils.ROOM_MATERIAL_COEFFICIENTS);

interface Props {
  room: EditorRoom;
  onUpdateName(name: string): void;
  onUpdateDimensions(dimensions: RoomDimensions): void;
  onUpdateMaterials(materials: RoomMaterials): void;
}

// UI component for editing properties specific to a room itself
export default class RoomEditor extends React.Component<Props> {
  selectMaterialHandler(
    propertyName: keyof RoomMaterials
  ): React.ChangeEventHandler<HTMLSelectElement> {
    return e => {
      const { room, onUpdateMaterials } = this.props;
      onUpdateMaterials({
        ...room.materials,
        [propertyName]: e.currentTarget.value
      });
    };
  }

  render(): React.ReactNode {
    const { room: r, onUpdateName, onUpdateDimensions } = this.props;

    const materialOptions = materials.map(ce => <option key={ce}>{ce}</option>);

    return (
      <div>
        <Group>
          <label>Room Name</label>
          <Input
            type="text"
            value={r.name}
            onChange={e => onUpdateName(e.currentTarget.value)}
          />
        </Group>
        <Group>
          <label>Dimensions (width, depth, height)</label>
          <InputGroup>
            <Input
              type="number"
              step={1}
              min={5}
              max={50}
              value={r.dimensions.width}
              onChange={e =>
                onUpdateDimensions({
                  ...r.dimensions,
                  width: Math.round(e.currentTarget.valueAsNumber)
                })
              }
            />
            <Input
              type="number"
              step={1}
              min={5}
              max={50}
              value={r.dimensions.depth}
              onChange={e =>
                onUpdateDimensions({
                  ...r.dimensions,
                  depth: Math.round(e.currentTarget.valueAsNumber)
                })
              }
            />
            <Input
              type="number"
              step={1}
              min={2}
              max={10}
              value={r.dimensions.height}
              onChange={e =>
                onUpdateDimensions({
                  ...r.dimensions,
                  height: Math.round(e.currentTarget.valueAsNumber)
                })
              }
            />
          </InputGroup>
        </Group>
        <Group>
          <label>Left wall material</label>
          <Select
            value={r.materials.left}
            onChange={this.selectMaterialHandler("left")}
          >
            {materialOptions}
          </Select>
        </Group>
        <Group>
          <label>Right wall material</label>
          <Select
            value={r.materials.right}
            onChange={this.selectMaterialHandler("right")}
          >
            {materialOptions}
          </Select>
        </Group>
        <Group>
          <label>Front wall material</label>
          <Select
            value={r.materials.front}
            onChange={this.selectMaterialHandler("front")}
          >
            {materialOptions}
          </Select>
        </Group>
        <Group>
          <label>Back wall material</label>
          <Select
            value={r.materials.back}
            onChange={this.selectMaterialHandler("back")}
          >
            {materialOptions}
          </Select>
        </Group>
        <Group>
          <label>Floor material</label>
          <Select
            value={r.materials.down}
            onChange={this.selectMaterialHandler("down")}
          >
            {materialOptions}
          </Select>
        </Group>
        <Group>
          <label>Ceiling material</label>
          <Select
            value={r.materials.up}
            onChange={this.selectMaterialHandler("up")}
          >
            {materialOptions}
          </Select>
        </Group>
      </div>
    );
  }
}