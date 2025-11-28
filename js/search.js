// ============================================
// GLOBAL INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeAllSections();
    console.log('✓ All Sections Initialized Successfully!');
});

// ============================================
// INITIALIZE ALL SECTIONS
// ============================================
function initializeAllSections() {
    initHeader();
    initProductGallery();
    initProductActions();
    initTabs();
    initRecommendations();
    initRelatedProducts();
    initBanner();
    initFooter();
    initScrollAnimations();
}

// ============================================
// HEADER - TOP BAR & NAVIGATION
// ============================================
function initHeader() {
    // Search Functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                console.log('Search:', query);
                showNotification(`Searching for: "${query}"`, 'info');
            } else {
                showNotification('Please enter a search term', 'warning');
            }
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // Category Dropdown
    const categoryDropdown = document.getElementById('categoryDropdown');
    if (categoryDropdown) {
        categoryDropdown.addEventListener('change', function() {
            const category = this.value;
            if (category) {
                const categoryText = this.options[this.selectedIndex].text;
                console.log('Category Selected:', categoryText);
                showNotification(`Category: ${categoryText}`, 'success');
            }
        });
    }
    
    // Top Icons Hover Effect
    const iconItems = document.querySelectorAll('.icon-item');
    iconItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.transition = 'transform 0.3s ease';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // All Category Button
    const allCategoryBtn = document.getElementById('allCategoryBtn');
    if (allCategoryBtn) {
        allCategoryBtn.addEventListener('click', function() {
            console.log('All Categories Clicked');
            showNotification('Opening categories menu...', 'info');
        });
    }
    
    // Navigation Items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (!this.id && this.tagName === 'A') {
                e.preventDefault();
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                const navText = this.textContent.trim();
                showNotification(`Navigating to: ${navText}`, 'info');
            }
        });
    });
    
    console.log('✓ Header Initialized');
}

// ============================================
// PRODUCT GALLERY - IMAGE SWITCHING
// ============================================
function initProductGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    
    if (!mainImage || thumbnails.length === 0) return;
    
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            const imgElement = this.querySelector('img');
            
            // Remove active class from all thumbnails
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth image transition
            mainImage.style.opacity = '0';
            mainImage.style.transform = 'scale(0.95)';
            mainImage.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                mainImage.src = imgElement.src;
                mainImage.alt = imgElement.alt;
                mainImage.style.opacity = '1';
                mainImage.style.transform = 'scale(1)';
                
                showNotification(`Viewing: ${index + 1} of ${thumbnails.length}`, 'info');
            }, 200);
        });
        
        // Keyboard Navigation
        thumbnail.addEventListener('keydown', function(e) {
            let newIndex;
            
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                newIndex = (index + 1) % thumbnails.length;
                thumbnails[newIndex].click();
                thumbnails[newIndex].focus();
            }
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                newIndex = (index - 1 + thumbnails.length) % thumbnails.length;
                thumbnails[newIndex].click();
                thumbnails[newIndex].focus();
            }
            
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Main Image Click - Lightbox
    mainImage.style.cursor = 'zoom-in';
    mainImage.addEventListener('click', function() {
        openImageLightbox(this.src);
        showNotification('Zoom mode activated - Click anywhere to close', 'info');
    });
    
    console.log('✓ Product Gallery Initialized');
}

