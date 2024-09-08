
const params = new URLSearchParams(window.location.search);
const postId = params.get('postId');

if (postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            console.log(post);
            const postDetails = document.getElementById('postDetails');
            const titleOfPost = document.getElementById('post-title');
            titleOfPost.innerText = post.title;
            postDetails.innerHTML = `
                <div>
                    <p>${post.body}</p>
                    <p>Post ID: ${post.id}</p>
                    <p>Title: ${post.title}</p>
                    <p>User ID: ${post.userId}</p>  
                </div>
            `;
        })
        .catch(error => {
            console.error('Error', error);
        });


    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => response.json())
        .then(comments => {
            const commentsContainer = document.getElementById('commentsContainer');
            console.log(comments);

            for (const comment of comments) {
                const commentBlock = document.createElement('div');
                commentBlock.className = 'comment';
                commentBlock.innerHTML = `
                    <p>${comment.body}</p> <br>
                    <p>Email: ${comment.email}</p> <br>
                    <p>ID: ${comment.id}</p> <br>
                    <p>Name: ${comment.name}</p> <br>
                    <p>Post ID: ${comment.postId}</p>
                `;
                commentsContainer.appendChild(commentBlock);
            }
        })
        .catch(error => {
            console.error('Error', error);
        });
} else {
    document.getElementById('postDetails').innerText = 'Nothing is selected';
}
