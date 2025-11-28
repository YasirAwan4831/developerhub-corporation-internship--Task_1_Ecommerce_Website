// ============================================
// SHOPPING CART JAVASCRIPT
// ============================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // CART FUNCTIONALITY
    // ============================================
    
    // Initialize cart functionality
    initializeCart();
    
    // ============================================
    // COUPON FUNCTIONALITY
    // ============================================
    
    initializeCoupon();
    
    // ============================================
    // CHECKOUT FUNCTIONALITY
    // ============================================
    
    initializeCheckout();
    
    // ============================================
    // SAVED FOR LATER FUNCTIONALITY
    // ============================================
    
    initializeSavedItems();
    
    // ============================================
    // LANGUAGE DROPDOWN
    // ============================================
    
    initializeLanguageDropdown();
    
    // ============================================
    // ANIMATIONS
    // ============================================
    
    initializeAnimations();
});

// ============================================
// CART INITIALIZATION
// ============================================

function initializeCart() {
    // Remove item from cart
    const removeButtons = document.querySelectorAll('.btn-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            removeCartItem(cartItem);
        });
    });
    
    // Save for later
    const saveButtons = document.querySelectorAll('.btn-save');
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            saveForLater(cartItem);
        });
    });
    
    // Remove all items
    const removeAllButton = document.querySelector('.btn-remove-all');
    if (removeAllButton) {
        removeAllButton.addEventListener('click', removeAllItems);
    }
    
    // Quantity change
    const qtyDropdowns = document.querySelectorAll('.qty-dropdown');
    qtyDropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', function() {
            updateCartTotal();
            showNotification('Quantity updated successfully!', 'success');
        });
    });
    
    // Back to shop
    const backToShopButton = document.querySelector('.btn-back-shop');
    if (backToShopButton) {
        backToShopButton.addEventListener('click', function() {
            // Replace with your actual shop page URL
            window.location.href = 'index.html';
        });
    }
}

// ============================================
// CART FUNCTIONS
// ============================================

function removeCartItem(cartItem) {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
        // Add removal animation
        cartItem.style.transition = 'all 0.3s ease';
        cartItem.style.opacity = '0';
        cartItem.style.transform = 'translateX(-100px)';
        cartItem.style.height = '0';
        cartItem.style.margin = '0';
        cartItem.style.padding = '0';
        
        setTimeout(() => {
            cartItem.remove();
            updateCartCount();
            updateCartTotal();
            showNotification('Item removed from cart', 'info');
        }, 300);
    }
}

function saveForLater(cartItem) {
    const productTitle = cartItem.querySelector('.item-title').textContent;
    
    // Animation
    cartItem.style.transition = 'all 0.3s ease';
    cartItem.style.opacity = '0';
    cartItem.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        cartItem.remove();
        updateCartCount();
        updateCartTotal();
        showNotification(`"${productTitle}" saved for later`, 'success');
    }, 300);
}

function removeAllItems() {
    const cartItems = document.querySelectorAll('.cart-item');
    
    if (cartItems.length === 0) {
        showNotification('Your cart is already empty', 'info');
        return;
    }
    
    if (confirm('Are you sure you want to remove all items from your cart?')) {
        cartItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '0';
                item.style.transform = 'translateX(-100px)';
                item.style.height = '0';
                item.style.margin = '0';
                item.style.padding = '0';
                
                setTimeout(() => {
                    item.remove();
                    if (index === cartItems.length - 1) {
                        updateCartCount();
                        updateCartTotal();
                        showNotification('All items removed from cart', 'info');
                    }
                }, 300);
            }, index * 100);
        });
    }
}

// ============================================
// COUPON FUNCTIONALITY
// ============================================

function initializeCoupon() {
    const applyButton = document.querySelector('.btn-apply');
    const couponInput = document.querySelector('.coupon-input');
    
    if (applyButton && couponInput) {
        applyButton.addEventListener('click', applyCoupon);
        
        // Apply coupon on Enter key
        couponInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyCoupon();
            }
        });
    }
}

function applyCoupon() {
    const couponInput = document.querySelector('.coupon-input');
    const couponCode = couponInput.value.trim().toUpperCase();
    
    if (couponCode === '') {
        showNotification('Please enter a coupon code', 'error');
        return;
    }
    
    // Valid coupon codes with their discounts
    const validCoupons = {
        'SAVE10': 10,
        'SAVE20': 20,
        'DISCOUNT50': 50,
        'WELCOME15': 15,
        'FIRSTORDER': 25
    };
    
    if (validCoupons[couponCode]) {
        const discount = validCoupons[couponCode];
        applyDiscount(discount);
        couponInput.value = '';
        showNotification(`Coupon applied! You saved $${discount}`, 'success');
    } else {
        showNotification('Invalid coupon code. Please try again.', 'error');
    }
}

// ============================================
// CHECKOUT FUNCTIONALITY
// ============================================

function initializeCheckout() {
    const checkoutButton = document.querySelector('.btn-checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', processCheckout);
    }
}

function processCheckout() {
    const cartItems = document.querySelectorAll('.cart-item');
    const checkoutButton = document.querySelector('.btn-checkout');
    
    if (cartItems.length === 0) {
        showNotification('Your cart is empty! Please add products first.', 'error');
        return;
    }
    
    // Show loading state
    const originalText = checkoutButton.textContent;
    checkoutButton.textContent = 'Processing Order...';
    checkoutButton.disabled = true;
    checkoutButton.style.opacity = '0.7';
    
    // Simulate API call/processing
    setTimeout(() => {
        // Success scenario
        showNotification('Order placed successfully! Thank you for your purchase.', 'success');
        
        // Reset button
        checkoutButton.textContent = originalText;
        checkoutButton.disabled = false;
        checkoutButton.style.opacity = '1';
        
        // Clear cart after successful order
        clearCartAfterOrder();
        
    }, 2000);
}

