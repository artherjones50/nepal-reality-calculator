function calculate() {
  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value;
  const marital = document.getElementById("marital").value;
  const employment = document.getElementById("employment").value;

  const resultEl = document.getElementById("result");
  resultEl.classList.remove("show");

  // Find the matching group in the embedded JSON
  const group = data.find(item => item.gender === gender && item.age_group === age);

  if (!group) {
    resultEl.innerHTML = "<span class='error'>Data not available for this age/gender combination.</span>";
    setTimeout(() => resultEl.classList.add("show"), 50);
    return;
  }

  const match = group.bachelor[marital]?.[employment];

  if (!match || match === 0) {
    resultEl.innerHTML = "<span class='error'>Data not available for this combination.</span>";
    setTimeout(() => resultEl.classList.add("show"), 50);
    return;
  }

  const base = group.population;
  const percentage = ((match / base) * 100).toFixed(1);
  const oneIn = Math.round(base / match);

  // Emoji for fun
  let emoji = percentage > 50 ? "🎉" : percentage > 20 ? "🙂" : "😅";

  resultEl.innerHTML = `${emoji} <span class="highlight">${percentage}%</span> of ${gender.toLowerCase()}s aged ${age} who are ${marital.replace('_',' ')} and ${employment} 
    have a bachelor’s degree or higher (${match} people out of ${base}). That’s about 1 in ${oneIn} people.`;

  // Show result with animation
  setTimeout(() => resultEl.classList.add("show"), 50);

  // Trigger confetti for percentages above 50%
  if (percentage > 50) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}
