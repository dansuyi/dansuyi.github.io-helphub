// charity_profile.js

// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Find the "Volunteer Now" button element
    const volunteerButton = document.querySelector('#volunteer-button');

    // Add an event listener to the button
    volunteerButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Display the contact form
        const contactForm = document.querySelector('#contact-form');
        contactForm.style.display = 'block';
    });

    // Additional functionality: Display additional charity details on hover
    const charityDetails = document.querySelector('.charity-details');
    charityDetails.addEventListener('mouseover', function() {
   
        charityDetails.textContent = 'Mission: Helping the community any way we can.';
    });

    charityDetails.addEventListener('mouseout', function() {
    
        charityDetails.textContent = 'Additional details...';
    });
});
document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('http://localhost:3000/trivia');
        const data = await response.json();

        const featuredCharitiesSection = document.querySelector('section');

        const triviaContainer = document.createElement('div');
        triviaContainer.className = 'trivia-container';

        data.forEach((question, index) => {
            const triviaDiv = document.createElement('div');
            triviaDiv.className = 'trivia';

            const questionElement = document.createElement('p');
            questionElement.textContent = decodeURIComponent(question.question);

            const options = [...question.incorrect_answers, question.correct_answer];
            options.sort(() => Math.random() - 0.5); // Shuffle options

            const optionsList = document.createElement('ul');
            options.forEach((option) => {
                const optionItem = document.createElement('li');
                optionItem.textContent = decodeURIComponent(option);
                optionsList.appendChild(optionItem);
            });

            triviaDiv.appendChild(questionElement);
            triviaDiv.appendChild(optionsList);

            triviaContainer.appendChild(triviaDiv);
        });

        featuredCharitiesSection.appendChild(triviaContainer);
    } catch (error) {
        console.error('Error fetching trivia questions:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Failed to fetch trivia questions. Please try again later.';
        document.body.appendChild(errorMessage);
    }
});