// ============================================
// PRODUCT ACTIONS - BUTTONS
// ============================================
function initProductActions() {
    // Send Inquiry Button
    const sendInquiryBtn = document.querySelector('.send-inquiry-btn');
    if (sendInquiryBtn) {
        sendInquiryBtn.addEventListener('click', function() {
            const productName = document.querySelector('.product-title')?.textContent || 'this product';
            const supplierName = document.querySelector('.supplier-name')?.textContent || 'the supplier';
            
            // Button animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.style.transform = 'scale(1)', 150);
            
            console.log('Inquiry Sent:', { product: productName, supplier: supplierName });
            showNotification(`Inquiry sent to ${supplierName}! We'll contact you soon.`, 'success');
        });
    }
    
    // Seller Profile Button
    const sellerProfileBtn = document.querySelector('.seller-profile-btn');
    if (sellerProfileBtn) {
        sellerProfileBtn.addEventListener('click', function() {
            const supplierName = document.querySelector('.supplier-name')?.textContent || 'Seller';
            
            this.style.transform = 'scale(0.98)';
            setTimeout(() => this.style.transform = 'scale(1)', 150);
            
            console.log('View Seller Profile:', supplierName);
            showNotification(`Loading ${supplierName}'s profile...`, 'info');
        });
    }
    
    // Save for Later Button
    const saveLaterBtn = document.querySelector('.save-later-btn');
    if (saveLaterBtn) {
        let isSaved = loadSaveStatus();
        updateSaveButton(saveLaterBtn, isSaved);
        
        saveLaterBtn.addEventListener('click', function() {
            isSaved = !isSaved;
            updateSaveButton(this, isSaved);
            saveToFavorites('product-123', isSaved);
            
            const productName = document.querySelector('.product-title')?.textContent || 'Product';
            const message = isSaved ? `"${productName}" saved to favorites!` : 'Removed from favorites';
            showNotification(message, isSaved ? 'success' : 'info');
        });
    }
    
    // Price Box Selection
    const priceBoxes = document.querySelectorAll('.price-box');
    priceBoxes.forEach(box => {
        box.addEventListener('click', function() {
            const amount = this.querySelector('.price-amount')?.textContent || '';
            const range = this.querySelector('.price-range')?.textContent || '';
            
            // Reset all boxes
            priceBoxes.forEach(b => {
                b.style.transform = 'scale(1)';
                b.style.boxShadow = '';
                b.style.borderColor = '#e5e7eb';
            });
            
            // Highlight selected box
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 4px 12px rgba(14, 88, 248, 0.15)';
            this.style.borderColor = '#0e58f8';
            this.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
            
            console.log('Price Selected:', { amount, range });
            showNotification(`Selected: ${amount} (${range})`, 'success');
        });
    });
    
    console.log('✓ Product Actions Initialized');
}

// ============================================
// PRODUCT TABS
// ============================================
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            const tabName = this.textContent.trim();
            
            // Update button states
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            
            // Update content visibility
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.hidden = true;
            });
            
            // Activate current tab
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            const activeContent = document.getElementById(targetTab);
            if (activeContent) {
                activeContent.classList.add('active');
                activeContent.hidden = false;
                
                // Smooth scroll for mobile
                if (window.innerWidth <= 768) {
                    this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
            
            showNotification(`Viewing: ${tabName}`, 'info');
        });
        
        // Keyboard Navigation
        button.addEventListener('keydown', function(e) {
            let newIndex;
            
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                newIndex = (index + 1) % tabButtons.length;
                tabButtons[newIndex].click();
                tabButtons[newIndex].focus();
            }
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                tabButtons[newIndex].click();
                tabButtons[newIndex].focus();
            }
            
            if (e.key === 'Home') {
                e.preventDefault();
                tabButtons[0].click();
                tabButtons[0].focus();
            }
            
            if (e.key === 'End') {
                e.preventDefault();
                tabButtons[tabButtons.length - 1].click();
                tabButtons[tabButtons.length - 1].focus();
            }
        });
    });
    
    console.log('✓ Product Tabs Initialized');
}

// ============================================
// RECOMMENDATIONS SIDEBAR
// ============================================
function initRecommendations() {
    const recommendationItems = document.querySelectorAll('.recommendation-item');
    
    recommendationItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const productName = this.querySelector('.recommendation-name')?.textContent || 'Product';
            const productPrice = this.querySelector('.recommendation-price')?.textContent || '';
            
            // Click animation
            this.style.transform = 'scale(0.98)';
            this.style.boxShadow = '0 4px 12px rgba(14, 88, 248, 0.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
            }, 200);
            
            console.log('Recommendation Clicked:', { name: productName, price: productPrice });
            showNotification(`Opening: ${productName} - ${productPrice}`, 'info');
        });
        
        // Hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    console.log('✓ Recommendations Initialized');
}

