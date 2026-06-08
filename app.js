

let allData = [];
let allUsers = [];



async function init() {
    const loadingContainer = document.getElementById('loadingContainer');
    
    try {
   
        const [postsResponse, usersResponse] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/posts'),
            fetch('https://jsonplaceholder.typicode.com/users')
        ]);

     
        allData = await postsResponse.json();
        allUsers = await usersResponse.json();

      
        if (loadingContainer) {
            loadingContainer.style.display = 'none';
        }

    
        displayUserCards(allUsers);
        displayResults(allData);

    } catch (error) {
        console.error("Data failed to fetch:", error);
        
        
        if (loadingContainer) {
            loadingContainer.innerHTML = `
                <p style="color: #ef4444; font-weight: bold; text-align: center;">
                    Failed to load dashboard data. Please check your connection.
                </p>
            `;
        }
    }
}



function displayUserCards(users) {
    const container = document.getElementById('userCards');
    if (!container) return;

    container.innerHTML = users.map(user => `
        <div class="user-card" onclick="selectUser(${user.id})" style="cursor: pointer;">
            <h3>ID: ${user.id}</h3>
            <strong>${user.name}</strong>
            <p>@${user.username}</p>
            <p style="color: #0066cc; margin-top: 4px;">${user.email}</p>
            <p style="color: #475569; font-size: 10px; font-style: italic;">${user.phone}</p>
        </div>
    `).join('');
}


function selectUser(userId) {
    const idInput = document.getElementById('idInput');
    if (!idInput) return;

    idInput.value = userId;
    filterAndSortData();
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


function goHome() {
    document.getElementById('searchInput').value = '';
    document.getElementById('idInput').value = '';
    document.getElementById('sortOrder').value = 'none';
    displayResults(allData);
}

function scrollToContact() {
    const footerElement = document.querySelector('footer');
    if (footerElement) {
        footerElement.scrollIntoView({ behavior: 'smooth' });
    }
}

document.getElementById('searchInput').addEventListener('input', filterAndSortData);
document.getElementById('idInput').addEventListener('input', filterAndSortData);
document.getElementById('sortOrder').addEventListener('change', filterAndSortData);


init();





    
