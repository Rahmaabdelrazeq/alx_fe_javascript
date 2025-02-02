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
