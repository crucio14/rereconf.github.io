function getConferences(){
    $.ajax({
      url: "data/conferences.json"
    }).done(function(conferences) {
        $(function(){
            $('#content').html(conferences.map(formatConference).join(""));
        })
      
    });
}

function formatConference(conference){
    return `
    <div class="conference-box">
    <h2><a href="${conference.link}">${conference.title}</a></h2>
    <h3>${conference.speaker}</h3>
    <h3>${conference.conference} - ${conference.year}</h3>
    <span>${conference.abstract}</span>
    <br />
    <span>tags: [${conference.tags.join('] - [')}]</span>
    </div>`
}

getConferences();