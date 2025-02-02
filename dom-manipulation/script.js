// Initial quotes data structure
let quotes = [
    { text: "Life is what happens while you're busy making other plans.", category: "Life" },
    { text: "The only way to do great work is to love what you do.", category: "Work" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
    { text: "Stay hungry, stay foolish.", category: "Inspiration" }
];

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Create and append the quote display container
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.className = 'quote-container';
    
    // Create and append category filter
    const categoryContainer = document.createElement('div');
    categoryContainer.className = 'category-filter';
    const categorySelect = document.createElement('select');
    categorySelect.id = 'categoryFilter';
    updateCategoryFilter(categorySelect);
    categoryContainer.appendChild(categorySelect);
    document.body.insertBefore(categoryContainer, quoteDisplay);
    
    // Add event listener to the "Show New Quote" button
    const newQuoteButton = document.getElementById('newQuote');
    newQuoteButton.addEventListener('click', () => showRandomQuote(categorySelect.value));
    
    // Create and append the form for adding new quotes
    createAddQuoteForm();
    
    // Show initial random quote
    showRandomQuote();
});

function showRandomQuote(category = 'all') {
    const quoteDisplay = document.getElementById('quoteDisplay');
    let availableQuotes = category === 'all' 
        ? quotes 
        : quotes.filter(quote => quote.category === category);
    
    if (availableQuotes.length === 0) {
        quoteDisplay.innerHTML = '<p>No quotes available for this category.</p>';
        return;
    }
    
    const randomQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
    
    // Clear previous content
    quoteDisplay.innerHTML = '';
    
    // Create and append quote text
    const quoteText = document.createElement('p');
    quoteText.className = 'quote-text';
    quoteText.textContent = `"${randomQuote.text}"`;
    
    // Create and append quote category
    const quoteCategory = document.createElement('p');
    quoteCategory.className = 'quote-category';
    quoteCategory.textContent = `Category: ${randomQuote.category}`;
    
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
}

function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    formContainer.className = 'form-container';
    
    // Create form elements
    const quoteInput = document.createElement('input');
    quoteInput.type = 'text';
    quoteInput.id = 'newQuoteText';
    quoteInput.placeholder = 'Enter a new quote';
    
    const categoryInput = document.createElement('input');
    categoryInput.type = 'text';
    categoryInput.id = 'newQuoteCategory';
    categoryInput.placeholder = 'Enter quote category';
    
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.onclick = addQuote;
    
    // Append elements to form container
    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);
    
    // Add form to document
    document.body.appendChild(formContainer);
}

function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();
    
    if (!quoteText || !quoteCategory) {
        alert('Please enter both quote text and category');
        return;
    }
    
    // Add new quote to array
    quotes.push({ text: quoteText, category: quoteCategory });
    
    // Clear input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    
    // Update category filter
    updateCategoryFilter(document.getElementById('categoryFilter'));
    
    // Show success message
    alert('Quote added successfully!');
    
    // Show the new quote
    showRandomQuote();
}

function updateCategoryFilter(selectElement) {
    // Get unique categories
    const categories = ['all', ...new Set(quotes.map(quote => quote.category))];
    
    // Clear existing options
    selectElement.innerHTML = '';
    
    // Add new options
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        selectElement.appendChild(option);
    });
}
 function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }
// Initialize quotes from localStorage or use default quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "Life is what happens while you're busy making other plans.", category: "Life" },
    { text: "The only way to do great work is to love what you do.", category: "Work" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
    { text: "Stay hungry, stay foolish.", category: "Inspiration" }
];

