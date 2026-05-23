// ==========================================
    // FLAVORS PAGE EXPLORER LOGIC (NEW)
    // ==========================================
    
    const flavorExplorer = document.querySelector('.flavor-explorer');
    const snapElements = document.querySelectorAll('.snap-fade');
    const dots = document.querySelectorAll('.scroll-dots .dot');
    const sections = document.querySelectorAll('.flavor-section, .snap-footer');

    if (flavorExplorer) {
        
        // 1. Intersection Observer for triggering animations when a section snaps into view
        const snapOptions = {
            root: flavorExplorer,
            threshold: 0.5 // Trigger when 50% of the section is visible
        };

        const snapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Find snap-fade elements inside this section and animate them
                    const fades = entry.target.querySelectorAll('.snap-fade');
                    fades.forEach(el => el.classList.add('in-view'));

                    // Update side navigation dots
                    dots.forEach(dot => dot.classList.remove('active'));
                    const activeDot = document.querySelector(`.scroll-dots a[href="#${entry.target.id}"]`);
                    if (activeDot) activeDot.classList.add('active');
                } else {
                    // Optional: Remove class when out of view so it animates again when scrolling back
                    const fades = entry.target.querySelectorAll('.snap-fade');
                    fades.forEach(el => el.classList.remove('in-view'));
                }
            });
        }, snapOptions);

        sections.forEach(section => {
            snapObserver.observe(section);
        });

        // 2. Smooth scrolling for side dot clicks (since scroll-behavior in CSS handles it, just prevent default hash jump issues)
        dots.forEach(dot => {
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }