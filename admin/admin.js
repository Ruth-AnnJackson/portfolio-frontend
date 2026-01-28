const API_URL = 'https://portfolio-backend-dg6v.onrender.com';
const messagesContainer = document.getElementById('messages');

async function deleteMessage(id) {
    try {
        const res = await fetch(`${API_URL}/messages/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            loadMessages(); // refresh the list
        } else {
            alert('Failed to delete message');
        }
    } catch (err) {
        alert ('Server not reachable');
        }
    }

    async function loadmessages() {
        try {
            const res = await fetch(`${API_URL}/messages`);
            const messages = await res.json();

            messagesContainer.innerHTML = '';

            if (messages.length === 0) {
                messagesContainer.innerHTML = '<p>No messages yet.</p>';
                return;
            }

            messages.forEach(msg => {
                const card = document.createElement('div');
                card.className = 'project-card';

                card.innerHtml = `
                <h3>${msg.name}</h3>
                <p><strong>Email:</strong> ${msg.email}</p>
                <p>${msg.message || ''}</p>
                <small>${new Date(msg.createdAt).toLocaleString()}</small>
                <button class="btn delete-btn" data-id="${msg._id}">Delete</button>
                `;

                messagesContainer.appendChild(card);
            });

            //Add event listeners to delete buttons
            document.querySelectorAll('.delete-btn').forEacg(button => {
                button.addEventListener('click', () => {
                    const id = button.getAtrribute('data-id');
                    deleteMessage(id);
                });
            });

        } catch (err) {
            messagesContainer.innerHTML = '<p>Error loading messages</p>';
        }
        
    }

    loadMessages();
  


async function loadMessages() {
    try {
        const res = await fetch(`${API_URL}/messages`);
        const messages = await res.json();

        messagesContainer.innerHTML = '';

        if (messages.length === 0) {
            messagesContainer.innerHTML = '<p>No messages yet.</p>';
            return;
        }

        messages.forEach(msg => {
            const card = document.createElement('div');
            card.className = 'project-card';

            card.innerHTML = `
            <h3>${msg.name}</h3>
            <p><strong>Email:</strong> ${msg.email}</p>
            <p>${msg.message || ''}</p>
            <small>${new Date(msg.createdAt).toLocaleString()}</small>
            `;

            messagesContainer.appendChild(card);
        });
    } catch (err) {
        messagesContainer.innerHTML = '<p>Error loading messages</p>';
    }
}

loadMessages();