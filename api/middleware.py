from flask import request, jsonify
from prisma import Prisma

prisma = Prisma()


def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST"
    return response


async def check_auth_token():
    prisma = Prisma()
    await prisma.connect()

    # Get the API key from the request headers
    api_key = request.headers.get("API-Key")

    if not api_key:
        await prisma.disconnect()
        return jsonify({"error": "API key missing in headers"}), 401

    # Check if the API key exists in the database
    api_key_record = await prisma.apikey.find_unique(where={"key": api_key})

    if not api_key_record:
        await prisma.disconnect()
        return jsonify({"error": "Invalid API key"}), 403

    # Attach the API key back to request obj
    request.api_key_record = api_key_record

    await prisma.disconnect()
