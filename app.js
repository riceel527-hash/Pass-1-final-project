let allData = [];

async function init() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        allData = await res.json();
        displayResults(allData);
    } catch (error) {
        console.error("Data failed to fetch:", error);
    }
}

function displayResults(items) {
    const list = document.getElementById('results');
    if (!list) return; 

    list.innerHTML = items.map(item => `
        <li>
            <span class="id-badge">User ID: ${item.userId} | Post ID: ${item.id}</span>
            <br>
            <strong>${item.title}</strong>
        </li>
    `).join('');
}


function filterAndSortData() {
    const textTerm = document.getElementById('searchInput').value.toLowerCase();
    const idTerm = document.getElementById('idInput').value; 
    const sortOrder = document.getElementById('sortOrder').value;

    let processedData = allData.filter(item => {
        const matchesText = item.title.toLowerCase().includes(textTerm);
        const matchesId = idTerm === "" || 
                          item.userId.toString() === idTerm || 
                          item.id.toString() === idTerm;

        return matchesText && matchesId;
    });

    if (sortOrder === "az") {
        processedData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "za") {
        processedData.sort((a, b) => b.title.localeCompare(a.title));
    }

    displayResults(processedData);
}

document.getElementById('searchInput').addEventListener('input', filterAndSortData);
document.getElementById('idInput').addEventListener('input', filterAndSortData);
document.getElementById('sortOrder').addEventListener('change', filterAndSortData);



init();






    
