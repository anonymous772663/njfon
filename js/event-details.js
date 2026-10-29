document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const allEvents = [
        ...(window.PAST_EVENTS || []),
        ...(window.UPCOMING_EVENTS || [])
    ];
    const event = allEvents.find(item => item.id === id);

    if (!event) {
        document.getElementById("eventPage").innerHTML = `
            <section style="min-height:70vh;display:grid;place-items:center;padding:40px;text-align:center;">
                <div>
                    <p style="color:var(--yellow);font-weight:800;">EVENT NOT FOUND</p>
                    <h1 style="margin-top:15px;color:var(--text);">This event could not be found.</h1>
                    <a href="events.html" style="display:inline-block;margin-top:25px;color:var(--text);">← Back to Events</a>
                </div>
            </section>
        `;
        return;
    }

    document.title = `${event.title} — NJFON`;

    const status = document.getElementById("eventStatus");
    const title = document.getElementById("eventTitle");
    const cover = document.getElementById("eventCover");
    const date = document.getElementById("eventDate");
    const time = document.getElementById("eventTime");
    const location = document.getElementById("eventLocation");
    const address = document.getElementById("eventAddress");
    const description = document.getElementById("eventDescription");
    const introHeading = document.getElementById("introHeading");
    const storySections = document.getElementById("storySections");
    const gallery = document.getElementById("eventGallery");
    const viewMore = document.getElementById("viewMore");

    const isUpcoming = event.status === "upcoming";

    status.textContent = isUpcoming ? "UPCOMING EVENT" : "PAST EVENT";
    title.textContent = event.title;

    cover.src = event.cover;
    cover.alt = `${event.title} cover`;
    cover.onerror = () => {
        cover.src = "assets/img/njfn-hero.jpg";
    };

    date.textContent = event.date;
    time.textContent = event.time;
    location.textContent = event.location;
    address.textContent = event.address;

    introHeading.textContent = isUpcoming
        ? "A day waiting to be made."
        : "A memory worth keeping.";

    const expandedDescription = `${event.description} The gathering is shaped around the simple idea that football becomes more meaningful when it gives people a reason to meet, talk and share the experience together. Throughout the event, members have space to take part at their own pace, reconnect with familiar faces and welcome supporters who are new to the NJFON community. What makes the occasion special is not only the activities themselves, but the conversations, photographs, small moments and friendships that continue after the day is over. For NJFON, every gathering becomes part of a wider story — a record of people coming together through football, celebrating their shared connection to Neymar Jr and creating memories that belong to the community as a whole.`;
    description.textContent = expandedDescription;

    storySections.innerHTML = event.story.map((item, index) => `
        <section class="story-block ${index % 2 === 1 ? "reverse" : ""}">
            <figure class="story-photo">
                <img src="${item.image}" alt="${event.title} — moment ${index + 1}" loading="lazy">
            </figure>

            <div class="story-copy">
                <span class="story-index">0${index + 1} — THE MOMENT</span>
                <h3>${index === 0 ? "The Day Begins" : index === 1 ? "Together as Fans" : "Creating Memories"}</h3>
                <p>${item.text} The moment is part of what gives the event its character: people are not simply attending a programme, but spending time together, exchanging stories and finding familiar ground through football. These small interactions are what turn an ordinary gathering into a meaningful NJFON memory, giving members something to look back on long after the photographs have been taken.</p>
            </div>
        </section>
    `).join("");

    const galleryImages = [event.cover, ...event.gallery.filter(image => image !== event.cover)];

    gallery.innerHTML = galleryImages.map((image, index) => `
        <figure class="gallery-item ${index === 0 ? "large" : ""}">
            <img src="${image}" alt="${event.title} gallery photo ${index + 1}" loading="lazy">
        </figure>
    `).join("");

    if (galleryImages.length <= 3) {
        viewMore.classList.add("hidden");
    }

    viewMore.addEventListener("click", () => {
        gallery.classList.add("show-all");
        viewMore.classList.add("hidden");
    });
});
