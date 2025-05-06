function openModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    
    // Project details (you can modify this for each project)
    const projectDetails = {
      project1: {
        title: 'Project 1 Title',
        description: 'Detailed summary of Project 1. Discuss the technologies, challenges, and outcomes.',
        image: 'project1_large.jpg',
      },
      project2: {
        title: 'Project 2 Title',
        description: 'Detailed summary of Project 2. Highlight your approach and results.',
        image: 'project2_large.jpg',
      },
      // Add more projects here...
    };
  
    const project = projectDetails[projectId];
  
    // Inject the project content into the modal
    modalContent.innerHTML = `
      <h2>${project.title}</h2>
      <img src="${project.image}" alt="${project.title}" style="width: 100%;" />
      <p>${project.description}</p>
    `;
  
    // Show the modal
    modal.style.display = "block";
  }
  
  function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = "none";
  }
  