// DOM Elements and Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Create main container for better organization
    const mainContainer = document.createElement('div');
    mainContainer.className = 'main-container';
    document.body.appendChild(mainContainer);

    // Create and append the quote display container
    const quoteDisplay = document.getElementById('quoteDisplay') || createQuoteDisplay();
    mainContainer.appendChild(quoteDisplay);
    
    // Create and append category filter
    const categoryContainer = document.createElement('div');
    categoryContainer.className = 'category-filter';
    const categorySelect = document.createElement('select');
    categorySelect.id = 'categoryFilter';
    updateCategoryFilter(categorySelect);
    categoryContainer.appendChild(categorySelect);
    mainContainer.appendChild(categoryContainer);
    
    // Create controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'controls-container';
    
    // Add "Show New Quote" button
    const newQuoteButton = document.createElement('button');
    newQuoteButton.id = 'newQuote';
    newQuoteButton.textContent = 'Show New Quote';
    newQuoteButton.addEventListener('click', () => {
        const quote = showRandomQuote(categorySelect.value);
        // Store last viewed quote in sessionStorage
        sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
    });
    controlsContainer.appendChild(newQuoteButton);
    
    // Add Export JSON button
    const exportButton = document.createElement('button');
    exportButton.textContent = 'Export Quotes';
    exportButton.onclick = exportToJson;
    controlsContainer.appendChild(exportButton);
    
    // Add Import JSON input
    const importContainer = document.createElement('div');
    importContainer.className = 'import-container';
    const importInput = document.createElement('input');
    importInput.type = 'file';
    importInput.id = 'importFile';
    importInput.accept = '.json';
    importInput.onchange = importFromJsonFile;
    const importLabel = document.createElement('label');
    importLabel.textContent = 'Import Quotes: ';
    importLabel.appendChild(importInput);
    importContainer.appendChild(importLabel);
    controlsContainer.appendChild(importContainer);
    
    mainContainer.appendChild(controlsContainer);
    
    // Create and append the form for adding new quotes
    createAddQuoteForm(mainContainer);
    
    // Show last viewed quote or a random one
    const lastQuote = sessionStorage.getItem('lastViewedQuote');
    if (lastQuote) {
        displayQuote(JSON.parse(lastQuote));
    } else {
        showRandomQuote();
    }
});

function createQuoteDisplay() {
    const quoteDisplay = document.createElement('div');
    quoteDisplay.id = 'quoteDisplay';
    quoteDisplay.className = 'quote-container';
    return quoteDisplay;
}

function showRandomQuote(category = 'all') {
    const availableQuotes = category === 'all' 
        ? quotes 
        : quotes.filter(quote => quote.category === category);
    
    if (availableQuotes.length === 0) {
        displayQuote({ text: 'No quotes available for this category.', category: '' });
        return null;
    }
    
    const randomQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
    displayQuote(randomQuote);
    return randomQuote;
}

function displayQuote(quote) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';
    
    const quoteText = document.createElement('p');
    quoteText.className = 'quote-text';
    quoteText.textContent = `"${quote.text}"`;
    
    const quoteCategory = document.createElement('p');
    quoteCategory.className = 'quote-category';
    quoteCategory.textContent = quote.category ? `Category: ${quote.category}` : '';
    
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
}

function createAddQuoteForm(container) {
    const formContainer = document.createElement('div');
    formContainer.className = 'form-container';
    
    const quoteInput = document.createElement('input');
    quoteInput.type = 'text';
    quoteInput.id = 'newQuoteText';
    quoteInput.placeholder = 'Enter a new quote';
    
    const categoryInput = document.createElement('input');
    categoryInput.type = 'text';
    categoryInput.id = 'newQuoteCategory';
    categoryInput.placeholder = 'Enter quote category';
    
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.onclick = addQuote;
    
    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);
    
    container.appendChild(formContainer);
}

function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();
    
    if (!quoteText || !quoteCategory) {
        alert('Please enter both quote text and category');
        return;
    }
    
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);
    
    // Save to localStorage
    saveQuotes();
    
    // Clear input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    
    // Update category filter
    updateCategoryFilter(document.getElementById('categoryFilter'));
    
    // Show success message
    alert('Quote added successfully!');
    
    // Show the new quote
    displayQuote(newQuote);
}

