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
            renderTalks(talks);
        });
    })
}

function renderTalks(talks){
    var formattedTalks = talks.map(formatTalk);
    $(function(){
        $('#content').html(formattedTalks.join(""));
    })
}

function formatTalk(talk){
    return `
    <div class="conference-box">
    <h2><a href="${talk.link}">${talk.title}</a></h2>
    <h3>${talk.speaker}</h3>
    <h3>${talk.conference} - ${talk.year}</h3>
    <span>${talk.abstract}</span>
    <br />
    <span>tags: [${talk.tags.join('] - [')}]</span>
    </div>`
}

getConferences();