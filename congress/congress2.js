import { senators } from "../data/senators.js";
import { reps } from "../data/representatives.js";
import { removeChildren } from "../utility/index.js";




// things i want to add:
//      Responsive FAQ section anchors (seniority, missed votes)
//      Make all members appear on load, but disappear when a button is pressed (add view all members button)
//      Remove button timer wtf is that about? (is this just vs code/live preview refresh timing)
//      If we have time,,, sorting features but probably not gonna happen lets be honest lads




const members = [...senators, ...reps];

const memberDiv = document.querySelector(".members");
const seniorityHeading = document.querySelector(".seniority");
const spotlightList = document.querySelector(".spotlightList");
const spotlight = document.querySelector(".spotlight");
const buttonTown = document.querySelector(".buttonTown");
const demSpotlight = document.querySelector(".demSpotlight")
const repSpotlight = document.querySelector(".repSpotlight")

seniorityHeading.className = "seniorityHeading";

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
    };
  });
}

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

const filterMembers = (prop, value) =>
  simplifiedMembers(Members).filter((member) => member[prop] === value);

const mostSeniorMember = simplifiedMembers().reduce((acc, member) => {
  return acc.seniority > member.seniority ? acc : member;
});

seniorityHeading.textContent = `The most senior member of Congress is ${mostSeniorMember.name} who has held office for ${mostSeniorMember.seniority} years.`;

const mostLoyal = simplifiedMembers().reduce((acc, member) => {
  if (member.loyaltyPct === 100) {
    acc.push(member);
  }
  return acc;
}, []);

const highestMissedVotes = simplifiedMembers().reduce(
  (acc, member) =>
    (acc.missedVotesPct || 0) > member.missedVotesPct ? acc : member,
  {}
);

const MissingMembers = simplifiedMembers().filter(
  (member) => member.missedVotesPct >= 50
);

MissingMembers.forEach((absent) => {
  let listItem = document.createElement("li");
  listItem.textContent = absent.name;
  spotlightList.appendChild(listItem);
});

// BUTTON TOWN v

// DEMOCRATS v

const demButton = document.createElement("button");
demButton.textContent = "Democrats";
demButton.addEventListener("click", () => populateDemSpotlight(democrats));
buttonTown.appendChild(demButton);

const democrats = simplifiedMembers().filter(
  (member) => member.party === "D"
);

function populateDemSpotlight(simpleMembers) {
  removeChildren(demSpotlight, repSpotlight, spotlight);

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

const repButton = document.createElement("button");
repButton.textContent = "Republicans";
repButton.addEventListener("click", () => populateRepSpotlight(republicans));
buttonTown.appendChild(repButton);

// REPUBLICANS v

const republicans = simplifiedMembers().filter(
  (member) => member.party === "R"
);

function populateRepSpotlight(simpleMembers) {
  removeChildren(demSpotlight, repSpotlight, spotlight);

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