function updateCategoryFilter(selectElement) {
    const categories = ['all', ...new Set(quotes.map(quote => quote.category))];
    selectElement.innerHTML = '';
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        selectElement.appendChild(option);
    });
}

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function exportToJson() {
    const jsonString = JSON.stringify(quotes, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'quotes.json';
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        try {
            const importedQuotes = JSON.parse(e.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                updateCategoryFilter(document.getElementById('categoryFilter'));
                alert('Quotes imported successfully!');
                showRandomQuote();
            } else {
                throw new Error('Invalid JSON format');
            }
        } catch (error) {
            alert('Error importing quotes: ' + error.message);
        }
    };
    fileReader.readAsText(file);
}
// Initialize quotes from localStorage or use default quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "Life is what happens while you're busy making other plans.", category: "Life" },
    { text: "The only way to do great work is to love what you do.", category: "Work" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
    { text: "Stay hungry, stay foolish.", category: "Inspiration" }
];

// DOM Elements and Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Create main container for better organization
    const mainContainer = document.createElement('div');
    mainContainer.className = 'main-container';
    document.body.appendChild(mainContainer);

    // Create and append the quote display container
    const quoteDisplay = document.getElementById('quoteDisplay') || createQuoteDisplay();
    mainContainer.appendChild(quoteDisplay);
    
    // Create and append category filter
    const categoryContainer = document.createElement('div');
    categoryContainer.className = 'category-filter';
    const categorySelect = document.createElement('select');
    categorySelect.id = 'categoryFilter';
    categorySelect.addEventListener('change', filterQuotes);
    categoryContainer.appendChild(categorySelect);
    mainContainer.appendChild(categoryContainer);
    
    // Create controls container
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'controls-container';
    
    // Add "Show New Quote" button
    const newQuoteButton = document.createElement('button');
    newQuoteButton.id = 'newQuote';
    newQuoteButton.textContent = 'Show New Quote';
    newQuoteButton.addEventListener('click', () => {
        const quote = showRandomQuote(categorySelect.value);
        if (quote) {
            sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
        }
    });
    controlsContainer.appendChild(newQuoteButton);
    
    // Add Export/Import buttons
    addExportImportControls(controlsContainer);
    
    mainContainer.appendChild(controlsContainer);
    
    // Create and append the form for adding new quotes
    createAddQuoteForm(mainContainer);
    
    // Initialize categories and restore last filter
    populateCategories();
    restoreLastFilter();
    
    // Show filtered quotes based on restored filter
    filterQuotes();
});

function populateCategories() {
    const categorySelect = document.getElementById('categoryFilter');
    const categories = ['all', ...new Set(quotes.map(quote => quote.category))].sort();
    
    categorySelect.innerHTML = '';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category === 'all' ? 'All Categories' : 
            category.charAt(0).toUpperCase() + category.slice(1);
        categorySelect.appendChild(option);
    });
}

function filterQuotes() {
    const categorySelect = document.getElementById('categoryFilter');
    const selectedCategory = categorySelect.value;
    
    // Save selected category to localStorage
    localStorage.setItem('lastSelectedCategory', selectedCategory);
    
    const filteredQuotes = selectedCategory === 'all' 
        ? quotes 
        : quotes.filter(quote => quote.category === selectedCategory);
    
    displayFilteredQuotes(filteredQuotes);
}

function displayFilteredQuotes(filteredQuotes) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';
    
    if (filteredQuotes.length === 0) {
        const noQuotesMessage = document.createElement('p');
        noQuotesMessage.className = 'no-quotes-message';
        noQuotesMessage.textContent = 'No quotes available for this category.';
        quoteDisplay.appendChild(noQuotesMessage);
        return;
    }
    
    filteredQuotes.forEach(quote => {
        const quoteElement = createQuoteElement(quote);
        quoteDisplay.appendChild(quoteElement);
    });
}

