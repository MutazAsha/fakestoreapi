// Function to fetch and display posts
async function fetchAndDisplayPosts() {
    try {
      const response = await fetch('/api/posts');
      const posts = await response.json();
      const postContainer = document.getElementById('post-container');
      postContainer.innerHTML = ''; // Clear the existing posts
  
      posts.forEach(post => {
        const card = createPostCard(post);
        postContainer.appendChild(card);
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
  
  // Function to create a post card with delete and update buttons
  function createPostCard(post) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      <button class="delete-button" data-id="${post.id}">Delete</button>
      <button class="update-button" data-id="${post.id}">Update</button>
    `;
  
    // Add event listeners for delete and update buttons
    const deleteButton = card.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => deletePost(post.id));
  
    const updateButton = card.querySelector('.update-button');
    updateButton.addEventListener('click', () => showUpdateForm(post));
  
    return card;
  }
  
  // Function to delete a post
  async function deletePost(postId) {
    try {
      await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
      fetchAndDisplayPosts(); // Refresh the posts after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }
  
  // Function to show the update form with existing post data
  function showUpdateForm(post) {
    // Implement a form or modal to update the post
    // Pre-fill the form fields with the existing post data
    // Submit the updated data to the JSON Server when the user saves the changes
  }
  
  // Function to handle form submission for creating a new post
  async function createPost(event) {
    event.preventDefault();
  
    const titleInput = document.getElementById('post-title');
    const contentInput = document.getElementById('post-content');
  
    const newPost = {
      title: titleInput.value,
      content: contentInput.value,
    };
  
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
  
      if (response.ok) {
        titleInput.value = ''; // Clear the form fields
        contentInput.value = '';
        fetchAndDisplayPosts(); // Refresh the posts after creating a new one
      } else {
        console.error('Failed to create post:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }
  
  // Add a submit event listener to the create post form
  const createPostForm = document.getElementById('create-post-form');
  createPostForm.addEventListener('submit', create);
  