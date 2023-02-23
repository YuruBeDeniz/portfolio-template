import { SyntheticEvent, useState } from 'react'
import { Project } from './Project'

type ProjectFormProps = {
    onCancel: () => void
    onSave: (project: Project) => void
    project: Project
}

const ProjectForm = ({ onCancel, onSave, project: initialProject }: ProjectFormProps) => {
  const [project, setProject] = useState(initialProject);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSave(project)
  };

  const handleChange = (e: any) => {
    const { type, name, value, checked } = e.target;

    let updatedValue = type === "checkbox" ? checked : value;

    if(type === "number") updatedValue = Number(updatedValue);
    
    const change = {
        [name]: updatedValue,
    };
    console.log("name: ", name);
    console.log("change: ", change);
    console.log("updated value: ", updatedValue);

    let updatedProject: Project;

    setProject((prev) => {
        updatedProject = new Project({ ...prev, ...change}); 
        return updatedProject;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="input-group vertical">
      <label htmlFor="name">Project Name</label>
      <input value={project.name} onChange={handleChange} type="text" name="name" placeholder="enter name" />
      
      <label htmlFor="description">Project Description</label>
      <textarea value={project.description} onChange={handleChange} name="description" placeholder="enter description" />
      
      <label htmlFor="budget">Project Budget</label>
      <input value={project.description} onChange={handleChange} type="number" name="budget" placeholder="enter budget" />
      
      <label htmlFor="isActive">Active?</label>
      <input checked={project.isActive} onChange={handleChange} type="checkbox" name="isActive" />
      
      <div className="input-group">
        <button className="primary bordered medium">
          Save
        </button>
        <span />
        <button 
            onClick={onCancel}
            type="button" 
            className="secondary bordered medium">
          cancel
        </button>
      </div>    
    </form>
  )
}

export default ProjectForm;