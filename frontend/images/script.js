function learnMore() {
    alert("More details coming soon!");
}
document.addEventListener("DOMContentLoaded", function() {
    const featureCards = document.querySelectorAll(".feature-card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    featureCards.forEach(card => {
        observer.observe(card);
    });
});
const counters = document.querySelectorAll(".counter");
counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        if (count < target) {
            counter.innerText = count + 1;
            setTimeout(updateCount, 50);
        }
    };
    updateCount();
});

fetch("http://localhost:5000/api/data")
  .then(response => response.json())
  .then(data => {
    console.log("Fetched Data:", data);
    // You can now display it on your webpage
    const container = document.getElementById("data-container");
    container.innerHTML = data.map(item => `
      <div>
        <h3>${item.name}</h3>
        <p>Location: ${item.location}</p>
        <p>Value: ${item.value}</p>
      </div>
    `).join('');
  })
  .catch(error => {
    console.error("❌ Error fetching data:", error);
  });
  console.log(typeof ScrollReveal);