function clearCartAfterOrder() {
    const cartItems = document.querySelectorAll('.cart-item');
    
    cartItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                item.remove();
                if (index === cartItems.length - 1) {
                    updateCartCount();
                    updateCartTotal();
                }
            }, 300);
        }, index * 150);
    });
}

// ============================================
// SAVED ITEMS FUNCTIONALITY
// ============================================

function initializeSavedItems() {
    const moveToCartButtons = document.querySelectorAll('.btn-move-to-cart');
    moveToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            moveToCart(this);
        });
    });
}

function moveToCart(button) {
    const productCard = button.closest('.saved-product-card');
    const productTitle = productCard.querySelector('.saved-product-title').textContent;
    
    // Animation
    productCard.style.transition = 'all 0.3s ease';
    productCard.style.transform = 'scale(0.95)';
    productCard.style.opacity = '0.7';
    
    setTimeout(() => {
        productCard.style.transform = 'scale(1)';
        productCard.style.opacity = '1';
        showNotification(`"${productTitle}" moved to cart!`, 'success');
    }, 300);
}

// ============================================
// LANGUAGE DROPDOWN
// ============================================

function initializeLanguageDropdown() {
    const languageBtn = document.querySelector('.language-btn');
    const languageDropdown = document.querySelector('.language-dropdown');
    
    if (languageBtn && languageDropdown) {
        languageBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isVisible = languageDropdown.style.display === 'block';
            languageDropdown.style.display = isVisible ? 'none' : 'block';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            languageDropdown.style.display = 'none';
        });
        
        // Prevent dropdown from closing when clicking inside it
        languageDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Language selection
        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                selectLanguage(this);
            });
        });
    }
}

function selectLanguage(option) {
    const langText = option.querySelector('span').textContent;
    const langFlag = option.querySelector('img').src;
    const languageBtn = document.querySelector('.language-btn');
    
    languageBtn.querySelector('span').textContent = langText;
    languageBtn.querySelector('img').src = langFlag;
    
    showNotification(`Language changed to ${langText}`, 'success');
    
    // Close dropdown
    const languageDropdown = document.querySelector('.language-dropdown');
    languageDropdown.style.display = 'none';
}

// ============================================
// HELPER FUNCTIONS
// ============================================

// Update cart count
function updateCartCount() {
    const cartItems = document.querySelectorAll('.cart-item');
    const cartHeading = document.querySelector('.cart-heading');
    if (cartHeading) {
        cartHeading.textContent = `My cart (${cartItems.length})`;
    }
}

// Update cart total
function updateCartTotal() {
    let subtotal = 0;
    const cartItems = document.querySelectorAll('.cart-item');
    
    cartItems.forEach(item => {
        const priceText = item.querySelector('.item-price').textContent;
        const price = parseFloat(priceText.replace('$', '').replace(',', ''));
        const qty = parseInt(item.querySelector('.qty-dropdown').value);
        subtotal += price * qty;
    });
    
    const discountElement = document.querySelector('.price-discount');
    const discount = discountElement ? Math.abs(parseFloat(discountElement.textContent.replace('- $', '').replace(',', ''))) : 60;
    const tax = 14;
    const total = Math.max(0, subtotal - discount + tax);
    
    // Update display
    const subtotalElement = document.querySelector('.price-subtotal');
    const totalElement = document.querySelector('.price-total');
    
    if (subtotalElement) {
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    }
    if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
}

// Apply discount
function applyDiscount(amount) {
    const discountElement = document.querySelector('.price-discount');
    if (discountElement) {
        const currentDiscount = Math.abs(parseFloat(discountElement.textContent.replace('- $', '').replace(',', '')));
        const newDiscount = currentDiscount + amount;
        discountElement.textContent = `- $${newDiscount.toFixed(2)}`;
        updateCartTotal();
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.custom-notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.textContent = message;
    
    // Style based on type
    const styles = {
        success: {
            backgroundColor: '#10b981',
            color: 'white'
        },
        error: {
            backgroundColor: '#ef4444',
            color: 'white'
        },
        info: {
            backgroundColor: '#3b82f6',
            color: 'white'
        },
        warning: {
            backgroundColor: '#f59e0b',
            color: 'white'
        }
    };
    
    const style = styles[type] || styles.info;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${style.backgroundColor};
        color: ${style.color};
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        font-size: 16px;
        font-weight: 500;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Add CSS animation if not exists
    if (!document.querySelector('#notification-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'notification-styles';
        styleElement.textContent = `
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
        `;
        document.head.appendChild(styleElement);
    }
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// ============================================
// ANIMATIONS
// ============================================

function initializeAnimations() {
    // Scroll animations
    const animatedElements = document.querySelectorAll('.saved-product-card, .feature-item, .cart-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.6s ease';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
    
    // Add hover effects
    addHoverEffects();
}

function addHoverEffects() {
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, .saved-product-card, .feature-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.2s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.2s ease';
        });
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}


document.querySelector('.cart-link').addEventListener('click', function() {
    window.location.href = 'cart.html';
});

