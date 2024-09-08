
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        console.log(users);
        const usersContainer = document.getElementById('usersContainer');

        for (const user of users) {
            const userBlock = document.createElement('div');
            userBlock.className = 'user-block';

            userBlock.innerHTML = `
                <p class="block-id">ID: ${user.id}</p> 
                <p class="block-name">Name: ${user.name}</p>
            `;

            const userButton = document.createElement('button');
            userButton.className = 'user-button';
            userButton.innerText = 'View more';

            userButton.addEventListener('click', function() {
                window.location.href = `user-details.html?id=${user.id}`;
            });

            userBlock.appendChild(userButton);
            usersContainer.appendChild(userBlock);
        }
    })

    .catch(error => {
        console.error('Error', error);
    });

