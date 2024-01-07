This is being created for usage in a kindergarten classroom.

This is a simple webapp that allows users to form sentences from a word bank. Instructors should have fine control over the words and users and be provided with analytics.

I suspect this is a good opportunity to learn a little frontend (JS, React, Tailwind)

I also hope to use a database for analytics, login, and control over the content on the site.

To-Do: 

Design-related:

Make words rearrangeable within the sentence box with drag and drop, but not with the HTML5 API. Needs to work on touch screens.

Sort words by first letter. Alphabet on sidebar instead of word list, click on a letter to view words.

Admin view to change words, categories, export completed sentences

Prompt user for name on landing page (required?)

Images for nouns?

Categories of nouns


Back-end-related:

Submit sentences and store in DB based on name (Name, date, sentence content, a million other things if my database design project was any indication)

Analytics of sentences within the DB, frequently used words, frequent errors, etc (probably a bunch of queries based on sentence content)

User profiles (Admin). Students need to be able to just type in a first name, while admins need to login.

Store initial words in DB of course

Real-time "collaboration". Use websockets to let admin (instructor) view all currently active students sentences at once.



Dream Goals: 

Grammar Checking
