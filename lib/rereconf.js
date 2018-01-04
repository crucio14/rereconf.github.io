function assignConferenceDetailsToTalks(talkList, conference) {
    return talkList.map(talk => Object.assign({}, conference, talk));
}

function getConferences(){
    $.ajax({
      url: "data/conferences.json"
    }).done(function(conferenceDetails) {
        var conferenceFiles = conferenceDetails.map(conferenceUrl => {return $.ajax('data/'+conferenceUrl.url)});
        $.when(...conferenceFiles).done(function something(...resolved){
            if (conferenceDetails.length == 1) {
                resolved = [resolved]; // manage different when scenario when single thenable
            }
            var talks = [].concat(...resolved.map((x, index)=>assignConferenceDetailsToTalks(x[0], conferenceDetails[index])));
            renderTitle(talks.length, conferenceDetails.length);
            renderTalks(talks);
        });
    })
}

function renderTitle(numberOfTalks, numberOfConferences) {
    $(function(){
        $('h3').html(`Showing ${numberOfTalks} talks, ${numberOfConferences} conferences`);
    })
}

function renderTalks(talks){
    var formattedTalks = talks.map(formatTalk).join("");
    $(function(){
        $('#content').html(formattedTalks);
    })
}

function formatLanguage(languageCode){
    return languageCode;
}

function formatTalk(talk){
    return `
    <div class="conference-box">
    <div class="language">${talk.language? `[${talk.language}]` : ''}</a></div>
    <div class="talk-title"><a href="${talk.link}">${talk.title}</a></div>
    <div class="speaker">${talk.speaker}</div>
    <div class="conference">${talk.conference} - ${talk.year}</div>
    <div class="abstract">${talk.abstract}</div>
    <div class="tags">tags: [${(talk.tags || []).join('] - [')}]</div>
    </div>`
}

getConferences();