document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Спасибо за ответ! Форма отправлена. Шучу, это демо");
});

function getFilledFields() {
  const fields = document.querySelectorAll("input, textarea, select");

  const radioGroups = new Set();
  const filledRadioGroups = new Set();
  let filledInputs = 0;

  fields.forEach((field) => {
    if (field.type === "radio") {
      radioGroups.add(field.name);
      if (field.checked) filledRadioGroups.add(field.name);
    } else if (field.type === "checkbox") {
      if (field.checked) filledInputs++;
    } else {
      if (field.value.trim() !== "") filledInputs++;
    }
  });

  const totalRadioGroups = radioGroups.size;
  const filledRadioCount = filledRadioGroups.size;


  const totalFilled = filledInputs + filledRadioCount;

  const totalFields =
    fields.length -
    [...document.querySelectorAll('input[type="radio"]')].length +
    totalRadioGroups;

  return { filled: totalFilled, total: totalFields };
}

function updateProgress() {
  const progress = document.querySelector(".progress-bar");
  const { filled, total } = getFilledFields();
  const percent = total > 0 ? (filled / total) * 100 : 0;
  progress.style.width = percent + "%";

  const img = document.querySelector(".survey__like-img");
  if (percent == 100) {
    img.style.transform = "translateX(510px) rotate(-20deg)";
  } else if (percent < 100) {
    img.style.transform = "translateX(0px) rotate(-20deg)";
  }
}

// Все поля, которые влияют на прогресс
const fields = document.querySelectorAll(`
  input[type="text"],
  input[type="email"],
  input[type="number"],
  input[type="radio"],
  input[type="checkbox"],
  select
`);

fields.forEach((field) => {
  const event =
    field.type === "radio" || field.type === "checkbox" ? "change" : "input";
  field.addEventListener(event, updateProgress);
});

// Вызов при загрузке
document.addEventListener("DOMContentLoaded", () => {
  updateProgress();
});
