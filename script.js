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
            <div id="confirmationSection">
                <p>Are you sure you want to delete the database?</p>
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
            <div id="header" class="fade-in">Main Container</div>
            <p id="description">This is a container for displaying main content.</p>
            <button id="deleteButton">Delete Database</button>
            <button id="backupButton">Backup Data</button>
            <p id="operationLog"></p>
        `;
        body.appendChild(container);
        return container;
    }

    // Initialize UI elements
    const overlay = createOverlay();
    const modal = createModal();
    const button = createFloatingButton();
    const container = createContainer();

    let randomCode = '';
    let timerInterval;
    let isContainerVisible = false;

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
        document.getElementById('confirmationSection').style.display = 'block';
        document.getElementById('securityCodeSection').style.display = 'none';
    }

    function showSecurityCodeSection() {
        generateRandomCode(); // Generate a new code each time modal is shown
        document.getElementById('confirmationSection').style.display = 'none';
        document.getElementById('securityCodeSection').style.display = 'block';
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
        showSecurityCodeSection();
    });

    document.getElementById('cancelDelete').addEventListener('click', function() {
        hideModal();
    });

    document.getElementById('submitCode').addEventListener('click', function() {
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
