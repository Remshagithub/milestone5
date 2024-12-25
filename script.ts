let isEditable: boolean = false;

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resumeForm") as HTMLFormElement;
    form.addEventListener("submit", generateResume);
});

function generateResume(event: Event): void {
    event.preventDefault(); // Prevent form submission

    // Get values from the form
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;

    // Generate sharable Resume HTML
    const resumeHTML = `
        <h2 class="editable">${name}</h2>
        <p><strong>Email:</strong> <span class="editable">${email}</span></p>
        <p><strong>Phone:</strong> <span class="editable">${phone}</span></p>
        <h3>Experience</h3>
        <p class="editable">${experience.replace(/\n/g, "<br>")}</p>
        <h3>Skills</h3>
        <p class="editable">${skills.replace(/\n/g, "<br>")}</p>
        <button onclick="toggleEdit()">Edit</button>
        <button onclick="shareResume()">Share</button>
    `;

    // Display the Resume Output
    const resumeOutput = document.getElementById("resumeOutput") as HTMLDivElement;
    resumeOutput.innerHTML = resumeHTML;
    resumeOutput.style.display = "block";
}

function toggleEdit(): void {
    // Toggle edit mode for the editable elements
    const editableElements = document.querySelectorAll<HTMLSpanElement | HTMLHeadingElement | HTMLParagraphElement>(".editable");
    isEditable = !isEditable;

    editableElements.forEach(element => {
        if (isEditable) {
            element.contentEditable = "true";
            element.style.border = "1px dashed #007BFF";
            element.style.padding = "5px";
            element.style.backgroundColor = "#fff";
        } else {
            element.contentEditable = "false";
            element.style.border = "none";
            element.style.padding = "0";
            element.style.backgroundColor = "transparent";
        }
    });

    // Update the Edit button text
    const editButton = document.querySelector<HTMLButtonElement>('button[onclick="toggleEdit()"]');
    if (editButton) {
        editButton.textContent = isEditable ? "Save" : "Edit";
    }
}

function shareResume(): void {
    const resumeOutput = document.getElementById("resumeOutput") as HTMLDivElement;
    const blob = new Blob([resumeOutput.innerHTML], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resume.html';
    link.click();
}