
const params = new URLSearchParams(window.location.search);
const userId = params.get('id');

if (userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            console.log(user);
            const userDetails = document.getElementById('userDetails');
            const header = document.getElementById('h1-user');
            header.innerText = user.name;
            userDetails.innerHTML = `<div>
                <p>Address: ${user.address.city}, ${user.address.geo.lat}, lng: ${user.address.geo.lng}, ${user.address.street}, 
                ${user.address.suite}, ${user.address.zipcode}</p>
                <p>Company: ${user.company.bs}, ${user.company.catchPhrase}, "${user.company.name}"</p>
                <p>Email: ${user.email}</p>
                <p>ID: ${user.id}</p>
                <p>Name: ${user.name}</p>
                <p>Phone: ${user.phone}</p>
                <p>Username: ${user.username}</p>
                <p>Website: ${user.website}</p>
             </div>`
        });


    const showPostsButton = document.getElementById('showPosts-btn');
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';

    let postsLoaded = false;

    showPostsButton.addEventListener('click', () => {
        if (!postsLoaded) { // Проверяем, загружены ли уже посты
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
                .then(response => response.json())
                .then(posts => {
                    for (const post of posts) {
                        const postBlock = document.createElement('div');
                        postBlock.className = 'post-block';
                        postBlock.innerHTML = `
                        <p>${post.title}</p>
                        <a href="post-details.html?postId=${post.id}" class="post-btn">Read more...</a>
                    `;
                        postsContainer.appendChild(postBlock);
                    }
                    postsLoaded = true;

                })
                .catch(error => {
                    console.error('Error', error);
                });
        }
    });

} else {
    document.getElementById('userDetails').innerText = 'Nothing is selected';
}
