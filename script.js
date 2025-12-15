async function calculate() {
  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value;
  const marital = document.getElementById("marital").value;
  const employment = document.getElementById("employment").value;

  const response = await fetch("data.json");
  const data = await response.json();

  // find the exact group based on gender + age
  const group = data.find(
    item => item.gender === gender && item.age_group === age
  );

  if (!group) {
    document.getElementById("result").innerText = "Data not available.";
    return;
  }

  // exact key for marital + employment
  const key = `${marital}_${employment}_bachelor`;
  const match = group[key];

  if (!match || match === 0) {
    document.getElementById("result").innerText = "Data not available for this combination.";
    return;
  }

  const base = group.population;
  const percentage = ((match / base) * 100).toFixed(1);
  const oneIn = Math.round(base / match);

  document.getElementById("result").innerText =
    `${percentage}% of ${gender.toLowerCase()}s aged ${age} who are ${marital.replace('_',' ')} and ${employment} 
     have a bachelor’s degree or higher. That’s about 1 in ${oneIn} people.`;
}
