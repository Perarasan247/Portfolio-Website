import type { ComponentType } from 'react';
import type { Project } from '../../types';
import { ArtBoneVision } from './art/ArtBoneVision';
import { ArtChurn } from './art/ArtChurn';
import { ArtDataAgent } from './art/ArtDataAgent';
import { ArtDocRag } from './art/ArtDocRag';
import { ArtPilot } from './art/ArtPilot';
import { ArtTomato } from './art/ArtTomato';

const PROJECT_ART: Record<string, ComponentType> = {
  bonevision: ArtBoneVision,
  pilot: ArtPilot,
  'data-analyst-agent': ArtDataAgent,
  'doc-rag': ArtDocRag,
  'tomato-disease': ArtTomato,
  'churn-prediction': ArtChurn,
};

interface ProjectArtProps {
  project: Project;
}

export function ProjectArt({ project }: ProjectArtProps) {
  const Graphic = PROJECT_ART[project.id];
  return (
    <div className={'proj-art tint-' + project.domain} aria-hidden="true">
      <div className="proj-art-figure">{Graphic && <Graphic />}</div>
      <div className="proj-art-glyph mono">{project.glyph}</div>
    </div>
  );
}
