# Self Evaluation

## Have you manually tested the SDK?

Yes, in two ways:

- By calling each function to ensure basic functionality works as intended
- By using it in an actual application, as if I was a developer using a typical third-party library.

The second way of testing was helpful in seeing what features might be useful to those who actually use the SDK.

## Did you add a test suite? If so, how will we use it? If not, why?

Yes. I used Jest as the test runner. These types of tests were crucial for making sure functionality continued to work when I made changes to the SDK. I didn't quite do TDD, but once the basics were built I created tests to make sure they worked. I then used the tests as a check to ensure I didn't break functionality. I added additional tests as I added features.

To run the tests, clone the repo:

```terminal
  git clone git@github.com:jbaddley/lotr-sdk.git
```

In a terminal run the following command at the root of the project:

```terminal
npm i
```

Get a valid api token to use the full features of the api:

Run the following commands:

```terminal
API_KEY=[YOUR API TOKEN] npm test
npm test
```

## Did you use any 3rd party library? Why did you use it? What are the tradeoffs?

I used the following 3rd party libraries:

```json
    "dayjs": "^1.11.7",
    "isomorphic-unfetch": "^4.0.2",
```

I used `dayjs` for date manipulation mainly for caching. The main tradeoff is adding 2kB in size.

I used `isomorphic-unfetch` to provide a clean and simple way to fetch from the endpoint that was tiny in comparison to node-fetch and axios. Added 3.38kB unpacked.

One of the considerations to note about dependencies is that they need to be monitored for issues, deprecation, security and maintenance. If they break or contain unsafe, they can render a library useless or unsafe, diminishing the trust of those who use your library.

Not using libraries, however, means that you might have to re-invent the wheel on some common functionality need for your project. It is important to weight all these factors when developing an SDK.

## Do you feel this SDK makes it easier to interact with the API?

Yes, especially when I started adding helpful features that combined entities together, like adding character and movie data to a quote. Providing functionality like search and pagination also made things very convenient.

## If you had more time, what else would you add?

Better error checking. For the api level errors I didn't catch them in code, I threw them, which means the burden of handling those errors falls on the user. I think adding better error handling would be helpful. I had to add a lot more error handling in the playground due to hitting the `Too many calls` error.

## What would you change in your current SDK solution?

I wouldn't add in-memory caching. When I went to use it in the Next.js playground I built, I found myself using a library called `react-query` that has caching built in. The reason I added it, was because I was making so many calls during testing I ended up using up my 100 calls per 10 minutes really quick.

I would also add more features to the SDK. I would have added pagination to quotes. I think it would be interesting to experiment with pulling public images for the movies and characters. It would also be cool to experiment with OpenAI creating concept art for book chapters.

## On a scale of 1 to 10 (10 being the highest), how would you rate this solution?

I'd give it a 5 out of 10. For doing it in a few hours I think it turned out alright. It definitely isn't perfect and could use some design tweaks, but overall I'm satisfied with it. It was a fun little project.

## Anything else we should keep in mind when we evaluate the project?

The `design.md` and `README.md` files will be the best place to start. Going to the playground will be helpful in seeing the SDK being used.

Using a valid API KEY is critical for running the tests and unlocking all entities.

The tests will not pass if there are problems on the API side, like `Too many requests` or `Unauthorized` errors, or if the API is unusally slow

## What language did you use for the challenge?

I used `TypeScript` and `Node.js`. For the playground, I used `Next.js`, `Semantic UI`, and `react-query`. I deployed the playground using `Vercel` and published the SDK to `npm`.
