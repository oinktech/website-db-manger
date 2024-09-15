document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const head = document.head;

    // Function to add a stylesheet
    function addStylesheet(href) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        head.appendChild(link);
    }

    // Function to add a style block
    function addStyle(content) {
        const style = document.createElement('style');
        style.textContent = content;
        head.appendChild(style);
    }

    // Add Boxicons CSS
    addStylesheet('https://unpkg.com/boxicons/css/boxicons.min.css');

    // Add custom styles
    addStyle(`
        /* General styles */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
        }

        /* Styles for the overlay */
        #modalOverlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            z-index: 1000;
            transition: opacity 0.3s ease;
        }

        /* Styles for the modal */
        #modal {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            z-index: 1001;
            width: 80%;
            max-width: 500px;
            text-align: center;
            animation: modalFadeIn 0.5s ease-out;
        }

        @keyframes modalFadeIn {
            from { opacity: 0; transform: translate(-50%, -60%); }
            to { opacity: 1; transform: translate(-50%, -50%); }
        }

        #modal button {
            background-color: #00bfff;
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 8px;
            margin: 10px;
            transition: background-color 0.3s, transform 0.2s;
        }

        #modal button:hover {
            background-color: #009fdc;
            transform: scale(1.05);
        }

        #modal .close {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #ff4d4d;
            color: white;
            border: none;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            cursor: pointer;
            font-size: 20px;
            transition: background-color 0.3s;
        }

        #modal .close:hover {
            background: #e60000;
        }

        /* Styles for the floating button */
        #floatingButton {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #00bfff;
            color: white;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            font-size: 30px;
            cursor: pointer;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s, transform 0.2s;
            z-index: 1000;
        }

        #floatingButton.close {
            background-color: #ff4d4d;
        }

        #floatingButton.close:hover {
            background-color: #e60000;
        }

        /* Styles for the container */
        #mainContainer {
            background-color: white;
            max-width: 600px;
            margin: 50px auto;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            text-align: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.5s ease, visibility 0.5s ease;
            z-index: 1000;
            animation: containerFadeIn 0.5s ease-out;
        }

        @keyframes containerFadeIn {
            from { opacity: 0; transform: translate(-50%, -60%); }
            to { opacity: 1; transform: translate(-50%, -50%); }
        }

        #mainContainer.show {
            opacity: 1;
            visibility: visible;
        }

        #header {
            color: #00bfff;
            font-size: 28px;
            margin-bottom: 20px;
            animation: fadeIn 1s ease-out;
        }

        #description {
            font-size: 18px;
            margin: 10px 0;
            color: #555;
        }

        #deleteButton, #backupButton {
            background-color: #00bfff;
            color: white;
            border: none;
            padding: 15px 25px;
            font-size: 18px;
            cursor: pointer;
            border-radius: 10px;
            margin-top: 20px;
            transition: background-color 0.3s ease, transform 0.2s;
        }

        #deleteButton:hover, #backupButton:hover {
            background-color: #009fdc;
            transform: scale(1.05);
        }

        #confirmDelete, #cancelDelete {
            background-color: #00bfff;
            color: white;
            border: none;
            padding: 15px 25px;
            font-size: 18px;
            cursor: pointer;
            border-radius: 10px;
            margin: 10px;
            transition: background-color 0.3s ease, transform 0.2s;
        }

        #confirmDelete:hover, #cancelDelete:hover {
            background-color: #009fdc;
            transform: scale(1.05);
        }

        #confirmDelete:active, #cancelDelete:active {
            background-color: #0084c4;
            transform: scale(1);
        }

        #confirmationCodeInput {
            padding: 10px;
            font-size: 16px;
            margin-top: 10px;
            width: 100%;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
            margin-bottom: 10px;
            transition: border-color 0.3s;
        }

        #confirmationCodeInput:focus {
            border-color: #00bfff;
            outline: none;
        }

        #message {
            margin-top: 20px;
            font-size: 18px;
            color: red;
        }

        #timer {
            margin-top: 20px;
            font-size: 18px;
            color: #555;
        }

        #operationLog {
            margin-top: 20px;
            font-size: 16px;
            color: green;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .fade-in {
            animation: fadeIn 1s ease-out;
        }

        /* Styles for the database list */
        #databaseList {
            list-style: none;
            padding: 0;
            text-align: left;
        }

        #databaseList li {
            margin-bottom: 10px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
        }

        #databaseList input[type="checkbox"] {
            margin-right: 10px;
        }
    `);

    // Create UI elements
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'modalOverlay';
        body.appendChild(overlay);
        return overlay;
    }

    function createModal() {
        const modal = document.createElement('div');
        modal.id = 'modal';
        modal.innerHTML = `
            <button class="close">&times;</button>
            <div id="databaseSection">
                <h2>Choose databases to delete</h2>
                <ul id="databaseList"></ul>
                <button id="deleteSelected">Delete Selected</button>
                <button id="deleteAll">Delete All</button>
                <button id="cancel">Cancel</button>
            </div>
            <div id="confirmationSection" style="display: none;">
                <p>Are you sure you want to delete the selected databases?</p>
                <button id="confirmDelete">Confirm Delete</button>
                <button id="cancelDelete">Cancel</button>
            </div>
            <div id="securityCodeSection" style="display: none;">
                <p>Please enter the verification code: <strong id="securityCode"></strong></p>
                <input type="text" id="confirmationCodeInput" placeholder="Enter verification code">
                <button id="submitCode">Submit</button>
                <p id="message"></p>
                <p id="timer">Verification code valid in: 00:00</p>
            </div>
        `;
        body.appendChild(modal);
        return modal;
    }

    function createFloatingButton() {
        const button = document.createElement('button');
        button.id = 'floatingButton';
        button.innerHTML = '<i class="bx bx-menu"></i>';
        body.appendChild(button);
        return button;
    }

    function createContainer() {
        const container = document.createElement('div');
        container.id = 'mainContainer';
        container.innerHTML = `
            <h1 id="header">Manage IndexedDB</h1>
            <p id="description">Click the button to manage IndexedDB databases.</p>
            <button id="deleteButton">Delete IndexedDB</button>
            <button id="backupButton">Backup IndexedDB</button>
        `;
        body.appendChild(container);
        return container;
    }

    // Create and show UI elements
    const overlay = createOverlay();
    const modal = createModal();
    const floatingButton = createFloatingButton();
    const container = createContainer();

    function showModal() {
        overlay.style.display = 'block';
        modal.style.display = 'block';
        populateDatabaseList();
    }

    function hideModal() {
        overlay.style.display = 'none';
        modal.style.display = 'none';
    }

    function populateDatabaseList() {
        const list = document.getElementById('databaseList');
        list.innerHTML = '';
        indexedDB.databases().then(databases => {
            databases.forEach(db => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <input type="checkbox" id="db-${db.name}" value="${db.name}">
                    <label for="db-${db.name}">${db.name}</label>
                `;
                list.appendChild(listItem);
            });
        });
    }

    document.getElementById('floatingButton').addEventListener('click', showModal);

    document.querySelector('#modal .close').addEventListener('click', hideModal);

    document.getElementById('deleteSelected').addEventListener('click', () => {
        document.getElementById('confirmationSection').style.display = 'block';
    });

    document.getElementById('deleteAll').addEventListener('click', async () => {
        const databases = await indexedDB.databases();
        for (const db of databases) {
            indexedDB.deleteDatabase(db.name);
        }
        alert('All databases have been deleted.');
        hideModal();
    });

    document.getElementById('cancel').addEventListener('click', hideModal);

    document.getElementById('confirmDelete').addEventListener('click', async () => {
        const checkboxes = document.querySelectorAll('#databaseList input[type="checkbox"]:checked');
        const databasesToDelete = Array.from(checkboxes).map(checkbox => checkbox.value);
        
        for (const dbName of databasesToDelete) {
            indexedDB.deleteDatabase(dbName);
        }
        
        alert('Selected databases have been deleted.');
        hideModal();
    });

    document.getElementById('cancelDelete').addEventListener('click', () => {
        document.getElementById('confirmationSection').style.display = 'none';
    });

    document.getElementById('submitCode').addEventListener('click', () => {
        const codeInput = document.getElementById('confirmationCodeInput').value;
        const code = document.getElementById('securityCode').textContent;
        if (codeInput === code) {
            alert('Code is correct.');
            // Perform the action after correct code
            document.getElementById('securityCodeSection').style.display = 'none';
            document.getElementById('message').textContent = '';
        } else {
            document.getElementById('message').textContent = 'Incorrect code. Please try again.';
        }
    });

    // Timer functionality for code validation
    function startTimer() {
        const timerElement = document.getElementById('timer');
        let time = 300; // 5 minutes
        function updateTimer() {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            timerElement.textContent = `Verification code valid in: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            if (time <= 0) {
                clearInterval(interval);
                timerElement.textContent = 'Verification code expired.';
            }
            time--;
        }
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
    }

    // Show the verification code section
    function showVerificationCode() {
        document.getElementById('securityCode').textContent = generateCode();
        document.getElementById('securityCodeSection').style.display = 'block';
        startTimer();
    }

    // Generate a random verification code
    function generateCode() {
        return Math.random().toString(36).substr(2, 6).toUpperCase();
    }
});
