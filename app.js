let allData = []; 
// 1. Fetch data once on startup 
async function init() {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts'); 
       allData = await res.json(); 
       displayResults(allData);
 }
 // 2. Display results (Updated to show ID numbers to the user) 

function displayResults(items) { 
const list = document.getElementById('results'); 
list.innerHTML = items.map(item => ` 
<li> 
<span class="id-badge">User ID: ${item.userId} | Post ID: ${item.id}</span> <strong>${item.title}</strong> 
</li>
 `).join(''); } 

// 3. New Combined Search/Filter Logic 
function filterData() { 
const textTerm = document.getElementById('searchInput').value.toLowerCase(); 
const idTerm = document.getElementById('idInput').value; // This grabs the number typed 

const filtered = allData.filter(item => { 

     // Condition A: Does the title match the text search? 

const matchesText = item.title.toLowerCase().includes(textTerm); 

// Condition B: Does the ID match? 
// If the ID input box is empty, we want to show everything (return true).
 // If it's NOT empty, check if it matches the userId OR the post id. 

const matchesId = idTerm === "" || 
                              item.userId.toString() === idTerm || 
                              item.id.toString() === idTerm; 
// Both conditions must pass 

return matchesText && matchesId; 
}); 

displayResults(filtered); 
} 

// 4. Attach the filter function to both input fields
document.getElementById('searchInput').addEventListener('input', filterData); 
document.getElementById('idInput').addEventListener('input', filterData);

// Initialize the app
init();





    