// ============================================
// RELATED PRODUCTS
// ============================================
function initRelatedProducts() {
    const relatedProducts = document.querySelectorAll('.related-product-card');
    
    relatedProducts.forEach((product, index) => {
        // Staggered animation delay
        product.style.animationDelay = `${index * 0.1}s`;
        
        product.addEventListener('click', function() {
            const productName = this.querySelector('.related-product-name')?.textContent || 'Product';
            const productPrice = this.querySelector('.related-product-price')?.textContent || '';
            
            // Click animation
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
            }, 300);
            
            console.log('Related Product Clicked:', { name: productName, price: productPrice });
            showNotification(`Viewing: ${productName} - ${productPrice}`, 'info');
        });
        
        // Enhanced hover effects
        product.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.12)';
            this.style.transition = 'all 0.3s ease';
        });
        
        product.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    console.log('✓ Related Products Initialized');
}

// ============================================
// DISCOUNT BANNER
// ============================================
function initBanner() {
    const shopNowBtn = document.querySelector('.banner-btn');
    
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', function() {
            console.log('Shop Now Clicked!');
            showNotification('Exploring amazing deals...', 'success');
            
            // Button animation
            this.style.transform = 'scale(0.95)';
            this.style.background = 'linear-gradient(45deg, #fb923c, #fdba74)';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.background = '#fb923c';
            }, 200);
            
            // Simulate navigation
            setTimeout(() => {
                // window.location.href = '/shop.html';
            }, 1000);
        });
        
        // Hover effect
        shopNowBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(251, 146, 60, 0.4)';
        });
        
        shopNowBtn.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    }
    
    console.log('✓ Discount Banner Initialized');
}

// ============================================
// FOOTER
// ============================================
function initFooter() {
    // Language Selector
    const languageBtn = document.querySelector('.language-btn');
    const languageDropdown = document.querySelector('.language-dropdown');
    
    if (languageBtn && languageDropdown) {
        languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isVisible = languageDropdown.style.display === 'block';
            languageDropdown.style.display = isVisible ? 'none' : 'block';
            
            if (!isVisible) {
                showNotification('Select your preferred language', 'info');
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            if (languageDropdown) languageDropdown.style.display = 'none';
        });
    }
    
    // Language Options
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const language = this.querySelector('span')?.textContent || 'Language';
            
            console.log('Language Selected:', language);
            showNotification(`Language changed to ${language}`, 'success');
            
            // Update main button
            if (languageBtn) {
                const flag = this.querySelector('img').cloneNode(true);
                const text = this.querySelector('span').cloneNode(true);
                
                languageBtn.innerHTML = '';
                languageBtn.appendChild(flag);
                languageBtn.appendChild(text);
                
                const arrow = document.createElement('svg');
                arrow.className = 'language-arrow';
                arrow.innerHTML = '<path d="M6 9l6 6 6-6"/>';
                languageBtn.appendChild(arrow);
            }
            
            languageDropdown.style.display = 'none';
        });
    });
    
    // Footer Links Animation
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.color = '#0e58f8';
            this.style.transition = 'all 0.3s ease';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = '';
        });
    });
    
    // Social Icons Animation
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.transition = 'all 0.3s ease';
        });
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0)';
        });
        
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(1.2) rotate(10deg)';
            setTimeout(() => this.style.transform = '', 300);
            
            const platform = this.getAttribute('aria-label') || 'Social Media';
            showNotification(`Opening ${platform}...`, 'info');
        });
    });
    
    console.log('✓ Footer Initialized');
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.discount-banner, .related-products-section, .product-tabs-section');
        
        elements.forEach(el => {
            if (isElementInViewport(el)) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.transition = 'all 0.6s ease';
            }
        });
    };
    
    // Initialize scroll animations
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Smooth Scroll for Breadcrumb
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb-link');
    breadcrumbLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(1.05)';
            this.style.color = '#0e58f8';
            setTimeout(() => {
                this.style.transform = '';
                this.style.color = '';
            }, 200);
            
            const pageName = this.textContent.trim();
            showNotification(`Loading: ${pageName}`, 'info');
        });
    });
}

