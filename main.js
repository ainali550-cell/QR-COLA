// --- SAFEGUARDS FOR HOMEPAGE ELEMENTS ---
    // Wrap dynamic bubbles in a check
    const bubblesContainer = document.getElementById('bubbles');
    if (bubblesContainer) {
        function createBubble() {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            const size = Math.random() * 15 + 5 + 'px';
            bubble.style.width = size;
            bubble.style.height = size;
            bubble.style.left = Math.random() * 100 + '%';
            bubble.style.animationDuration = Math.random() * 3 + 2 + 's';
            bubblesContainer.appendChild(bubble);
            setTimeout(() => bubble.remove(), 5000);
        }
        setInterval(createBubble, 300);
    }

    // Wrap countdown timer in a check
    const daysEl = document.getElementById('days');
    if (daysEl) {
        const hoursEl = document.getElementById('hours');
        const minsEl = document.getElementById('mins');
        const secsEl = document.getElementById('secs');
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 3);

        function updateCountdown() {
            const now = new Date();
            const diff = endDate - now;
            if (diff <= 0) return;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);
            daysEl.innerText = days < 10 ? '0' + days : days;
            hoursEl.innerText = hours < 10 ? '0' + hours : hours;
            minsEl.innerText = mins < 10 ? '0' + mins : mins;
            secsEl.innerText = secs < 10 ? '0' + secs : secs;
        }
        setInterval(updateCountdown, 1000);
        updateCountdown();
    }


    // ==========================================
    // E-COMMERCE & SHOP PAGE LOGIC (NEW)
    // ==========================================
    
    const cartIcon = document.getElementById('cart-icon');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.querySelector('.close-cart');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');

    // Open Cart Drawer
    function openCart() {
        if(cartDrawer && cartOverlay) {
            cartDrawer.classList.add('open');
            cartOverlay.classList.add('active');
            // Disable background scrolling
            document.body.style.overflow = 'hidden'; 
        }
    }

    // Close Cart Drawer
    function closeCart() {
        if(cartDrawer && cartOverlay) {
            cartDrawer.classList.remove('open');
            cartOverlay.classList.remove('active');
            // Re-enable background scrolling
            document.body.style.overflow = ''; 
        }
    }

    // Event Listeners for Cart
    if (cartIcon) cartIcon.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    // "Add to Cart" Button Triggers
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Optional: You could add a quick button animation here
            btn.innerText = "ADDED ✓";
            btn.style.backgroundColor = "#25D366"; // WhatsApp green for success cue
            btn.style.color = "white";
            
            setTimeout(() => {
                btn.innerText = "ADD TO CART";
                btn.style.backgroundColor = ""; 
                btn.style.color = "";
                openCart(); // Slide cart open automatically to confirm action (Clarity principle)
            }, 800);
        });
    });

    // Wishlist Toggle (Heart Icon)
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.classList.toggle('active');
            if (btn.classList.contains('active')) {
                btn.innerText = "♥"; // Filled heart
            } else {
                btn.innerText = "♡"; // Empty heart
            }
        });
    });