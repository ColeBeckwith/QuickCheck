# QuickCheck
Ionic/Angular2/Node application to check security wait times at airports

Run Instructions:

1. Clone repo.
2. Boot up instance of MongoDB. Easiest with Docker. 

Note: certain functions of the application will not work properly without a significant amount of data. When the app runs for the first time, it will only collect the wait time data that is currently available which is typically only about a weeks worth. Thus, wait time estimates will be less precise than when running from the mongo instance that has been collecting data for almost a year.

3. Serve Node instance. ('node server.js' from /server folder).
4. Run Ionic application. (ionic serve from /client folder).
