document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const head = document.head;

    // Create and add Boxicons CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/boxicons/css/boxicons.min.css';
    head.appendChild(link);

    // Create and add styles
    const style = document.createElement('style');
    style.textContent = `
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f0f0f0; /* Main color - gray */
            color: #333;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
        }

        .container {
            background-color: white;
            max-width: 600px;
            margin: 50px auto;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            text-align: center;
            transform: translateY(-50px);
            opacity: 0;
            animation: slideIn 1s forwards;
        }

        h1 {
            color: #00bfff; /* Highlight color - sky blue */
            font-size: 28px;
            margin-bottom: 20px;
            animation: fadeIn 1s ease-out;
        }

        p {
            font-size: 18px;
            margin: 10px 0;
            color: #555;
        }

        button {
            background-color: #00bfff; /* Highlight color - sky blue */
            color: white;
            border: none;
            padding: 15px 25px;
            font-size: 18px;
            cursor: pointer;
            border-radius: 10px;
            margin-top: 20px;
            transition: background-color 0.3s ease, transform 0.2s;
        }

        button:hover {
            background-color: #009fdc;
            transform: scale(1.05);
        }

        input[type="text"] {
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

        input[type="text"]:focus {
            border-color: #00bfff;
            outline: none;
        }

        .hidden {
            display: none;
        }

        #message {
            margin-top: 20px;
            font-size: 18px;
            color: red;
        }

        .fade-in {
            animation: fadeIn 1s ease-out;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @keyframes slideIn {
            from {
                transform: translateY(-50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .floating-button {
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
        }

        .floating-button:hover {
            background-color: #009fdc;
            transform: scale(1.1);
        }
    `;
    body.appendChild(style);

    // Create and add floating button
    const button = document.createElement('button');
    button.className = 'floating-button';
    button.innerHTML = '<i class="bx bx-trash"></i>'; // Boxicons trash icon
    body.appendChild(button);

    // Create and add container
    const container = document.createElement('div');
    container.className = 'container fade-in hidden';
    container.innerHTML = `
        <h1>Manage IndexedDB</h1>
        <p>Click the button below to delete the database</p>
        <button id="deleteButton">Delete Database</button>
        <div id="confirmBox" class="hidden">
            <p>Please enter the verification code: <strong id="securityCode"></strong></p>
            <input type="text" id="confirmationCode" placeholder="Enter verification code">
            <button id="confirmDelete">Confirm Delete</button>
        </div>
        <p id="message"></p>
    `;
    body.appendChild(container);

    // Show/hide container
    button.addEventListener('click', function() {
        const container = document.querySelector('.container');
        container.classList.toggle('hidden');
    });

    let randomCode = '';

    // Generate random 9-digit verification code
    function generateRandomCode() {
        randomCode = Math.floor(100000000 + Math.random() * 900000000).toString(); // Generate 9 digits
        document.getElementById('securityCode').textContent = randomCode;
    }

    // Automatically generate verification code on page load
    generateRandomCode();

    // Show confirmation box
    document.getElementById('deleteButton').addEventListener('click', function() {
        document.getElementById('confirmBox').classList.remove('hidden');
        document.getElementById('message').textContent = '';
    });

    // Confirm delete button click
    document.getElementById('confirmDelete').addEventListener('click', function() {
        const confirmationCode = document.getElementById('confirmationCode').value;
        if (confirmationCode === randomCode) {
            deleteIndexedDB();
            document.getElementById('message').textContent = 'Database successfully deleted!';
            document.getElementById('confirmBox').classList.add('hidden');
        } else {
            document.getElementById('message').textContent = 'Incorrect verification code, please try again.';
        }
    });

    // Delete IndexedDB function
    function deleteIndexedDB() {
        const dbName = 'myDatabase'; // Database name
        const request = indexedDB.deleteDatabase(dbName);

        request.onsuccess = function() {
            console.log('Database deleted');
        };

        request.onerror = function(event) {
            console.error('Error deleting database', event);
        };

        request.onblocked = function() {
            console.warn('Database deletion blocked');
        };
    }
});
