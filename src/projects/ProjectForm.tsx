import { SyntheticEvent, useState } from 'react'
import { Project } from './Project'

type ProjectFormProps = {
    onCancel: () => void
    onSave: (project: Project) => void
    project: Project
}

const ProjectForm = ({ onCancel, onSave, project: initialProject }: ProjectFormProps) => {
  const [project, setProject] = useState(initialProject);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    budget: "",
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if(!isValid) return;
    onSave(project);
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
    setErrors(() => validate(updatedProject));
  };

  const validate = (project: Project) => {
    let errors: any = { name: "", description: "", budget: "" };

    if (project.name.length === 0) {
      errors.name = 'Name is required';
    }
    if (project.name.length > 0 && project.name.length < 3) {
      errors.name = 'Name needs to be at least 3 characters.';
    }
    if (project.description.length === 0) {
      errors.description = 'Description is required.';
    }
    if (project.budget === 0) {
      errors.budget = 'Budget must be more than $0.';
    }

    return errors;
  };

  function isValid() {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    );
  }

  return (
    <form onSubmit={handleSubmit} className="input-group vertical">
      <label htmlFor="name">Project Name</label>
      <input value={project.name} onChange={handleChange} type="text" name="name" placeholder="enter name" />
      {errors.name.length > 0 && (
        <div className="card error">
          <p>{errors.name}</p>
        </div>
      )}
      
      <label htmlFor="description">Project Description</label>
      <textarea value={project.description} onChange={handleChange} name="description" placeholder="enter description" />
      {errors.description.length > 0 && (
        <div className="card error">
          <p>{errors.description}</p>
        </div>
      )}
      
      <label htmlFor="budget">Project Budget</label>
      <input value={project.description} onChange={handleChange} type="number" name="budget" placeholder="enter budget" />
      {errors.budget.length > 0 && (
        <div className="card error">
          <p>{errors.budget}</p>
        </div>
      )}
      
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