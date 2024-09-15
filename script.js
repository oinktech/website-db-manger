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
        }
        
        /* Styles for the modal */
        #modalOverlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
        }

        #modal {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            z-index: 1001;
            width: 90%;
            max-width: 500px;
            text-align: center;
            animation: fadeIn 0.3s ease-out;
        }

        #modal button {
            background-color: #00bfff;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 5px;
            margin: 10px;
            transition: background-color 0.3s;
        }

        #modal button:hover {
            background-color: #009fdc;
        }

        #modal .close {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #ff4d4d;
            color: white;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            cursor: pointer;
            font-size: 20px;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
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

        /* Styles for the container */
        #mainContainer {
            background-color: white;
            max-width: 600px;
            margin: 50px auto;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            text-align: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.5s ease, visibility 0.5s ease;
            z-index: 1000;
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

        #confirmDelete {
            background-color: #00bfff;
            color: white;
            border: none;
            padding: 15px 25px;
            font-size: 18px;
            cursor: pointer;
            border-radius: 10px;
            margin-top: 20px;
            transition: background-color 0.3s ease, transform 0.2s, box-shadow 0.3s ease;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        #confirmDelete:hover {
            background-color: #009fdc;
            transform: scale(1.05);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }

        #confirmDelete:active {
            background-color: #0084c4;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
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

        .fade-in {
            animation: fadeIn 1s ease-out;
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
            <p>Please enter the verification code: <strong id="securityCode"></strong></p>
            <input type="text" id="confirmationCodeInput" placeholder="Enter verification code">
            <button id="confirmDelete">Confirm Delete</button>
            <p id="message"></p>
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
        container.className = 'fade-in';
        container.innerHTML = `
            <div id="header">Manage IndexedDB</div>
            <div id="description">Click the button below to manage the database</div>
            <button id="deleteButton">Delete Database</button>
            <button id="backupButton">Backup Data</button>
            <div id="timer">Verification code valid in: 00:00</div>
            <div id="operationLog"></div>
        `;
        body.appendChild(container);
        return container;
    }

    // Initialize components
    const overlay = createOverlay();
    const modal = createModal();
    const button = createFloatingButton();
    const container = createContainer();

    let randomCode = '';
    let isContainerVisible = false;
    let timerInterval;

    function generateRandomCode() {
        randomCode = Math.floor(100000000 + Math.random() * 900000000).toString();
        document.getElementById('securityCode').textContent = randomCode;
        startTimer(); // Start timer each time a new code is generated
    }

    function startTimer() {
        let secondsRemaining = 300; // 5 minutes

        function updateTimer() {
            const minutes = Math.floor(secondsRemaining / 60);
            const seconds = secondsRemaining % 60;
            document.getElementById('timer').textContent = `Verification code valid in: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            if (secondsRemaining <= 0) {
                clearInterval(timerInterval);
                document.getElementById('message').textContent = 'Verification code expired. Please generate a new one.';
                hideModal();
            }
            secondsRemaining--;
        }

        clearInterval(timerInterval);
        updateTimer(); // Initial call
        timerInterval = setInterval(updateTimer, 1000);
    }

    function showModal() {
        overlay.style.display = 'block';
        modal.style.display = 'block';
        generateRandomCode(); // Generate a new code each time modal is shown
    }

    function hideModal() {
        overlay.style.display = 'none';
        modal.style.display = 'none';
    }

    function hideContainer() {
        container.classList.remove('show');
        isContainerVisible = false;
        button.classList.remove('close');
        button.innerHTML = '<i class="bx bx-menu"></i>';
    }

    button.addEventListener('click', function() {
        if (isContainerVisible) {
            hideContainer();
        } else {
            container.classList.add('show');
            isContainerVisible = true;
            button.classList.add('close');
            button.innerHTML = '<i class="bx bx-x"></i>';
        }
    });

    document.getElementById('deleteButton').addEventListener('click', function() {
        showModal();
    });

    document.getElementById('backupButton').addEventListener('click', function() {
        backupData();
    });

    document.querySelector('#modal .close').addEventListener('click', function() {
        hideModal();
    });

    document.getElementById('confirmDelete').addEventListener('click', function() {
        const confirmationCode = document.getElementById('confirmationCodeInput').value;
        if (confirmationCode === randomCode) {
            deleteIndexedDB();
            document.getElementById('message').textContent = 'Database successfully deleted!';
            hideModal();
            hideContainer();
        } else {
            document.getElementById('message').textContent = 'Incorrect verification code. Please try again.';
        }
    });

    // Dummy functions for demonstration
    function deleteIndexedDB() {
        console.log('Deleting IndexedDB...');
        // Your logic for deleting IndexedDB
        document.getElementById('operationLog').textContent = 'IndexedDB has been deleted.';
    }

    function backupData() {
        console.log('Backing up data...');
        // Your logic for backing up data
        document.getElementById('operationLog').textContent = 'Data backup completed.';
    }
});
