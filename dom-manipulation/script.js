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
