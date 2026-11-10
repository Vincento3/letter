const defaultLetterParagraphs = [
  "Happy birthday! I hope this year brings you the kind of joy that lingers long after the candles are out.",
  "You have a beautiful way of making ordinary moments feel a little brighter. Your kindness, warmth, and care are rare things—and they make you wonderful to know.",
  "I hope the year ahead gives you even a little of the happiness you bring to everyone around you. You deserve every lovely thing life has to offer."
];

const recipientNameInput = document.querySelector("#recipient-name");
const senderNameInput = document.querySelector("#sender-name");
const customLetterInput = document.querySelector("#custom-letter-text");
const welcomeScreen = document.querySelector("#welcome");
const letterScreen = document.querySelector("#letter");
const finalScreen = document.querySelector("#final-wish");
const openLetterButton = document.querySelector("#open-letter");
const continueButton = document.querySelector("#continue-button");
const backButton = document.querySelector("#back-button");
const typedCopy = document.querySelector("#typed-copy");
const typingCursor = document.querySelector("#typing-cursor");
const letterSignoff = document.querySelector("#letter-signoff");
const petals = document.querySelector("#petals");

let typingStarted = false;
let letterParagraphs = [];

function getBirthdayName() {
  return recipientNameInput.value.trim() || "Angel";
}

function getSenderName() {
  return senderNameInput.value.trim() || "Lei";
}

function getLetterParagraphs() {
  const rawText = customLetterInput.value.trim();

  if (!rawText) {
    return defaultLetterParagraphs;
  }

  const paragraphs = rawText
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  return paragraphs.length ? paragraphs : defaultLetterParagraphs;
}

function refreshLetterContent() {
  letterParagraphs = getLetterParagraphs();
  document.querySelector("#salutation").textContent = `Dear ${getBirthdayName()},`;
  document.querySelector("#signature").textContent = getSenderName();
  document.querySelector("#final-signature").textContent = getSenderName();
}

function createFloatingPetals() {
  const symbols = ["✧", "♡", "✦"];
  const colors = ["gold", "rose", "ivory"];

  for (let index = 0; index < 17; index += 1) {
    const petal = document.createElement("span");
    const color = colors[index % colors.length];
    petal.className = `petal petal--${color}`;
    petal.textContent = symbols[index % symbols.length];
    petal.style.left = `${(index * 37 + 8) % 100}%`;
    petal.style.animationDelay = `${(index % 9) * -1.8}s`;
    petal.style.animationDuration = `${14 + (index % 7) * 2}s`;
    petal.style.fontSize = `${10 + (index % 4) * 3}px`;
    petals.append(petal);
  }
}

function typeParagraph(paragraphIndex, characterIndex) {
  if (paragraphIndex >= letterParagraphs.length) {
    typingCursor.hidden = true;
    letterSignoff.hidden = false;
    return;
  }

  let paragraph = typedCopy.lastElementChild;
  if (characterIndex === 0) {
    paragraph = document.createElement("p");
    typedCopy.append(paragraph);
  }

  const text = letterParagraphs[paragraphIndex];
  paragraph.textContent = text.slice(0, characterIndex + 1);

  if (characterIndex + 1 < text.length) {
    window.setTimeout(() => typeParagraph(paragraphIndex, characterIndex + 1), 19);
    return;
  }

  window.setTimeout(() => typeParagraph(paragraphIndex + 1, 0), 290);
}

function openLetter() {
  typingStarted = true;
  refreshLetterContent();
  typedCopy.innerHTML = "";
  letterSignoff.hidden = true;
  typingCursor.hidden = false;
  typeParagraph(0, 0);

  welcomeScreen.hidden = true;
  letterScreen.hidden = false;
  letterScreen.scrollIntoView({ behavior: "smooth", block: "start" });
  document.querySelector("#letter-heading").focus({ preventScroll: true });
}

openLetterButton.addEventListener("click", openLetter);

continueButton.addEventListener("click", () => {
  finalScreen.hidden = false;
  finalScreen.scrollIntoView({ behavior: "smooth", block: "start" });
  document.querySelector("#final-heading").focus({ preventScroll: true });
});

backButton.addEventListener("click", () => {
  typingStarted = false;
  finalScreen.hidden = true;
  letterScreen.hidden = true;
  welcomeScreen.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
  openLetterButton.focus({ preventScroll: true });
});

createFloatingPetals();
refreshLetterContent();
