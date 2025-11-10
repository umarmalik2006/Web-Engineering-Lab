let recipes = JSON.parse(localStorage.getItem("recipes_v1")) || [];
let currentPage = 1;
const recipesPerPage = 5;

function saveRecipes() {
  localStorage.setItem("recipes_v1", JSON.stringify(recipes));
}

function loadRecipes() {
  const stored = localStorage.getItem("recipes_v1");
  recipes = stored ? JSON.parse(stored) : [];
}

function addRecipe(event) {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const ingredients = document.getElementById("ingredients").value.trim();
  const instructions = document.getElementById("instructions").value.trim();
  const imageFile = document.getElementById("image").files[0];

  if (!title || !ingredients || !instructions) {
    alert("Please fill in all required fields!");
    return;
  }

  const recipe = {
    id: Date.now(),
    title,
    ingredients,
    instructions,
    image: ""
  };

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      recipe.image = e.target.result;
      recipes.push(recipe);
      saveRecipes();
      renderRecipes();
      document.getElementById("recipe-form").reset();
    };
    reader.readAsDataURL(imageFile);
  } else {
    recipes.push(recipe);
    saveRecipes();
    renderRecipes();
    document.getElementById("recipe-form").reset();
  }
}

function editRecipe(id) {
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) return;

  document.getElementById("title").value = recipe.title;
  document.getElementById("ingredients").value = recipe.ingredients;
  document.getElementById("instructions").value = recipe.instructions;

  const form = document.getElementById("recipe-form");
  form.onsubmit = function (e) {
    e.preventDefault();
    recipe.title = document.getElementById("title").value.trim();
    recipe.ingredients = document.getElementById("ingredients").value.trim();
    recipe.instructions = document.getElementById("instructions").value.trim();

    const imageFile = document.getElementById("image").files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        recipe.image = e.target.result;
        saveRecipes();
        renderRecipes();
        form.reset();
        form.onsubmit = addRecipe;
      };
      reader.readAsDataURL(imageFile);
    } else {
      saveRecipes();
      renderRecipes();
      form.reset();
      form.onsubmit = addRecipe;
    }
  };
}

function deleteRecipe(id) {
  if (!confirm("Are you sure you want to delete this recipe?")) return;
  recipes = recipes.filter((r) => r.id !== id);
  saveRecipes();
  renderRecipes();
}

function renderRecipes() {
  const list = document.getElementById("recipe-list");
  list.innerHTML = "";

  if (recipes.length === 0) {
    list.innerHTML =
      '<p class="no-recipes">No recipes yet — add your first recipe using the form.</p>';
    document.getElementById("pagination").innerHTML = "";
    return;
  }

  const start = (currentPage - 1) * recipesPerPage;
  const end = start + recipesPerPage;
  const visible = recipes.slice(start, end);

  visible.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <img src="${recipe.image || "https://via.placeholder.com/150"}" class="recipe-image" alt="Recipe image">
      <h3>${recipe.title}</h3>
      <p><b>Ingredients:</b> ${recipe.ingredients}</p>
      <p><b>Instructions:</b> ${recipe.instructions}</p>
      <div class="button-group">
        <button onclick="editRecipe(${recipe.id})">Edit</button>
        <button class="delete-btn" onclick="deleteRecipe(${recipe.id})">Delete</button>
      </div>
    `;
    list.appendChild(card);
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(recipes.length / recipesPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active-page");
    btn.onclick = () => {
      currentPage = i;
      renderRecipes();
    };
    pagination.appendChild(btn);
  }
}

function searchRecipes() {
  const query = document.getElementById("search").value.toLowerCase();
  const filtered = recipes.filter(
    (r) =>
      r.title.toLowerCase().includes(query) ||
      r.ingredients.toLowerCase().includes(query)
  );

  const list = document.getElementById("recipe-list");
  list.innerHTML = "";

  if (filtered.length === 0) {
    list.innerHTML = '<p class="no-recipes">No matching recipes found.</p>';
    return;
  }

  filtered.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <img src="${recipe.image || "https://via.placeholder.com/150"}" class="recipe-image">
      <h3>${recipe.title}</h3>
      <p><b>Ingredients:</b> ${recipe.ingredients}</p>
      <p><b>Instructions:</b> ${recipe.instructions}</p>
      <div class="button-group">
        <button onclick="editRecipe(${recipe.id})">Edit</button>
        <button class="delete-btn" onclick="deleteRecipe(${recipe.id})">Delete</button>
      </div>
    `;
    list.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadRecipes();
  renderRecipes();
  document.getElementById("recipe-form").addEventListener("submit", addRecipe);
  document.getElementById("search").addEventListener("input", searchRecipes);
});