function createQuoteElement(quote) {
    const quoteContainer = document.createElement('div');
    quoteContainer.className = 'quote-item';
    
    const quoteText = document.createElement('p');
    quoteText.className = 'quote-text';
    quoteText.textContent = `"${quote.text}"`;
    
    const quoteCategory = document.createElement('p');
    quoteCategory.className = 'quote-category';
    quoteCategory.textContent = `Category: ${quote.category}`;
    
    quoteContainer.appendChild(quoteText);
    quoteContainer.appendChild(quoteCategory);
    
    return quoteContainer;
}

function restoreLastFilter() {
    const categorySelect = document.getElementById('categoryFilter');
    const lastCategory = localStorage.getItem('lastSelectedCategory');
    
    if (lastCategory && categorySelect.querySelector(`option[value="${lastCategory}"]`)) {
        categorySelect.value = lastCategory;
    }
}

function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();
    
    if (!quoteText || !quoteCategory) {
        alert('Please enter both quote text and category');
        return;
    }
    
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);
    
    // Save to localStorage
    saveQuotes();
    
    // Clear input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    
    // Update categories and maintain selected filter
    populateCategories();
    restoreLastFilter();
    
    // Refresh displayed quotes
    filterQuotes();
// Server configuration
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const SYNC_INTERVAL = 30000; // 30 seconds

// Data structure for quotes with versioning
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { id: 1, text: "Life is what happens while you're busy making other plans.", category: "Life", version: 1 },
    { id: 2, text: "The only way to do great work is to love what you do.", category: "Work", version: 1 },
    { id: 3, text: "Innovation distinguishes between a leader and a follower.", category: "Leadership", version: 1 },
    { id: 4, text: "Stay hungry, stay foolish.", category: "Inspiration", version: 1 }
];

// Track sync status
let lastSyncTime = localStorage.getItem('lastSyncTime') || null;
let isSyncing = false;

document.addEventListener('DOMContentLoaded', () => {
    setupUI();
    initializeSync();
});

function setupUI() {
    const mainContainer = document.createElement('div');
    mainContainer.className = 'main-container';
    document.body.appendChild(mainContainer);

    // Add sync status indicator
    const syncStatus = document.createElement('div');
    syncStatus.id = 'syncStatus';
    syncStatus.className = 'sync-status';
    mainContainer.appendChild(syncStatus);
    updateSyncStatus('Idle');

    // Add notification area
    const notificationArea = document.createElement('div');
    notificationArea.id = 'notificationArea';
    notificationArea.className = 'notification-area';
    mainContainer.appendChild(notificationArea);

    // Setup other UI elements (reusing previous implementation)
    setupQuoteDisplay(mainContainer);
    setupControls(mainContainer);
    
    // Initialize categories and restore last filter
    populateCategories();
    restoreLastFilter();
    filterQuotes();
}

function initializeSync() {
    // Initial sync
    syncWithServer();
    
    // Set up periodic sync
    setInterval(syncWithServer, SYNC_INTERVAL);
}

async function syncWithServer() {
    if (isSyncing) return;
    isSyncing = true;
    updateSyncStatus('Syncing...');

    try {
        // Simulate fetching server data
        const response = await fetch(API_URL);
        const serverData = await response.json();
        
        // Convert server data to quote format (for simulation)
        const serverQuotes = serverData.slice(0, 5).map(post => ({
            id: post.id,
            text: post.title,
            category: 'Server',
            version: Date.now()
        }));

        // Merge server and local quotes
        await mergeQuotes(serverQuotes);
        
        lastSyncTime = Date.now();
        localStorage.setItem('lastSyncTime', lastSyncTime);
        updateSyncStatus('Last synced: ' + new Date(lastSyncTime).toLocaleTimeString());
        
        // Refresh UI
        populateCategories();
        filterQuotes();
    } catch (error) {
        console.error('Sync failed:', error);
        updateSyncStatus('Sync failed');
        showNotification('Sync failed. Will retry later.', 'error');
    } finally {
        isSyncing = false;
    }
}

