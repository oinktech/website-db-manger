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
        /* Styles */
        /* ... previous styles ... */

        #timer {
            font-size: 18px;
            color: #555;
            margin-top: 20px;
            font-weight: bold;
            animation: pulse 1s infinite;
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        #confirmBox.hidden {
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }

        #confirmBox.show {
            opacity: 1;
            visibility: visible;
            animation: fadeInUp 0.5s ease-out;
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        #operationLog {
            max-height: 200px;
            overflow-y: auto;
            background: #f9f9f9;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-top: 20px;
            opacity: 0;
            animation: fadeIn 1s ease-out forwards;
        }

        #operationLog p {
            margin: 5px 0;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

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
            font-size: 28px;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

        /* Animation for floating button */
        #floatingButton:hover {
            transform: scale(1.1);
        }
    `);

    // Create UI elements
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
        container.className = 'fade-in';
        container.innerHTML = `
            <div id="header">Manage IndexedDB</div>
            <div id="description">Click the button below to manage the database</div>
            <button id="deleteButton">Delete Database</button>
            <button id="backupButton">Backup Data</button>
            <div id="confirmBox" class="hidden">
                <p>Please enter the verification code: <strong id="securityCode"></strong></p>
                <input type="text" id="confirmationCodeInput" placeholder="Enter verification code">
                <button id="confirmDelete">Confirm Delete</button>
            </div>
            <p id="message"></p>
            <div id="timer">Verification code valid in: 00:00</div>
            <div id="operationLog"></div>
        `;
        body.appendChild(container);
        return container;
    }

    function createConfirmDialog() {
        const dialog = document.createElement('div');
        dialog.id = 'confirmDialog';
        dialog.innerHTML = `
            <p>Are you sure you want to delete the database?</p>
            <button id="confirmDialogButton">Yes, delete</button>
            <button id="cancelDeleteDatabase">Cancel</button>
        `;
        body.appendChild(dialog);
        return dialog;
    }

    // Initialize components
    const button = createFloatingButton();
    const container = createContainer();
    const confirmDialog = createConfirmDialog();

    let randomCode = '';
    let isContainerVisible = false;
    let timerInterval;

    function generateRandomCode() {
        randomCode = Math.floor(100000000 + Math.random() * 900000000).toString();
        document.getElementById('securityCode').textContent = randomCode;
    }

    function startTimer() {
        let secondsRemaining = 300; // 5 minutes

        function updateTimer() {
            const minutes = Math.floor(secondsRemaining / 60);
            const seconds = secondsRemaining % 60;
            document.getElementById('timer').textContent = `Verification code valid in: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            if (secondsRemaining <= 0) {
                clearInterval(timerInterval);
                document.getElementById('timer').textContent = 'Verification code expired!';
            }
            secondsRemaining -= 1;
        }

        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    }

    function hideContainer() {
        container.classList.remove('show');
        isContainerVisible = false;
        button.classList.remove('close');
        button.innerHTML = '<i class="bx bx-menu"></i>';
    }

    function logOperation(message) {
        const log = document.getElementById('operationLog');
        const entry = document.createElement('p');
        entry.textContent = `${new Date().toLocaleString()}: ${message}`;
        log.appendChild(entry);
        log.scrollTop = log.scrollHeight; // Scroll to bottom
    }

    function backupData() {
        const dbName = 'myDatabase';
        const request = indexedDB.open(dbName);

        request.onsuccess = function(event) {
            const db = event.target.result;
            const transaction = db.transaction(db.objectStoreNames, 'readonly');
            const data = {};
            db.objectStoreNames.forEach(storeName => {
                const store = transaction.objectStore(storeName);
                store.getAll().onsuccess = function(event) {
                    data[storeName] = event.target.result;
                    if (Object.keys(data).length === db.objectStoreNames.length) {
                        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'backup.json';
                        a.click();
                        URL.revokeObjectURL(url);
                        logOperation('Data backed up successfully');
                    }
                };
            });
        };

        request.onerror = function(event) {
            console.error('Error opening database', event);
            logOperation('Error opening database');
        };
    }

    function deleteIndexedDB() {
        const dbName = 'myDatabase';
        const request = indexedDB.deleteDatabase(dbName);

        request.onsuccess = function() {
            console.log('Database deleted');
            logOperation('Database deleted');
        };

        request.onerror = function(event) {
            console.error('Error deleting database', event);
            logOperation('Error deleting database');
        };

        request.onblocked = function() {
            console.warn('Database deletion blocked');
            logOperation('Database deletion blocked');
        };
    }

    // Event Listeners
    button.addEventListener('click', function() {
        if (isContainerVisible) {
            hideContainer();
        } else {
            container.classList.add('show');
            isContainerVisible = true;
            button.classList.add('close');
            button.innerHTML = '<i class="bx bx-x"></i>';
            startTimer(); // Start the timer when the container is shown
        }
    });

    document.getElementById('deleteButton').addEventListener('click', function() {
        confirmDialog.classList.add('show');
    });

    document.getElementById('backupButton').addEventListener('click', function() {
        backupData();
    });

    document.getElementById('confirmDialogButton').addEventListener('click', function() {
        document.getElementById('confirmBox').classList.remove('hidden');
        document.getElementById('message').textContent = '';
        confirmDialog.classList.remove('show');
    });

    document.getElementById('cancelDeleteDatabase').addEventListener('click', function() {
        confirmDialog.classList.remove('show');
    });

    document.getElementById('confirmDelete').addEventListener('click', function() {
        const confirmationCode = document.getElementById('confirmationCodeInput').value;
        if (confirmationCode === randomCode) {
            deleteIndexedDB();
            document.getElementById('message').textContent = 'Database successfully deleted!';
            document.getElementById('confirmBox').classList.add('hidden');
            hideContainer();
        } else {
            document.getElementById('message').textContent = 'Incorrect verification code, please try again.';
        }
    });

    generateRandomCode();
});
