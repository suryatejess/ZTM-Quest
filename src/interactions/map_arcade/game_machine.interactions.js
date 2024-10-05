import { displayDialogue } from '../../utils';

export const interactionWithGameMachine = (player, k, map) => {
    player.onCollide('game_machine', () => {
        player.isInDialog = true;
        // Trigger the custom prompt when the player collides with the game machine
        showCustomPrompt(
            'Do you want to play the game?', // Prompt message
            ['Yes', 'No'], // Options for playing the game
            (selectedOption) => {
                if (selectedOption === 'Yes') {
                    // Logic to start the game
                    startGame(k);
                } else {
                    // If the player chooses 'No'
                    displayDialogue({
                        k,
                        player,
                        text: ['Maybe next time!'],
                        onDisplayEnd: () => {
                            player.isInDialog = false;
                        },
                    });
                }
            }
        );
    });
};

// Function to start the game
function startGame(k) {
    // Logic to initiate the game goes here.
    // For example, navigating to a new scene or starting the game directly.
    k.goTo('arcade'); // Assuming 'arcade' is the scene where the game starts
    player.isInDialog = false;
}

// Function to show the custom prompt
function showCustomPrompt(message, options, callback) {
    // Set the prompt message
    document.getElementById('prompt-message').textContent = message;

    // Clear any existing options in the container
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    // Create buttons for each option
    options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.setAttribute('tabindex', '0'); // Make the button focusable

        // Add click event for mouse interactions
        button.onclick = function () {
            callback(option);
            closeCustomPrompt();
        };

        // Add keyboard event listener for accessibility
        button.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                // Enter or Space key
                e.preventDefault(); // Prevent the default behavior (e.g., form submission)
                callback(option);
                closeCustomPrompt();
            }
        });

        optionsContainer.appendChild(button);
    });

    // Display the custom prompt
    document.getElementById('custom-prompt').style.display = 'flex';

    // Set focus on the first button
    if (optionsContainer.children.length > 0) {
        optionsContainer.children[0].focus();
    }
}

// Function to close the custom prompt
function closeCustomPrompt() {
    // Hide the custom prompt
    document.getElementById('custom-prompt').style.display = 'none';
}
