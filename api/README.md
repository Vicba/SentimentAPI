## 👀 Overview
This is the api made in flask and notebooks.
[see API documentation](https://app.theneo.io/myself/sentimentapi)

- [👀 Overview](#-overview)
- [💫 Setup](#-setup)
  - [❗Testing the api](#testing-the-api)
- [🚩 Difficulties](#-difficulties)

## 💫 Setup
Type the following commands in the command line:

1. Clone this project and go to /api
   
   `git clone https://github.com/Vicba/SentimentAPI.git`

    `cd api`

2. Create virtual environment

For linux/mac: `python -m venv venv`

For windows: `python -m venv venv`


3. Activate virtual environment (venv)

For linux/mac: `source venv/bin/activate`

For windows: `venv\Scripts\activate`

   
4. Install requirements
   
    `pip install -r requirements.txt`

5. Setup prisma
   
    `prisma generate`

6. Start project
   
    `python app.py`

7. To stop the project
   
   `deactivate`


### ❗Testing the api
Test the endpoints with your created api keys from the client

Auhtorization headers: API-Key: your-api key

endpoint: http://127.0.0.1:8080/your-endpoint-choice


## 🚩 Difficulties
- Docker build and run works but when hit sentiment endpoint: "nltk error"
