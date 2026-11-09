// Data structure defining all 8 differences with precise coordinates
const differences = [
    // Your 4 custom spots (from your marked image)
    {
        id: 1,
        x: 35, y: 92, width: 14, height: 14,
        title: "Front Garden Bushes",
        desc: "The bush has grown and been carefully manicured compared to the sparse pre-restoration grounds."
    },
    {
        id: 2,
        x: 33, y: 78, width: 12, height: 12,
        title: "Side Staircase Landscaping",
        desc: "There are now designed, trimmed decorative bushes placed neatly by the sides of the stairs."
    },
    {
        id: 3,
        x: 65, y: 68, width: 16, height: 18,
        title: "Front Courtyard Tree Removal",
        desc: "The prominent tree blocking the front right view in the old photo has been removed to open up the landmark's architecture."
    },
    {
        id: 4,
        x: 48, y: 44, width: 12, height: 12,
        title: "Philippine Flag Display",
        desc: "A Philippine flag is displayed on the upper balcony, which was not present in the historical archive photo."
    },
    // The remaining 4 expert spots completing the 8-difference challenge
    {
        id: 5,
        x: 50, y: 84, width: 16, height: 14,
        title: "Central Fountain Basin",
        desc: "The dry, unpaved circular basin in the front yard was restored into a functioning, stone-paved central fountain feature."
    },
    {
        id: 6,
        x: 48, y: 25, width: 18, height: 16,
        title: "Façade Wall Finish & Paint",
        desc: "The mansion's weathered, distressed concrete was meticulously restored and painted in a clean cream finish following its 2014 restoration[cite: 1]."
    },
    {
        id: 7,
        x: 48, y: 53, width: 14, height: 10,
        title: "Upper Balcony Balustrades",
        desc: "The second-floor balcony balustrades and railings were repaired and repainted bright white to preserve its Neoclassical design."
    },
    {
        id: 8,
        x: 20, y: 85, width: 12, height: 14,
        title: "Structured Front Walkways",
        desc: "Unmanaged dirt patches and wild overgrowth were replaced with neat stone pathways for visitors exploring the grounds."
    }
];

let foundCount = 0;
let timeLeft = 120;
let timerInterval;
let gameEnded = false;
const foundSet = new Set();

const thenWrapper = document.getElementById('then-wrapper');
const nowWrapper = document.getElementById('now-wrapper');
const foundCountEl = document.getElementById('found-count');
const timerEl = document.getElementById('timer');
const modal = document.getElementById('info-modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const modalBtn = document.getElementById('modal-btn');

// Initialize game elements
function initGame() {
    createHitboxes(thenWrapper);
    createHitboxes(nowWrapper);
    startTimer();
}

// Generate clickable areas on both images
function createHitboxes(wrapper) {
    differences.forEach(diff => {
        const box = document.createElement('div');
        box.className = 'hitbox';
        box.style.left = diff.x + '%';
        box.style.top = diff.y + '%';
        box.style.width = diff.width + '%';
        box.style.height = diff.height + '%';
        box.dataset.id = diff.id;

        box.addEventListener('click', (e) => {
            e.stopPropagation();
            handleDifferenceFound(diff.id);
        });

        wrapper.appendChild(box);
    });
}

// Handle successful click on a difference
function handleDifferenceFound(id) {
    if (foundSet.has(id) || gameEnded) return;

    foundSet.add(id);
    foundCount++;
    foundCountEl.textContent = foundCount;

    // Render visual markers on both images with identical percentage positioning for consistency
    const diffObj = differences.find(d => d.id === id);
    addMarker(thenWrapper, diffObj);
    addMarker(nowWrapper, diffObj);

    // Show educational popup
    showModal(diffObj.title, diffObj.desc, "Continue");

    // Check win condition
    if (foundCount === differences.length) {
        clearInterval(timerInterval);
        gameEnded = true;
        setTimeout(() => {
            showModal(
                "Challenge Complete!", 
                "Congratulations! You identified all 8 differences and learned how the Molo Mansion evolved through history and restoration. Another heritage site is now unlocked!", 
                "Next Heritage Site"
            );
        }, 500);
    }
}

// Add visual green circle marker consistently
function addMarker(wrapper, diffObj) {
    const marker = document.createElement('div');
    marker.className = 'marker';
    marker.style.left = diffObj.x + '%';
    marker.style.top = diffObj.y + '%';
    wrapper.appendChild(marker);
}

// Timer function
function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerEl.textContent = timeLeft;
        } else {
            clearInterval(timerInterval);
            gameEnded = true;
            showModal("Time's Up!", "You ran out of time before finding all differences. Try again to explore more history!", "Retry Level");
            modalBtn.onclick = () => location.reload();
        }
    }, 1000);
}

function showModal(title, text, buttonText) {
    modalTitle.textContent = title;
    modalText.textContent = text;
    modalBtn.textContent = buttonText;
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

window.onload = initGame;
