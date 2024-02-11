import "./Projecthead.css";

let statusMessage = "Completed";

const Projecthead = (project) => {



  if (project.completed === "false") {
    statusMessage = "Ongoing";
  }

  return (
    <div class="projectHead">
      <div class="projectAuthor">
        <span class="projectName"> {project.name}</span>
        <span class="projectType"> {"- " + project.projecttype}</span>
      </div>
      <div class="projectStatus">
        
        {statusMessage}
        
      </div>
    </div>
  );
};

export default Projecthead;
