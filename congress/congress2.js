import { senators } from "../data/senators.js";
import { reps } from "../data/representatives.js";
import { removeChildren } from "../utility/index.js";




// things i want to add:

//      Responsive FAQ section anchors (seniority, missed votes)

//      Style buttons!
//      Tuck currently visible header info behind FAQ clicks

const members = [...senators, ...reps];

// QUERY SELECTORS v

const memberDiv = document.querySelector(".members");
const spotlight = document.querySelector(".spotlight");
const buttonTown = document.querySelector(".buttonTown");
const demSpotlight = document.querySelector(".demSpotlight");
const repSpotlight = document.querySelector(".repSpotlight");
const missingQ = document.querySelector(".missingQ");
const missingDiv = document.querySelector(".missingDiv");
const seniorQ = document.querySelector(".seniorQ");
const seniorDiv = document.querySelector(".seniorDiv");
const loyalQ = document.querySelector(".loyalQ");
const loyalDiv = document.querySelector(".loyalDiv");
const loadSenFilter = document.querySelector(".loadSenFilter")
const loadRepFilter = document.querySelector(".loadRepFilter")
const allSenFilter = document.querySelector(".allSenFilter")
const allRepFilter = document.querySelector(".allRepFilter")


// QUERY SELECTORS ^

// MISC. v

