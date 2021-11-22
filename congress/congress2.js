import { senators } from "../data/senators.js";
import { reps } from "../data/representatives.js";
import { removeChildren } from "../utility/index.js";

const members = [...senators, ...reps];

const memberDiv = document.querySelector(".members");
const seniorityHeading = document.querySelector(".seniority");
const spotlightList = document.querySelector(".spotlightList");
const spotlight = document.querySelector(".spotlight");
const buttonTown = document.querySelector(".buttonTown");

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

// BUTTON STUFF

const demButton = document.createElement("button");
demButton.textContent = "Democrats";
demButton.addEventListener("click", () => populateSpotlight(democrats));
buttonTown.appendChild(demButton);

const democrats = simplifiedMembers().filter(
  (member) => member.party === "D"
);

function populateSpotlight(simpleMembers) {
  removeChildren(spotlight);

  simpleMembers.forEach((member) => {
    let spotFigure = document.createElement("figure");
    let figImg = document.createElement("img");
    let figCaption = document.createElement("figcaption");
    figImg.src = member.imgURL;
    figCaption.textContent = member.name;
    spotFigure.appendChild(figImg);
    spotFigure.appendChild(figCaption);
    spotlight.appendChild(spotFigure)
  });
}

//function populatememberDiv(simplemembers) {
//    simplemembers.forEach((member) => {
//      let senFigure = document.createElement("figure");
 //     let figImg = document.createElement("img");
   //   let figCaption = document.createElement("figcaption");
     // figImg.src = member.imgURL;
     // figCaption.textContent = member.name;
    //  senFigure.appendChild(figImg);
    //  senFigure.appendChild(figCaption);
    //  memberDiv.appendChild(senFigure);
   // });
  //}
