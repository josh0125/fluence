# from sqlalchemy import create_engine, Column, String, DateTime, Text
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
# from sqlalchemy.pool import NullPool
# from sqlalchemy.dialects.postgresql import UUID
# import uuid
# from datetime import datetime
# import os
# from dotenv import load_dotenv

# # Load environment variables
# load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env.local'))

# Base = declarative_base()


# class Email(Base):
#     __tablename__ = "emails"

#     # Using UUID for primary key - better for distributed systems
#     id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
#     subject = Column(String, nullable=True)
#     sender = Column(String, nullable=True)
#     body = Column(Text, nullable=True)
#     received_date = Column(DateTime, nullable=False, default=datetime.utcnow)
#     created_at = Column(DateTime, nullable=False, default=datetime.utcnow)


# def get_db_connection():
#     # Get connection string from environment variables
#     db_url = os.getenv("SUPABASE_DB_URL")

#     if not db_url:
#         raise ValueError("Database URL not found in environment variables")

#     # Convert postgres:// to postgresql:// if necessary
#     if db_url.startswith("postgres://"):
#         db_url = db_url.replace("postgres://", "postgresql://", 1)

#     return db_url


# def save_to_database(emails_data):
#     try:
#         # Get connection string
#         db_connection_string = get_db_connection()

#         # Create engine with NullPool for serverless environment
#         engine = create_engine(
#             db_connection_string,
#             client_encoding="utf8",
#             poolclass=NullPool,
#             connect_args={
#                 "sslmode": "require",  # Required for Supabase
#                 "connect_timeout": 30,  # Timeout after 30 seconds
#             },
#         )

#         # Create tables if they don't exist
#         Base.metadata.create_all(engine)

#         # Create session
#         Session = sessionmaker(bind=engine)
#         session = Session()

#         try:
#             # Process emails in batches
#             batch_size = 100
#             for i in range(0, len(emails_data), batch_size):
#                 batch = emails_data[i : i + batch_size]

#                 # Create Email objects
#                 email_objects = [
#                     Email(
#                         subject=email_data.get("subject"),
#                         sender=email_data.get("sender"),
#                         body=email_data.get("body"),
#                         received_date=email_data.get("date"),
#                     )
#                     for email_data in batch
#                 ]

#                 # Add all emails in the batch
#                 session.bulk_save_objects(email_objects)
#                 session.commit()

#             return {"success": True, "message": f"Successfully saved {len(emails_data)} emails"}

#         except Exception as e:
#             session.rollback()
#             raise e
#         finally:
#             session.close()
#             engine.dispose()

#     except Exception as e:
#         return {"success": False, "error": str(e)}


# # # Serverless handler function
# # def handler(event, context):
# #     try:
# #         # Assuming emails_data is passed in the event
# #         emails_data = event.get("emails_data", [])
# #         # Save raw emails_data to a .txt file for testing

# #         if not emails_data:
# #             return {"statusCode": 400, "body": "No email data provided"}

# #         result = save_to_database(emails_data)

# #         if result["success"]:
# #             return {"statusCode": 200, "body": result["message"]}
# #         else:
# #             return {"statusCode": 500, "body": result["error"]}

# #     except Exception as e:
# #         return {"statusCode": 500, "body": f"Error processing request: {str(e)}"}

# # if __name__ == "__main__":
# #     handler({"emails_data": [{"subject": "Test", "sender": "", "body": "Test email"}]}, None)


from sqlalchemy import create_engine, Column, String, DateTime, Text, ARRAY
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime
import os
from dotenv import load_dotenv
import logging

# Path to the .env.local file
dotenv_path = os.path.join(os.path.dirname(__file__), "../../.env.local")
print(f"Loading environment variables from: {dotenv_path}")

# Load environment variables from .env.local
load_dotenv(dotenv_path=dotenv_path)

# Print loaded environment variables for debugging
print(f"SUPABASE_DB_URL: {os.getenv('SUPABASE_DB_URL')}")
print(f"NEXT_PUBLIC_SUPABASE_URL: {os.getenv('NEXT_PUBLIC_SUPABASE_URL')}")

Base = declarative_base()


class Email(Base):
    __tablename__ = "emails"

    # Using UUID for primary key - better for distributed systems
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    subject = Column(String, nullable=True)
    sender = Column(String, nullable=True)
    to = Column(String, nullable=True)
    cc = Column(String, nullable=True)
    bcc = Column(String, nullable=True)
    body = Column(Text, nullable=True)
    received_date = Column(DateTime, nullable=False, default=datetime.utcnow)
    attachments = Column(ARRAY(String), nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)


def get_db_connection():
    # Get connection string from environment variables
    db_url = os.getenv("SUPABASE_DB_URL")

    if not db_url:
        raise ValueError("Database URL not found in environment variables")

    # Convert postgres:// to postgresql:// if necessary
    if db_url.startswith("postgres://"):
        db_url = db_url.replace("postgres://", "postgresql://", 1)

    return db_url


def save_to_database(emails_data):
    try:
        # Get connection string
        db_connection_string = get_db_connection()

        # Create engine with NullPool for serverless environment
        engine = create_engine(
            db_connection_string,
            client_encoding="utf8",
            poolclass=NullPool,
            connect_args={
                "sslmode": "require",  # Required for Supabase
                "connect_timeout": 30,  # Timeout after 30 seconds
            },
        )

        # I will handle all table manipulation on the supabase end instead of programatically
        # # Create tables if they don't exist
        Base.metadata.create_all(engine)

        # Create session
        Session = sessionmaker(bind=engine)
        session = Session()

        try:
            # Process emails in batches
            batch_size = 100
            for i in range(0, len(emails_data), batch_size):
                batch = emails_data[i : i + batch_size]

                # Create Email objects
                email_objects = [
                    Email(
                        subject=email_data.get("subject"),
                        sender=email_data.get("sender"),
                        to=email_data.get("to"),
                        cc=email_data.get("cc"),
                        bcc=email_data.get("bcc"),
                        body=email_data.get("body"),
                        received_date=email_data.get("received_date"),
                        attachments=email_data.get("attachments"),
                    )
                    for email_data in batch
                ]

                # Add all emails in the batch
                session.bulk_save_objects(email_objects)
                session.commit()

            return {"success": True, "message": f"Successfully saved {len(emails_data)} emails"}

        except Exception as e:
            session.rollback()
            logging.error(f"Error saving to database: {e}")
            raise e
        finally:
            session.close()
            engine.dispose()

    except Exception as e:
        logging.error(f"Error in save_to_database: {e}")
        return {"success": False, "error": str(e)}
