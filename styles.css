// Docuhub Documentation Site JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar navigation
    initializeSidebar();
    
    // Search functionality
    initializeSearch();
    
    // Interactive elements
    initializeInteractiveElements();
    
    // Mobile responsiveness
    initializeMobileFeatures();
});

// Initialize sidebar navigation
function initializeSidebar() {
    const sidebarSections = document.querySelectorAll('.nav-section-header');
    
    sidebarSections.forEach(header => {
        header.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            const content = document.getElementById(sectionId);
            
            // Toggle expanded class
            this.classList.toggle('expanded');
            content.classList.toggle('expanded');
            
            // Optional: Close other sections for accordion behavior
            // Uncomment the following block to enable accordion mode
            /*
            sidebarSections.forEach(otherHeader => {
                if (otherHeader !== this) {
                    otherHeader.classList.remove('expanded');
                    const otherId = otherHeader.getAttribute('data-section');
                    const otherContent = document.getElementById(otherId);
                    otherContent.classList.remove('expanded');
                }
            });
            */
        });
    });
    
    // Auto-expand first section on load
    const firstSection = document.querySelector('.nav-section-header');
    if (firstSection) {
        const firstContent = document.getElementById(firstSection.getAttribute('data-section'));
        firstSection.classList.add('expanded');
        if (firstContent) {
            firstContent.classList.add('expanded');
        }
    }
    
    // Handle navigation link clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Here you would typically load the content for this section
            console.log('Loading content for:', this.textContent);
            
            // Close mobile sidebar if open
            if (window.innerWidth <= 1024) {
                const sidebar = document.querySelector('.sidebar');
                sidebar.classList.remove('mobile-open');
            }
        });
    });
}

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
        
        // Clear search highlighting when input is cleared
        searchInput.addEventListener('input', function() {
            if (this.value === '') {
                clearSearchHighlight();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim().toLowerCase();
    
    if (query) {
        console.log('Performing search for:', query);
        
        // Highlight matching navigation items
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const text = link.textContent.toLowerCase();
            if (text.includes(query)) {
                link.style.background = '#fff3cd';
                link.style.color = '#856404';
                link.style.fontWeight = 'bold';
                
                // Expand parent section if needed
                const parentSection = link.closest('.nav-section-content');
                if (parentSection) {
                    const parentHeader = document.querySelector(`[data-section="${parentSection.id}"]`);
                    if (parentHeader && !parentHeader.classList.contains('expanded')) {
                        parentHeader.classList.add('expanded');
                        parentSection.classList.add('expanded');
                    }
                }
            }
        });
        
        // Show search feedback
        showSearchFeedback(query);
    }
}

function clearSearchHighlight() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.style.background = '';
        link.style.color = '';
        link.style.fontWeight = '';
    });
    hideSearchFeedback();
}

function showSearchFeedback(query) {
    // Remove existing feedback
    const existingFeedback = document.querySelector('.search-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Create new feedback
    const feedback = document.createElement('div');
    feedback.className = 'search-feedback';
    feedback.innerHTML = `
        <p><i class="fas fa-search"></i> Searching for: "<strong>${query}</strong>"</p>
        <button class="clear-search" onclick="clearSearch()">
            <i class="fas fa-times"></i> Clear
        </button>
    `;
    
    const searchSection = document.querySelector('.search-section');
    searchSection.appendChild(feedback);
}

function hideSearchFeedback() {
    const feedback = document.querySelector('.search-feedback');
    if (feedback) {
        feedback.remove();
    }
}

function clearSearch() {
    const searchInput = document.querySelector('.search-input');
    searchInput.value = '';
    clearSearchHighlight();
}

// Initialize mobile features
function initializeMobileFeatures() {
    // Create mobile sidebar toggle
    const mobileToggle = document.createElement('button');
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileToggle.className = 'mobile-sidebar-toggle';
    mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Style the mobile toggle
    mobileToggle.style.cssText = `
        display: none;
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 1000;
        background: #6366f1;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 12px;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
        transition: all 0.2s ease;
    `;
    
    document.body.appendChild(mobileToggle);
    
    // Show/hide mobile toggle based on screen size
    function handleResize() {
        if (window.innerWidth <= 1024) {
            mobileToggle.style.display = 'block';
        } else {
            mobileToggle.style.display = 'none';
            document.querySelector('.sidebar').classList.remove('mobile-open');
        }
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Mobile toggle click handler
    mobileToggle.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('mobile-open');
        
        // Update icon
        const icon = this.querySelector('i');
        if (sidebar.classList.contains('mobile-open')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        const sidebar = document.querySelector('.sidebar');
        if (window.innerWidth <= 1024 && 
            sidebar.classList.contains('mobile-open') && 
            !sidebar.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            sidebar.classList.remove('mobile-open');
            mobileToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    });
}

// Interactive elements
function initializeInteractiveElements() {
    // Popular tag click handling
    const popularTags = document.querySelectorAll('.tag');
    popularTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagText = this.textContent.toLowerCase();
            const searchInput = document.querySelector('.search-input');
            
            if (searchInput) {
                searchInput.value = tagText;
                performSearch();
            }
            
            // Find and activate matching nav link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                if (link.textContent.toLowerCase().includes(tagText)) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Expand parent section if needed
                    const parentSection = link.closest('.nav-section-content');
                    if (parentSection) {
                        const parentHeader = document.querySelector(`[data-section="${parentSection.id}"]`);
                        if (parentHeader && !parentHeader.classList.contains('expanded')) {
                            parentHeader.classList.add('expanded');
                            parentSection.classList.add('expanded');
                        }
                    }
                }
            });
        });
    });
    
    // Quick link card hover effects
    const quickLinkCards = document.querySelectorAll('.quick-link-card');
    quickLinkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Quick link button clicks
    const quickLinkBtns = document.querySelectorAll('.quick-link-btn');
    quickLinkBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const cardTitle = this.closest('.quick-link-card').querySelector('h3').textContent;
            
            // Find corresponding nav link and activate it
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                if (link.textContent.toLowerCase().includes(cardTitle.toLowerCase())) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    link.click();
                }
            });
        });
    });
}

// Add CSS for search feedback and animations
const styles = `
    .search-feedback {
        background: #f0f4ff;
        border: 1px solid #c7d2fe;
        border-radius: 8px;
        padding: 1rem;
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        animation: slideIn 0.3s ease;
    }
    
    .search-feedback p {
        margin: 0;
        color: #4338ca;
        font-size: 0.9rem;
    }
    
    .clear-search {
        background: #6366f1;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 0.5rem 1rem;
        cursor: pointer;
        font-size: 0.8rem;
        transition: all 0.2s ease;
    }
    
    .clear-search:hover {
        background: #4f46e5;
    }
    
    @keyframes slideIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .mobile-sidebar-toggle:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Export functions for use in other scripts
window.DocuhubDocs = {
    performSearch,
    clearSearch,
    showSearchFeedback,
    hideSearchFeedback
};
