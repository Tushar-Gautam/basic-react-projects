####

1.Learnt how to make fetch request to an external API and also how to change url based on the functionality needed(default and search). 2. how to hide access key in .env file.
3.using event Listeners implemented infinite scroll here once we get to end of document then only we will the images 4. implemented search function

##Bugs

1. had to use !loading in if condition while implementing infinite scroll useEffect so to as to prevent continous loading if suppose user keeps the curson at that position only.
2. if we search then if page no. is 1 then to display search result we have to scroll to until new pages loads coz we r first using default photos and adding searched data to that result thus in case of search query we need to wipe old data and add searched data to the photos array.
   3.Input is empty still fetching.
   4.Due to strict mode initial landing page images rendered twice
