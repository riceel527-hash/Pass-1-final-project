// ========================================================
// GLOBAL DATA STORAGE (Always at the very top)
// ========================================================
let allData = [];
let allUsers = [];

// ========================================================
// 1. LIFECYCLE INITIALIZATION WITH LOADING STATE
// ========================================================
async function init() {
    const loadingContainer = document.getElementById('loadingContainer');
    
    try {
        // Fetch BOTH resources simultaneously
        const [postsResponse, usersResponse] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/posts'),
            fetch('https://jsonplaceholder.typicode.com/users')
        ]);

        // Parse responses to JSON
        allData = await postsResponse.json();
        allUsers = await usersResponse.json();

        // Hide the loading spinner now that data is successfully cached
        if (loadingContainer) {
            loadingContainer.style.display = 'none';
        }

        // Render both dashboard modules onto the screen
        displayUserCards(allUsers);
        displayResults(allData);

    } catch (error) {
        console.error("Data failed to fetch:", error);
        
        // Error handling fallback: visual indicator in the DOM
        if (loadingContainer) {
            loadingContainer.innerHTML = `
                <p style="color: #ef4444; font-weight: bold; text-align: center;">
                    Failed to load dashboard data. Please check your connection.
                </p>
            `;
        }
    }
}

// ========================================================
// 2. USER INTERFACE RENDERING BLOCKS
// ========================================================
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

// INTERACTIVE CLICK HANDLER (Ties top user cards to search inputs)
function selectUser(userId) {
    const idInput = document.getElementById('idInput');
    if (!idInput) return;

    idInput.value = userId;
    filterAndSortData();
}

// 3. POST RESULTS RENDERING
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

// ========================================================
// 3. SEARCH, FILTER, AND SORT LOGIC
// ========================================================
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

// ========================================================
// 4. NAVIGATION MANAGEMENT
// ========================================================
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

// ========================================================
// 5. EVENT LISTENERS & INVOCATION (Always at the absolute bottom)
// ========================================================
document.getElementById('searchInput').addEventListener('input', filterAndSortData);
document.getElementById('idInput').addEventListener('input', filterAndSortData);
document.getElementById('sortOrder').addEventListener('change', filterAndSortData);

// Execute the app startup logic
init();





    
