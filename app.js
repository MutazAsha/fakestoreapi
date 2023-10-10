function Product(title, price, image) {
    this.title = title;
    this.price = price;
    this.image = image;
}

async function fetchAndCreateProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        
        if (Array.isArray(data) && data.length >= 20) {
            const dataArray = data.slice(0, 20);
            const productContainer = document.getElementById('product-container');
            const products = dataArray.map(item => {
                return new Product(item.title, item.price, item.image);
            });
            products.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <h2>${product.title}</h2>
                    <p>Price: $${product.price}</p>
                    <img src="${product.image}" alt="${product.title}">
                `;
                productContainer.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
fetchAndCreateProducts();



// //post data to json server 
// let submit = document.querySelector("#post");
// submit.addEventListener("click", (e) =>{
//     e.preventDefault();
//     let title = document.querySelector("#post-title").value;
//     let content = document.querySelector("#post-content").value;
//     fetch("http://localhost:3000/posts", {
//         method : "POST",
//         headers : {"Content-type" : "application/json"},
//         body : JSON.stringify({
//             "id" : "",
//             "title" : `${title}`,
//             "content" : `${content}`
//         })
//     })
//     .catch( error => console.log("error in post"));

// });

// let display = document.querySelector(".new-card");
// document.addEventListener("DOMContentLoaded", () =>{
//     fetch("http://localhost:3000/posts")
//     .then(response => response.json())
//     .then(data => {
//         data.map((x) =>{
//             console.log(x);
//             let card = document.createElement("div");
//             card.innerHTML = `<div>${x.title}</div>
//                                 <div>${x.content}</div>`;
//             display.appendChild(card);
//         })
//     })
// })




let post = document.getElementById("post");

post.addEventListener("click",(e)=>{
    e.preventDefault();
    let title = document.getElementById("post-title").value;
    let content = document.getElementById("post-content").value;
    const mypost = {
        title: title,
        content: content
    };
    fetch('http://localhost:3000/posts',{
        method:'POST',
    headers: {
        'Content-Type': 'application/json'
      },
     body: JSON.stringify(mypost)
    }).then(response => response.json()) .then(data => console.log(data))
    
    
})

//get
class Post{
    constructor(id,title,content){
        this.id = id;
        this.title = title;
        this.content = content;
    }
    }
    
    function getdata() {
        fetch('http://localhost:3000/posts')
        .then(res=>res.json())
        .then(post=>{
            const postinfo = post.map(item => new Post (item.id,item.title,item.content));
            let cards = document.getElementById('post-container');
            postinfo.map(post=>{
                let card = document.createElement('div');
                card.innerHTML=`
                    <div class="card" style="width: 18rem;">
                    <div class="card-body ">
                        <h5>${post.title}</h5>
                        <p>${post.content}</p>
                        <span>
                        <button class="btn btn-outline-success update"  onclick="updatePost(${post.id})">update</button>
                        <button type="button" class="btn btn-outline-danger" onclick="deletePost(${post.id})">Delete</button>
                        `;
                        cards.appendChild(card);
        })
        })
    }
    
    getdata();
//Update
    function updatePost(postId) {

    const updatedTitle = prompt('Enter the Title:', '');
    const updatedContent = prompt('Enter the updated content:', '');

    if (updatedContent !== null) {
        fetch(`http://localhost:3000/posts/${postId}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title:updatedTitle,
                content: updatedContent }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(updatedPost => {
                console.log("Post updated:", updatedPost);

                const postElement = document.getElementById(`post_${postId}`);
                if (postElement) {
                    const contentElement = postElement.querySelector('p');
                    if (contentElement) {
                        contentElement.textContent = updatedPost.content;
                    }
                }
            })
            .catch(error => console.error("Error updating post:", error));
    }
}

//Delete
    function deletePost(postId) {
    fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(deletedPost => {
            console.log("Post deleted:", deletedPost);
            // Optionally, remove the post element from the UI
            const postElement = document.getElementById(`post_${postId}`);
            if (postElement) {
                postElement.remove();
            }
        })
        .catch(error => console.error("Error deleting post:", error));
}


