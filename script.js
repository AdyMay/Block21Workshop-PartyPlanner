const partyContainer = document.querySelector("#party-container");
const newPartyForm = document.querySelector("#add-party-form");
const partyName = document.querySelector("#party-name");
const partyDescription = document.querySelector("#party-description");
const partyDate = document.querySelector("#party-date");
const partyLocation = document.querySelector("#party-location");

async function getEvents() {
  try {
    // request w/ fetch / store result in a var called res
    const res = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events"
    );
    // response into an object / store result in a var called json
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.log(err);
  }
}

function createEventsHTML(events, container) {
  const eventsHTML = events.map((event) => {
    // create a new container element
    const eventContainer = document.createElement("div");
    // event data
    const eventParagraph = document.createElement("p");
    // put the party data in the paragraph
    eventParagraph.innerText = `${event.name} ${event.description} ${event.location} ${event.date}`;
    // delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", async function () {
      try {
        const res = await fetch(
          `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events/${event.id}`,
          {
            method: "DELETE",
          }
        );
        console.log(res);
        if (res.status === 204) {
          alert("deleted successfully");
          render();
        }
      } catch (err) {
        console.log(err);
      }
    });
    eventContainer.appendChild(eventParagraph);
    eventContainer.appendChild(deleteButton);
    return eventContainer;
  });

  container.replaceChildren(...eventsHTML);
}

/**
 * eventlistener
 * eventHandler, POST request to the server
 * log the party if successful
 * update our UI
 */

async function createEvent(event) {
  try {
    const res = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events",
      {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const json = await res.json();
    render();
  } catch (err) {
    console.log(err);
  }
}

newPartyForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const newParty = {
    name: partyName.value,
    description: partyDescription.value,
    location: partyLocation.value,
    date: new Date(partyDate.value).toISOString(),
  };
  const result = await createEvent(newParty);
  console.log(result);
});

async function render() {
  // fetch the data:
  const events = await getEvents();
  createEventsHTML(events, partyContainer);
}

render();