// ============================================
// NOTIFICATION SYSTEM - IMPROVED
// ============================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.custom-notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification notification-${type}`;
    
    // Set notification styles with softer colors
    const notificationStyles = {
        success: {
            background: 'linear-gradient(135deg, #10b981, #059669)',
            icon: '✓'
        },
        error: {
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            icon: '✕'
        },
        warning: {
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            icon: '⚠'
        },
        info: {
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            icon: 'ℹ'
        }
    };
    
    const style = notificationStyles[type] || notificationStyles.info;
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${style.icon}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        min-width: 300px;
        max-width: 400px;
        background: ${style.background};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        font-family: Arial, sans-serif;
        overflow: hidden;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        padding: 16px 20px;
        gap: 12px;
    `;
    
    const icon = notification.querySelector('.notification-icon');
    icon.style.cssText = `
        font-size: 18px;
        font-weight: bold;
        flex-shrink: 0;
    `;
    
    const messageEl = notification.querySelector('.notification-message');
    messageEl.style.cssText = `
        flex: 1;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.4;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: rgba(255, 255, 255, 0.2);
        border: none;
        border-radius: 6px;
        color: white;
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        flex-shrink: 0;
    `;
    
    closeBtn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 255, 255, 0.3)';
        this.style.transform = 'rotate(90deg)';
    });
    
    closeBtn.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.2)';
        this.style.transform = 'rotate(0)';
    });
    
    closeBtn.addEventListener('click', function() {
        closeNotification(notification);
    });
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    const autoRemove = setTimeout(() => {
        closeNotification(notification);
    }, 4000);
    
    // Pause auto-remove on hover
    notification.addEventListener('mouseenter', () => {
        clearTimeout(autoRemove);
    });
    
    notification.addEventListener('mouseleave', () => {
        setTimeout(() => {
            closeNotification(notification);
        }, 4000);
    });
    
    function closeNotification(notif) {
        notif.style.animation = 'slideOutRight 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53)';
        setTimeout(() => {
            if (notif.parentElement) {
                notif.remove();
            }
        }, 300);
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================
function saveToFavorites(productId, isSaved) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (isSaved) {
        if (!favorites.includes(productId)) {
            favorites.push(productId);
        }
    } else {
        favorites = favorites.filter(id => id !== productId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log('Favorites Updated:', favorites);
}

function loadSaveStatus() {
    const productId = 'product-123';
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.includes(productId);
}

function updateSaveButton(button, isSaved) {
    const icon = button.querySelector('i');
    const text = button.querySelector('span');
    
    if (isSaved) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        button.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        button.style.color = 'white';
        button.style.borderColor = '#ef4444';
        text.textContent = 'Saved';
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        button.style.background = '#ffffff';
        button.style.color = '#0e58f8';
        button.style.borderColor = '#e5e7eb';
        text.textContent = 'Save for later';
    }
    
    button.style.transition = 'all 0.3s ease';
}

function openImageLightbox(imageSrc) {
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay">
            <img src="${imageSrc}" alt="Product Image">
            <button class="lightbox-close" aria-label="Close lightbox">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    const overlay = lightbox.querySelector('.lightbox-overlay');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    
    // Lightbox styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        animation: fadeIn 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    overlay.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;
    
    const img = overlay.querySelector('img');
    img.style.cssText = `
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    `;
    
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.2);
        border: 2px solid white;
        border-radius: 50%;
        color: white;
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 255, 255, 0.3)';
        this.style.transform = 'rotate(90deg)';
    });
    
    closeBtn.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.2)';
        this.style.transform = 'rotate(0)';
    });
    
    const closeLightbox = () => {
        lightbox.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            lightbox.remove();
            document.body.style.overflow = '';
        }, 300);
    };
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeLightbox();
    });
    
    closeBtn.addEventListener('click', closeLightbox);
    
    document.addEventListener('keydown', function escapeClose(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', escapeClose);
        }
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// ADD ENHANCED ANIMATIONS TO CSS
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { 
            transform: translateX(100%); 
            opacity: 0; 
        }
        to { 
            transform: translateX(0); 
            opacity: 1; 
        }
    }
    
    @keyframes slideOutRight {
        from { 
            transform: translateX(0); 
            opacity: 1; 
        }
        to { 
            transform: translateX(100%); 
            opacity: 0; 
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes bounceIn {
        0% { transform: scale(0.3); opacity: 0; }
        50% { transform: scale(1.05); }
        70% { transform: scale(0.9); }
        100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .custom-notification {
        animation: slideInRight 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
    }
`;
document.head.appendChild(style);

console.log(' JavaScript Fully Loaded and Interactive!');