async function mergeQuotes(serverQuotes) {
    const conflicts = [];
    
    serverQuotes.forEach(serverQuote => {
        const localQuote = quotes.find(q => q.id === serverQuote.id);
        
        if (!localQuote) {
            // New quote from server
            quotes.push(serverQuote);
            showNotification(`New quote added: "${serverQuote.text}"`, 'info');
        } else if (serverQuote.version > localQuote.version) {
            // Server has newer version
            conflicts.push({ local: localQuote, server: serverQuote });
        }
    });

    if (conflicts.length > 0) {
        await handleConflicts(conflicts);
    }

    saveQuotes();
}

async function handleConflicts(conflicts) {
    conflicts.forEach(conflict => {
        showConflictResolutionDialog(conflict);
    });
}

function showConflictResolutionDialog(conflict) {
    const dialog = document.createElement('div');
    dialog.className = 'conflict-dialog';
    
    const message = document.createElement('p');
    message.textContent = 'Quote conflict detected:';
    
    const localVersion = document.createElement('div');
    localVersion.className = 'version-option';
    localVersion.innerHTML = `
        <h4>Local Version</h4>
        <p>${conflict.local.text}</p>
        <p>Category: ${conflict.local.category}</p>
    `;
    
    const serverVersion = document.createElement('div');
    serverVersion.className = 'version-option';
    serverVersion.innerHTML = `
        <h4>Server Version</h4>
        <p>${conflict.server.text}</p>
        <p>Category: ${conflict.server.category}</p>
    `;
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'conflict-buttons';
    
    const keepLocal = document.createElement('button');
    keepLocal.textContent = 'Keep Local';
    keepLocal.onclick = () => resolveConflict(conflict, 'local');
    
    const keepServer = document.createElement('button');
    keepServer.textContent = 'Keep Server';
    keepServer.onclick = () => resolveConflict(conflict, 'server');
    
    buttonContainer.appendChild(keepLocal);
    buttonContainer.appendChild(keepServer);
    
    dialog.appendChild(message);
    dialog.appendChild(localVersion);
    dialog.appendChild(serverVersion);
    dialog.appendChild(buttonContainer);
    
    document.getElementById('notificationArea').appendChild(dialog);
}

function resolveConflict(conflict, choice) {
    const index = quotes.findIndex(q => q.id === conflict.local.id);
    if (index !== -1) {
        quotes[index] = choice === 'local' ? 
            { ...conflict.local, version: Date.now() } : 
            { ...conflict.server, version: Date.now() };
    }
    
    saveQuotes();
    filterQuotes();
    
    // Remove conflict dialog
    const dialogs = document.querySelectorAll('.conflict-dialog');
    dialogs.forEach(dialog => dialog.remove());
    
    showNotification('Conflict resolved successfully', 'success');
}

function updateSyncStatus(status) {
    const statusElement = document.getElementById('syncStatus');
    if (statusElement) {
        statusElement.textContent = status;
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const notificationArea = document.getElementById('notificationArea');
    notificationArea.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Enhance existing quote operations with versioning
function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value.trim();
    const quoteCategory = document.getElementById('newQuoteCategory').value.trim();
    
    if (!quoteText || !quoteCategory) {
        showNotification('Please enter both quote text and category', 'error');
        return;
    }
    
    const newQuote = {
        id: Date.now(),
        text: quoteText,
        category: quoteCategory,
        version: Date.now()
    };
    
    quotes.push(newQuote);
    saveQuotes();
    
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    
    populateCategories();
    filterQuotes();
    
    showNotification('Quote added successfully', 'success');
}
    
    alert('Quote added successfully!');
}

function addExportImportControls(container) {
    // Export button
    const exportButton = document.createElement('button');

    
    exportButton.textContent = 'Export Quotes';
    exportButton.onclick = exportToJson;
    container.appendChild(exportButton);
    
    // Import container
    const importContainer = document.createElement('div');
    importContainer.className = 'import-container';
    const importInput = document.createElement('input');
    importInput.type = 'file';
    importInput.id = 'importFile';
    importInput.accept = '.json';
    importInput.onchange = importFromJsonFile;
    const importLabel = document.createElement('label');
    importLabel.textContent = 'Import Quotes: ';
    importLabel.appendChild(importInput);







































    importContainer.appendChild(importLabel);
    container.appendChild(importContainer);
}

