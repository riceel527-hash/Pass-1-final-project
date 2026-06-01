let allData = [];

// 1. Fetch data once on startup
async function init() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    allData = await res.json();
    displayResults(allData);
}

// 2. Display results
function displayResults(items) {
    const list = document.getElementById('results');
    list.innerHTML = items.map(item => `<li>${item.title}</li>`).join('');
}

// 3. Search Logic
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allData.filter(item => item.title.toLowerCase().includes(term));
    displayResults(filtered);
});

init();