function simplifiedMembers(chamberFilter) {
  const filteredArray = members.filter((member) =>
    chamberFilter ? member.short_title === chamberFilter : member
  );
  return filteredArray.map((member) => {
    const middleName = member.middle_name ? ` ${member.middle_name} ` : ` `;
    return {
      id: member.id,
      name: `${member.first_name}${middleName}${member.last_name}`,
      party: member.party,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${member.govtrack_id}-100px.jpeg`,
      gender: member.gender,
      seniority: +member.seniority,
      missedVotesPct: member.missed_votes_pct,
      loyaltyPct: member.votes_with_party_pct,
      shortTitle: member.short_title,
    };
  });
}


const filterMembers = (prop, value) =>
  simplifiedMembers(members).filter((member) => member[prop] === value);


// POPULATE MEMBER DIV v

populateMemberDiv(simplifiedMembers());

function populateMemberDiv(simpleMembers) {
  simpleMembers.forEach((member) => {
    let senFigure = document.createElement("figure");
    let figImg = document.createElement("img");
    let figCaption = document.createElement("figcaption");
    figImg.src = member.imgURL;
    figCaption.textContent = member.name;
    senFigure.appendChild(figImg);
    senFigure.appendChild(figCaption);
    memberDiv.appendChild(senFigure);
  });
}

const memSenButton = document.createElement("button");
memSenButton.textContent = "Senators";
memSenButton.addEventListener("click", () => populateMemSen(sens));
loadSenFilter.appendChild(memSenButton);

const sens = simplifiedMembers().filter(
  (member) => member.shortTitle === "Sen."
);

function populateMemSen(sens) {
  removeChildren(seniorDiv);
  removeChildren(missingDiv);
  removeChildren(loyalDiv);
  removeChildren(demSpotlight);
  removeChildren(repSpotlight);
  removeChildren(spotlight);
  removeChildren(memberDiv);
  removeChildren(loadSenFilter);
  removeChildren(loadRepFilter);
  removeChildren(spotlight)

  sens.forEach((member) => {
    let senFigure = document.createElement("figure");
    let figImg = document.createElement("img");
    let figCaption = document.createElement("figcaption");
    figImg.src = member.imgURL;
    figCaption.textContent = member.name;
    senFigure.appendChild(figImg);
    senFigure.appendChild(figCaption);
    memberDiv.appendChild(senFigure);
  })
}

const memRepButton = document.createElement("button");
memRepButton.textContent = "Representatives";
memRepButton.addEventListener("click", () => populateMemRep(rep));
loadRepFilter.appendChild(memRepButton);

const rep = simplifiedMembers().filter(
  (member) => member.shortTitle === "Rep."
);

function populateMemRep(rep) {
  removeChildren(seniorDiv);
  removeChildren(missingDiv);
  removeChildren(loyalDiv);
  removeChildren(demSpotlight);
  removeChildren(repSpotlight);
  removeChildren(spotlight);
  removeChildren(memberDiv);
  removeChildren(loadSenFilter);
  removeChildren(loadRepFilter);
  removeChildren(spotlight)

  rep.forEach((member) => {
    let senFigure = document.createElement("figure");
    let figImg = document.createElement("img");
    let figCaption = document.createElement("figcaption");
    figImg.src = member.imgURL;
    figCaption.textContent = member.name;
    senFigure.appendChild(figImg);
    senFigure.appendChild(figCaption);
    memberDiv.appendChild(senFigure);
  })
}

// FAQ v

// SENIOR v

const seniorMembers = simplifiedMembers().reduce((acc, member) => {
  if (member.seniority >= 40) {
    acc.push(member);
  }
  return acc;
}, []);

const seniorButton = document.createElement("button");
seniorButton.textContent = "Who has held office for more than 40 years?";
seniorButton.addEventListener("click", () => populateSeniorDiv(seniorMembers));
seniorQ.appendChild(seniorButton);

function populateSeniorDiv(seniorMembers) {
  removeChildren(seniorDiv);
  removeChildren(missingDiv);
  removeChildren(loyalDiv);

  seniorMembers.forEach((member) => {
    let spotFigure = document.createElement("figure");
    let figImg = document.createElement("img");
    let figCaption = document.createElement("figcaption");
    figImg.src = member.imgURL;
    figCaption.textContent = `${member.name} has held office for ${member.seniority} years`; 
    spotFigure.appendChild(figImg);
    spotFigure.appendChild(figCaption);
    seniorDiv.appendChild(spotFigure)
  });
}

seniorButton.className = "seniorButton"

// LOYAL v

const loyalMembers = simplifiedMembers().reduce((acc, member) => {
  if (member.loyaltyPct >= 100) {
    acc.push(member);
  }
  return acc;
}, []);

const loyalButton = document.createElement("button");
loyalButton.textContent = "Who are the 100% party-loyal members of congress?";
loyalButton.addEventListener("click", () => populateLoyalDiv(loyalMembers));
loyalQ.appendChild(loyalButton);

function populateLoyalDiv(loyalMembers) {
  removeChildren(seniorDiv);
  removeChildren(missingDiv);
  removeChildren(loyalDiv);
  
  loyalMembers.forEach((member) => {
    let spotFigure = document.createElement("figure");
    let figImg = document.createElement("img");
    let figCaption = document.createElement("figcaption");
    figImg.src = member.imgURL;
    figCaption.textContent = `${member.name}`; 
    spotFigure.appendChild(figImg);
    spotFigure.appendChild(figCaption);
    loyalDiv.appendChild(spotFigure)
  });
}

loyalButton.className = "loyalButton"

// MISSING v
const highestMissedVotes = simplifiedMembers().reduce(
  (acc, member) =>
    (acc.missedVotesPct || 0) > member.missedVotesPct ? acc : member,
  {}
);

const missingButton = document.createElement("button");
missingButton.textContent = "Who misses half or more of their votes?";
missingButton.addEventListener("click", () => populateMissingDiv(missingMembers));
missingQ.appendChild(missingButton);

const missingMembers = simplifiedMembers().filter(
  (member) => member.missedVotesPct >= 50
);

function populateMissingDiv(missingMembers) {
  removeChildren(seniorDiv);
  removeChildren(missingDiv);
  removeChildren(loyalDiv);

  missingMembers.forEach((member) => {
    let spotFigure = document.createElement("figure");
    let figImg = document.createElement("img");
    let figCaption = document.createElement("figcaption");
    figImg.src = member.imgURL;
    figCaption.textContent = `${member.name} misses ${member.missedVotesPct}% of their votes`; 
    spotFigure.appendChild(figImg);
    spotFigure.appendChild(figCaption);
    missingDiv.appendChild(spotFigure)
  });
}

missingButton.className = "missingButton"

// BUTTON TOWN v

// DEMOCRATS v

const demButton = document.createElement("button");
demButton.textContent = "See Democrats";
demButton.addEventListener("click", () => populateDemSpotlight(democrats));
buttonTown.appendChild(demButton);

demButton.className = "demButton"



const democrats = simplifiedMembers().filter(
  (member) => member.party === "D"
);


function populateDemSpotlight(simpleMembers) {

  removeChildren(demSpotlight);
  removeChildren(repSpotlight);
  removeChildren(spotlight);
  removeChildren(memberDiv);
  removeChildren(seniorDiv);
  removeChildren(missingDiv);
  removeChildren(loyalDiv);
  removeChildren(loadSenFilter);
  removeChildren(loadRepFilter);

  simpleMembers.forEach((member) => {
    let spotFigure = document.createElement("figure");
    let figImg = document.createElement("img");
    let figCaption = document.createElement("figcaption");
    figImg.src = member.imgURL;
    figCaption.textContent = member.name;
    spotFigure.appendChild(figImg);
    spotFigure.appendChild(figCaption);
    demSpotlight.appendChild(spotFigure)
  });
}

// REPUBLICANS v

const repButton = document.createElement("button");
repButton.textContent = "See Republicans";
repButton.addEventListener("click", () => populateRepSpotlight(republicans));
buttonTown.appendChild(repButton);

const republicans = simplifiedMembers().filter(
  (member) => member.party === "R"
);

function populateRepSpotlight(simpleMembers) {

  removeChildren(seniorDiv);
  removeChildren(missingDiv);
  removeChildren(loyalDiv);
  removeChildren(demSpotlight);
  removeChildren(repSpotlight);
  removeChildren(spotlight);
  removeChildren(memberDiv);
  removeChildren(loadSenFilter);
  removeChildren(loadRepFilter);

  simpleMembers.forEach((member) => {
    let spotFigure = document.createElement("figure");
    let figImg = document.createElement("img");
    let figCaption = document.createElement("figcaption");
    figImg.src = member.imgURL;
    figCaption.textContent = member.name;
    spotFigure.appendChild(figImg);
    spotFigure.appendChild(figCaption);
    repSpotlight.appendChild(spotFigure)
  });
}

repButton.className = "repButton"

// VIEW ALL v

const allButton = document.createElement("button");
allButton.textContent = "View All Members of Congress";
allButton.addEventListener("click", () => populateSpotlight(simplifiedMembers()));
buttonTown.appendChild(allButton);

allButton.className = "allButton"

function populateSpotlight(simpleMembers) {

  removeChildren(seniorDiv);
  removeChildren(missingDiv);
  removeChildren(loyalDiv);
  removeChildren(demSpotlight);
  removeChildren(repSpotlight);
  removeChildren(spotlight);
  removeChildren(memberDiv);
  removeChildren(loadSenFilter);
  removeChildren(loadRepFilter);
  removeChildren(spotlight)

  simpleMembers.forEach((member) => {
    let spotFigure = document.createElement("figure");
    let figImg = document.createElement("img");
    let figCaption = document.createElement("figcaption");
    let allRepFilter = document.createElement("div");
    figImg.src = member.imgURL;
    figCaption.textContent = member.name;
    spotFigure.appendChild(figImg);
    spotFigure.appendChild(figCaption);
    spotlight.appendChild(allRepFilter);
    spotlight.appendChild(spotFigure)
  });
}