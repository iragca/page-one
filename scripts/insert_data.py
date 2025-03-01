import logging
import polars as pl

from pathlib import Path
from pymongo import MongoClient

DATA_PATH = Path() / "data"


# Configure logging
logging.basicConfig(
    level=logging.INFO,  # Log level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
    format="%(asctime)s - %(levelname)s - %(message)s",  # Log format
    handlers=[
        logging.FileHandler("insert_data.log"),  # Save logs to a file
        logging.StreamHandler()  # Print logs to the console
    ]
)
logging.info("🚀 Starting data insertion script...")

# Load data
try:
    logging.info("📚 Loading data...")
    books_data = pl.read_csv(DATA_PATH / "books.csv")
    users_data = pl.read_csv(DATA_PATH / "users.csv")
except Exception as e:
    logging.error(f"🟥 Error loading data: {e}")
    exit()
else:
    logging.info("✅ Data loaded successfully!")

# Instantiate a MongoClient object to connect to MongoDB
try:
    URI = (
        "mongodb://page-one_mongodb:27017/"
        "?directConnection=true&serverSelectionTimeoutMS=2000"
    )

    # Connect to MongoDB running locally
    client = MongoClient(URI)
except Exception as e:
    logging.error(f"Error connecting to MongoDB: {e}")
else:
    logging.info(f"✅ Connected to MongoDB: {client}")

# Access a database and collection
try:
    # Access a database (it will be created if it does not exist)
    db = client.pageone

    # Access a collection (similar to a table in SQL)
    books = db.books
    users = db.users

except Exception as e:
    logging.critical(f"🟥 Error accessing database or collections: {e}")
    exit()

try:
    logging.info(f"Inserting data into collection: {books}")
    result_books = books.insert_many(books_data.to_dicts())

    logging.info(f"Inserting data into collection: {users}")
    result_users = users.insert_many(users_data.to_dicts())

    logging.info("Data inserted successfully!")
    try:
        logging.info("Reading data from collection 'books':")
        for doc in books.find():
            logging.info(doc)

        logging.info("Reading data from collection 'users':")
        for doc in users.find():
            logging.info(doc)

    except Exception as e:
        logging.error(f"🟥 Error reading data: {e}")
except Exception as e:
    logging.critical(f"🟥 Error inserting data: {type(e).__name__} - {e}")
finally:
    logging.info("👋 Ending data insertion script...")
    client.close()
    exit()
