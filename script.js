async function calculate() {
  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value;
  const marital = document.getElementById("marital").value; // NEW

  const response = await fetch("data.json");
  const data = await response.json();

  const group = data.find(
    item => item.gender === gender && item.age_group === age
  );

  if (!group) {
    document.getElementById("result").innerText = "Data not available.";
    return;
  }

  // Choose the correct bachelor number based on marital status
  let match;
  if (marital === "never_married") match = group.never_married_bachelor;
  else if (marital === "married") match = group.married_bachelor;
  else if (marital === "divorced_widowed") match = group.divorced_widowed_bachelor;

  const base = group.population;
  const percentage = (match / base * 100).toFixed(1);
  const oneIn = Math.round(base / match);

  document.getElementById("result").innerText =
    `${percentage}% of ${gender.toLowerCase()}s aged ${age} who are ${marital.replace('_', ' ')}
     have a bachelor’s degree or higher. That’s about 1 in ${oneIn} people.`;
}
