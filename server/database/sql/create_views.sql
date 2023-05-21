create view dashboard_words as
select word.word, tracker.overview, tracker.number_creative_hours, tracker.rating, tracker.created_at, tracker.user
from tracker join word on tracker.id = word.tracker;

create view dashboard_sentences as
select sentence.sentence, tracker.overview, tracker.number_creative_hours, tracker.rating, tracker.created_at, tracker.user
from tracker join sentence on tracker.id = sentence.tracker;
