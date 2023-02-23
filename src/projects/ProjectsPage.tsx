import { useState } from "react";
import { MOCK_PROJECTS } from "./MockProjects";
import { Project } from "./Project";
import ProjectList from "./ProjectList";

type Props = {}

const ProjectsPage = (props: Props) => {
  const [projects, setProPects] = useState(MOCK_PROJECTS);

  const saveProject = (project: Project) => {
      let updatedProjects = projects.map((p: Project) => {
        return p.id === project.id ? project : p;
      });
      setProPects(updatedProjects);
  };

  return (
    <>
    <h1>Projects</h1>
    <ProjectList 
      onSave={saveProject}
      projects={projects}/>
    </>
  )
}

export default ProjectsPage;