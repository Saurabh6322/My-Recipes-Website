document.addEventListener("DOMContentLoaded", () => {
    // ------------------------------------------
    // 1. Button Click Alert Logic 
    // ------------------------------------------
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(btn => {
        if (btn.tagName === 'BUTTON') { 
            btn.addEventListener("click", () => {
                alert(`You clicked: ${btn.innerText}`);
            });
        }
    });

    // ------------------------------------------
    // 2. Search Suggestion and Direct Navigation Logic
    // ------------------------------------------

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        const searchForm = searchInput.closest('form');
        let suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg hidden';
        suggestionsContainer.id = 'suggestions-container';
        document.body.appendChild(suggestionsContainer);

        const recipeMap = {
            "Butter Chicken": "recipes-indian.html", "Masala Dosa": "recipes-indian.html",
            "Spaghetti Carbonara": "recipes-italian.html", "Margherita Pizza": "recipes-italian.html",
            "Green Salad": "recipes-healthy.html", "Fruit Smoothie": "recipes-healthy.html",
            "Chocolate Cake": "recipes-desserts.html", "Cheeseburger": "recipes-fastfood.html",
            "Sushi": "recipes-japanese.html", "Ramen": "recipes-japanese.html"
        };
        const recipes = Object.keys(recipeMap);

        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            suggestionsContainer.innerHTML = ''; 

            if (query.length === 0) {
                suggestionsContainer.classList.add('hidden');
                return;
            }

            const filteredRecipes = recipes.filter(recipe => 
                recipe.toLowerCase().includes(query)
            ).slice(0, 5);

            const rect = searchForm.getBoundingClientRect();
            suggestionsContainer.style.position = 'absolute';
            suggestionsContainer.style.top = `${rect.bottom + window.scrollY + 5}px`; 
            suggestionsContainer.style.left = `${rect.left + window.scrollX}px`;
            suggestionsContainer.style.width = `${rect.width}px`;

            if (filteredRecipes.length > 0) {
                filteredRecipes.forEach(recipe => {
                    const destination = recipeMap[recipe];
                    const suggestionItem = document.createElement('div');
                    suggestionItem.className = 'p-3 cursor-pointer hover:bg-green-50 text-gray-700 font-medium';
                    suggestionItem.textContent = recipe;
                    
                    suggestionItem.addEventListener('click', () => {
                        searchInput.value = recipe;
                        window.location.href = destination;
                    });
                    suggestionsContainer.appendChild(suggestionItem);
                });
                suggestionsContainer.classList.remove('hidden');
            } else {
                suggestionsContainer.classList.add('hidden');
            }
        });

        document.addEventListener('click', function(e) {
            if (!searchForm.contains(e.target) && !suggestionsContainer.contains(e.target)) {
                suggestionsContainer.classList.add('hidden');
            }
        });
    }

    // ------------------------------------------
    // 3. JQUERY ANIMATIONS (Applied to Recipe Cards and Dashboard Cards)
    // ------------------------------------------
    
    // Check if jQuery is loaded before running jQuery code
    if (typeof jQuery !== 'undefined') {
        $(document).ready(function() {
            
            // --- JQuery Animation 1: Recipe Card Fade-In (Visual Polish) ---
            // Applies to all recipe cards on the recipe hub and category pages
            $('.recipe-card').hide().fadeIn(800);

            // --- JQuery Animation 2: Card Hover Animation (Jiggle/Bounce) ---
            // Applies to all standard cards for a subtle interaction feedback
            $('.recipe-card, .dashboard-card').hover(
                function() {
                    // On mouse enter: move the card up slightly
                    // The .stop(true, true) prevents animation stacking
                    $(this).stop(true, true).animate({ marginTop: '-8px' }, 100);
                },
                function() {
                    // On mouse leave: move the card back down
                    $(this).stop(true, true).animate({ marginTop: '0px' }, 100);
                }
            );
        });
    }
});