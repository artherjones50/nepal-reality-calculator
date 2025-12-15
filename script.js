async function calculate() {
  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value;
  const marital = document.getElementById("marital").value;
  const employment = document.getElementById("employment").value;

  const response = await fetch("data.json");
  const data = await response.json();

  const group = data.find(
    item => item.gender === gender && item.age_group === age
  );

  if (!group) {
    document.getElementById("result").innerText = "Data not available.";
    return;
  }

  // pick the exact intersection
  let key = `${marital}_${employment}_bachelor`; // e.g., never_married_employed_bachelor
  let match = group[key];

  const base = group.population;
  const percentage = (match / base * 100).toFixed(1);
  const oneIn = Math.round(base / match);

  document.getElementById("result").innerText =
    `${percentage}% of ${gender.toLowerCase()}s aged ${age} who are ${marital.replace('_',' ')} and ${employment} 
     have a bachelor’s degree or higher. That’s about 1 in ${oneIn} people.`;
}
