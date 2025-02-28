FROM python:3.12.8

WORKDIR /transfer

# Copy the script
COPY scripts/insert_data.py insert_data.py

# Copy the data
COPY scripts/data/books.csv data/books.csv
COPY scripts/data/users.csv data/users.csv

RUN pip install pymongo polars

CMD ["python", "insert_data.py"]