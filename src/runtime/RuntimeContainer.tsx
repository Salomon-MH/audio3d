/**
 * @author Daniel Salomon
 */
import React from "react";
import Project from "../project/Project";
import AudioImplementation from "../audio/AudioImplementation";
import Runtime from "./Runtime";
import {
  Main,
  FocusedLabel,
  RunningLabel,
  RunningHeadline,
  RunningButton,
  RunningButtonContainer,
  ControlsTable
} from "./styled";

interface Props {
  project: Project;
  onExit(): void;
}

export default class RuntimeContainer extends React.Component<Props> {
  targetRef = React.createRef<HTMLDivElement>();
  runtime = new Runtime(this.props.project);
  activeButtonRef: HTMLElement | null = null;

  componentDidMount(): void {
    if (this.targetRef.current) {
      this.runtime.attach(this.targetRef.current);
      this.runtime.focus();
    }
  }

  componentWillUnmount(): void {
    this.runtime.detach();
  }

  onExit = () => {
    this.runtime.detach();
    this.props.onExit();
  };

  onVisualToggle = () => {
    this.runtime.toggleRendering();
  };

  onChangeAudio = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    audio: AudioImplementation
  ) => {
    this.props.project.selectAudioImplementation(audio);
    event.currentTarget.style.background = "#19611c";
    event.currentTarget.style.boxShadow = "0px 0px 10px #00FF00";
    if (
      this.activeButtonRef != null &&
      this.activeButtonRef != event.currentTarget
    ) {
      this.activeButtonRef.style.removeProperty("background");
      this.activeButtonRef.style.removeProperty("box-shadow");
    }
    this.activeButtonRef = event.currentTarget;
  };

  checkIfSelectedImplementation = (target: HTMLElement | null) => {
    if (target != null) {
      if (
        this.props.project.activeAudioImplementation ==
          AudioImplementation.WebAudio &&
        target.innerHTML == "Web Audio API"
      ) {
        target.style.background = "#19611c";
        target.style.boxShadow = "0px 0px 10px #00FF00";
        this.activeButtonRef = target;
      } else if (
        this.props.project.activeAudioImplementation ==
          AudioImplementation.ResonanceAudio &&
        target.innerHTML == "Resonance Audio"
      ) {
        target.style.background = "#19611c";
        target.style.boxShadow = "0px 0px 10px #00FF00";
        this.activeButtonRef = target;
      } else if (
        this.props.project.activeAudioImplementation ==
          AudioImplementation.Binaural &&
        target.innerHTML == "BinauralFIR"
      ) {
        target.style.background = "#19611c";
        target.style.boxShadow = "0px 0px 10px #00FF00";
        this.activeButtonRef = target;
      }
    }
  };

  render(): React.ReactNode {
    return (
      <Main ref={this.targetRef}>
        <RunningLabel>
          Audio3D
          <RunningHeadline>Menu</RunningHeadline>
          <RunningButtonContainer>
            <RunningButton onClick={this.onExit}>Exit</RunningButton>
            <RunningButton onClick={this.onVisualToggle}>
              Toggle visuals
            </RunningButton>
          </RunningButtonContainer>
          <RunningHeadline>Audio implementation</RunningHeadline>
          <RunningButtonContainer>
            <RunningButton
              onClick={e => this.onChangeAudio(e, AudioImplementation.WebAudio)}
              ref={this.checkIfSelectedImplementation}
            >
              Web Audio API
            </RunningButton>
            <RunningButton
              onClick={e => this.onChangeAudio(e, AudioImplementation.Binaural)}
              ref={this.checkIfSelectedImplementation}
            >
              BinauralFIR
            </RunningButton>
            <RunningButton
              onClick={e =>
                this.onChangeAudio(e, AudioImplementation.ResonanceAudio)
              }
              ref={this.checkIfSelectedImplementation}
            >
              Resonance Audio
            </RunningButton>
          </RunningButtonContainer>
          <RunningHeadline>Controls</RunningHeadline>
          <ControlsTable>
            <tr>
              <td>Move</td>
              <td>W/A/S/D or left stick</td>
            </tr>
            <tr>
              <td>View</td>
              <td>Arrow keys or right stick</td>
            </tr>
            <tr>
              <td>Interact</td>
              <td>E or A (XBOX)</td>
            </tr>
          </ControlsTable>
        </RunningLabel>
        <FocusedLabel>Focused</FocusedLabel>
      </Main>
    );
  }
}
