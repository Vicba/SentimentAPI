 <p align="center">
    <img alt="Gatsby" src="./SentimentAPI.png" width="100" />
</p>
<h1 align="center">
  API To Get Sentiments From Text
</h1>

## 👀 Overview
SentimentAPI is a project that came to my mind in some free time. It is made in Nextjs (client) and flask (api).
People can create max 3 api key's in the client and use these key's to make requests to the api.

I made this together with a classmate (Denis) for some days in the last 2 weeks of July 2023.    

<b>Fun thing to know:</b> we never worked with nextjs or flask before 🙃

[Quick photos of how it looks ->](/images/)

- [👀 Overview](#-overview)
- [🎓 Technologies](#-technologies)
- [🚀 Endpoints](#-endpoints)
- [🧐 Files](#-files)
- [🚩 Difficulties](#-difficulties)
- [🧠 Learnings](#-learnings)

Setup for each service:
[Client README](/client/README.md)
[API README](/api/README.md)

## 🎓 Technologies
- Nextjs
- Flask
- Prisma (postgresql)
- Docker 
- Nginx

We tried using docker and nginx to create a reverse proxy. Docker and nginx didn't work as we would have wanted, but with limited time for both of us we at least tried. Thats why the code still contains some files that aren't really used.

Since this project is now opensource we are open for people who want to help or contribute to the project!

## 🚀 Endpoints

Our API endpoints.
1. /binary-sentiment: returns positive or negative
2. /fine-grained-sentiment: returns pos or neutral or neg and the score
3. /get-all-emotions: returns all emotions we used
4. /get-emotions: returns the emotions with a score that matches with the text
   
[see API documentation](https://app.theneo.io/myself/sentimentapi)

## 🧐 Files
A quick look at the top-level files and directories.

    .
    ├── .github
    ├── api
    ├── client
    ├── nginx
    ├── docker-compose.yml
    |── .gitignore
    |── images
    └── README.md

1.  **`.github`**: This contains dependabot. Dependabot automates updating outdated dependencies in projects by creating pull requests for the latest versions.

2.  **`/api`**: This directory contains all files that we used to make the api endpoints. Includes flask backend and the AI notebooks.
   
3.  **`/client`**: The frontend nextjs project files where you can create api keys to use in the actual api.
   
4.  **`/nginx`**: Some try-out files in nginx that we wanted to use as a reverse proxy for the project with a rate limiter.
   
5.  **`docker-compose.yml`**: Docker file to start every service (client, nginx, api) ((this doesnt work as we struggle with the dockerfiles))

6.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.
   
7.  **`/images`**: Images of the project (client and api) how it looks like and works.

8.  **`README.md`**: A text file containing useful reference information about the project.


## 🚩 Difficulties

- Docker: We used docker before but never with flask and nextjs. It was harder then we thought and didn't get to what we wanted because of some errors while running the container.
- Nginx: We wanted to use nginx as a reverse proxy with a rate limiter for the api. Unfortunately we couldnt really test this because of our docker.
- Time management: I myself (victor) who came up with the idea underestimated this project. Especially with the time limit we both had because of work/other vacation activities.
- NEED TO GET THIS OFF LOCALHOST

## 🧠 Learnings

- We learned how to work in team and share the codebase
- How to use nextjs & next-auth
- Flask backend with notebooks
- Learned more about docker & nginx but apparently not enough.
