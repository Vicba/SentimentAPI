## Flask API
activate venv
`venv\Scripts\activate`
install requirements
`pip install -r requirements.txt`
start api
`python app.py`


## make ENV
use my existing db:
DATABASE_URL="postgresql://postgres:WZo1gKjmkZ2gr6DEvJ4g@containers-us-west-21.railway.app:7197/railway"
run:  prisma generate


## todos
- error handling like no text in req or other 400 stuff
- models training add in models if done
- docker image maken an in docker-compose.yml


## the middleware checks if there is an API key
Test API keys: 30TjnVQcgSERLNRgpXJLf , iRXAy75GDtz8vMdOwpJ1V

test endpoints in Postman on:
http://127.0.0.1:8080/...


## is problems with prisma 
do : `prisma generate`
otherwise just delete the line in app.py where you use the middleware