// Retain existing helper functions (saveQuotes, exportToJson, importFromJsonFile, etc.)

async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching quotes:', error);
    }
}
setInterval(async () => {
    const newQuotes = await fetchQuotesFromServer();
    updateLocalData(newQuotes);
}, 60000); // Fetch every 60 seconds
function updateLocalData(newQuotes) {
    const currentQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    
    // Example: Overwrite or merge quotes from the server
    newQuotes.forEach(newQuote => {
        const existingQuoteIndex = currentQuotes.findIndex(q => q.id === newQuote.id);
        if (existingQuoteIndex === -1) {
            currentQuotes.push(newQuote); // New quote from server
        } else {
            currentQuotes[existingQuoteIndex] = newQuote; // Update quote if necessary
        }
    });

    localStorage.setItem('quotes', JSON.stringify(currentQuotes));
}
function resolveConflict(localQuote, serverQuote) {
    // If the local quote has been updated, give precedence to the server version
    return serverQuote;
}
function showConflictNotification(localQuote, serverQuote) {
    document.getElementById('localQuoteText').innerText = localQuote.text;
    document.getElementById('serverQuoteText').innerText = serverQuote.text;
    document.getElementById('conflictNotification').style.display = 'block';

    document.getElementById('resolveConflictBtn').onclick = () => {
        const resolvedQuote = resolveConflict(localQuote, serverQuote);
        updateLocalData([resolvedQuote]);
        document.getElementById('conflictNotification').style.display = 'none';
    };
let quotes = [];

// Load quotes from local storage when the page loads
if (localStorage.getItem('quotes')) {
    quotes = JSON.parse(localStorage.getItem('quotes'));
}

function addQuote(newQuote) {
    quotes.push(newQuote);
    saveQuotes();
}

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}
    window.onload = function() {
    if (localStorage.getItem('quotes')) {
        quotes = JSON.parse(localStorage.getItem('quotes'));
        // Render quotes to the DOM
    }
};
    window.onload = function() {
    if (localStorage.getItem('quotes')) {
        quotes = JSON.parse(localStorage.getItem('quotes'));
        // Render quotes to the DOM
    }
};
    function setLastViewedQuote(quote) {
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
}

function getLastViewedQuote() {
    return JSON.parse(sessionStorage.getItem('lastViewedQuote'));
}
    function exportQuotes() {
    const dataStr = JSON.stringify(quotes);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';
    link.click();
    URL.revokeObjectURL(url);
}

document.getElementById('exportButton').addEventListener('click', exportQuotes);
    function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
        // Render quotes to the DOM
    };
    fileReader.readAsText(event.target.files[0]);
}
    let quotes = [];

// Load quotes from local storage when the page loads
if (localStorage.getItem('quotes')) {
    quotes = JSON.parse(localStorage.getItem('quotes'));
}

function addQuote(newQuote) {
    quotes.push(newQuote);
    saveQuotes();
}

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function exportQuotes() {
    const dataStr = JSON.stringify(quotes);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';
    link.click();
    URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
        // Render quotes to the DOM
    };
    fileReader.readAsText(event.target.files[0]);
}

document.getElementById('exportButton').addEventListener('click', exportQuotes);
    

let quotes = [];

// Load quotes from local storage when the page loads
if (localStorage.getItem('quotes')) {
    quotes = JSON.parse(localStorage.getItem('quotes'));
}

function addQuote(newQuote) {
    quotes.push(newQuote);
    saveQuotes();
}

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function exportQuotes() {
    const dataStr = JSON.stringify(quotes);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';
    link.click();
    URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
        // Render quotes to the DOM
    };
    fileReader.readAsText(event.target.files[0]);
}

document.getElementById('exportButton').addEventListener('click', exportQuotes);
