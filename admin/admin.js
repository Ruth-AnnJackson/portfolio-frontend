const API_URL = 'https://portfolio-backend-dg6v.onrender.com/';
const messagesContainer = document.getElementById('messages');

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