// DigitalOcean-style Documentation Site JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    initializeSearch();
    
    // Filter functionality
    initializeFilters();
    
    // Interactive elements
    initializeInteractiveElements();
    
    // Smooth scrolling for anchor links
    initializeSmoothScrolling();
});

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Auto-complete functionality (placeholder)
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            // Here you could implement auto-complete logic
            console.log('Searching for:', query);
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim();
    
    if (query) {
        console.log('Performing search for:', query);
        // Here you would implement actual search logic
        // For now, we'll just filter the visible cards
        filterContentBySearch(query);
    }
}

function filterContentBySearch(query) {
    const resultCards = document.querySelectorAll('.result-card');
    const featuredCards = document.querySelectorAll('.featured-card');
    
    [...resultCards, ...featuredCards].forEach(card => {
        const title = card.querySelector('.result-title, .card-title')?.textContent.toLowerCase() || '';
        const type = card.querySelector('.result-type, .card-type')?.textContent.toLowerCase() || '';
        
        if (title.includes(query.toLowerCase()) || type.includes(query.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter functionality
function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter content
            const filterType = this.textContent.toLowerCase();
            filterContent(filterType);
        });
    });
}

function filterContent(filterType) {
    const resultCards = document.querySelectorAll('.result-card');
    
    resultCards.forEach(card => {
        const cardType = card.querySelector('.result-type')?.textContent.toLowerCase() || '';
        
        if (filterType === 'all' || cardType.includes(filterType)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease-in';
        } else {
            card.style.display = 'none';
        }
    });
}

// Interactive elements
function initializeInteractiveElements() {
    // Topic tags functionality
    const topicTags = document.querySelectorAll('.topic-tag');
    topicTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagText = this.textContent;
            const searchInput = document.querySelector('.search-input');
            
            if (searchInput) {
                searchInput.value = `[${tagText}]`;
                performSearch();
            }
        });
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.featured-card, .result-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Pagination functionality
    initializePagination();
}

function initializePagination() {
    const pageButtons = document.querySelectorAll('.page-btn:not(.active)');
    
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.disabled && !this.classList.contains('active')) {
                // Remove active class from all buttons
                document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button (if it's a number)
                if (!isNaN(this.textContent)) {
                    this.classList.add('active');
                }
                
                // Scroll to top of results
                document.querySelector('.results-section').scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Here you would load new content for the selected page
                console.log('Loading page:', this.textContent);
            }
        });
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Advanced search with tags
function parseSearchQuery(query) {
    const tags = [];
    const keywords = [];
    
    // Extract tags in brackets [tag]
    const tagRegex = /\[([^\]]+)\]/g;
    let match;
    
    while ((match = tagRegex.exec(query)) !== null) {
        tags.push(match[1].toLowerCase());
    }
    
    // Extract remaining keywords
    const remainingQuery = query.replace(tagRegex, '').trim();
    if (remainingQuery) {
        keywords.push(...remainingQuery.toLowerCase().split(/\s+/));
    }
    
    return { tags, keywords };
}

// Dark mode toggle (optional feature)
function initializeDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.classList.add('dark-mode-toggle');
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    // Add to header
    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
        navActions.appendChild(darkModeToggle);
    }
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'true');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'false');
        }
    });
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
}

// Initialize dark mode (uncomment to enable)
// initializeDarkMode();

// Loading animation for dynamic content
function showLoadingState() {
    const resultsGrid = document.querySelector('.results-grid');
    if (resultsGrid) {
        resultsGrid.innerHTML = `
            <div class="loading-placeholder">
                <div class="loading-spinner"></div>
                <p>Loading content...</p>
            </div>
        `;
    }
}

// Add CSS for loading spinner
const loadingStyles = `
    .loading-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 4rem 2rem;
        color: #6b7280;
    }
    
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #e5e7eb;
        border-top: 3px solid #0080ff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .dark-mode-toggle {
        background: none;
        border: 1px solid #d1d5db;
        color: #374151;
        padding: 0.5rem;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
        margin-left: 0.5rem;
    }
    
    .dark-mode-toggle:hover {
        background: #f9fafb;
        border-color: #9ca3af;
    }
`;

// Inject loading styles
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);

// Export functions for use in other scripts
window.DocumentationSite = {
    performSearch,
    filterContent,
    showLoadingState,
    parseSearchQuery
};
