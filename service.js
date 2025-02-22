
    let imgElement = document.getElementById("residential-img");
    let labelElement = document.getElementById("residential-label");
    let images = ["images/20231129_110828.jpg", "images/20231129_110828.jpg"];
    let labels = ["Before", "After"];
    let index = 0;
    
    setInterval(() => {
        index = 1 - index; // Toggle between 0 and 1
        imgElement.src = images[index];
        labelElement.textContent = labels[index];
    }, 3000); // Change every 3 seconds
