Use ""npm run dev"" for development version.

Use ""npm run build-electron"" to package as an electron application.

This is being created for usage in a kindergarten classroom.

This is a simple webapp that allows users to form sentences from a word bank. Instructors should have fine control over the words and users.

I suspect this is a good opportunity to learn a little frontend (JS, React, Tailwind)

I also hope to use a database for analytics, login, and control over the content on the site.

To-Do (1/24/23): 

Design-related:

Fix sorting words that appear more than once within the sentence


Back-end-related:

Store additional info in DB on submit. Currently only do user's name and their sentence

Analytics of sentences within the DB, frequently used words, frequent errors, etc (probably a bunch of queries based on sentence content)

User login? (Admin). Students need to be able to just type in a first name, while admins need a page to login.


Next Major Goals: 

Real-time "collaboration". Use websockets to let admin (instructor) view all currently active students sentences at once.

Grammar Checking
