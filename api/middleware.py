from flask import request, jsonify
from prisma.models import ApiKey
from prisma import Prisma, register, Client

# prisma = Client()


def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST"
    return response


async def check_auth_token():
    # db = Prisma()
    # await db.connect()
    # register(db)
    prisma = Prisma()
    await prisma.connect()

    # Get the API key from the request headers
    api_key = request.headers.get("API-Key")

    if not api_key:
        return jsonify({"error": "API key missing in headers"}), 401

    # Check if the API key exists in the database
    # api_key_record = await ApiKey.prisma().find_unique(where={"key": api_key})
    api_key_record = await prisma.apikey.find_unique(where={"key": api_key})

    print("here it is: ", api_key_record)

    if not api_key_record:
        return jsonify({"error": "Invalid API key"}), 403

    # Attach the API key record to the request object
    request.api_key_record = api_key_record

    await prisma.disconnect()
