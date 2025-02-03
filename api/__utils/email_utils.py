import imaplib
import email
from email.header import decode_header
from email.utils import parsedate_to_datetime
from datetime import datetime


def connect_to_email(username, app_password, imap_server):
    try:
        # Create IMAP4 connection with SSL
        imap = imaplib.IMAP4_SSL(imap_server)
        # Authenticate using the app password
        imap.login(username, app_password)
        return imap
    except imaplib.IMAP4.error as e:
        print(f"IMAP login failed: {e}")
        raise


def fetch_emails(imap, num_emails=10):
    # Select inbox
    status, messages = imap.select("INBOX")
    messages = int(messages[0])
    emails_data = []
    # Ensure num_emails does not exceed the number of messages
    num_emails = min(num_emails, messages)
    # Fetch latest emails
    for i in range(messages, messages - num_emails, -1):
        res, msg = imap.fetch(str(i), "(RFC822)")
        if res != "OK":
            print(f"Error fetching email {i}: {res}")
            continue
        for response in msg:
            if isinstance(response, tuple):
                email_msg = email.message_from_bytes(response[1])
                subject, _ = decode_header(email_msg["Subject"])[0]
                sender, _ = decode_header(email_msg["From"])[0]
                to = email_msg["To"]
                cc = email_msg["Cc"]
                bcc = email_msg["Bcc"]
                date = email_msg["Date"]
                body = ""
                attachments = []

                if email_msg.is_multipart():
                    for part in email_msg.walk():
                        content_disposition = str(part.get("Content-Disposition"))
                        if (
                            part.get_content_type() == "text/plain"
                            and "attachment" not in content_disposition
                        ):
                            body = part.get_payload(decode=True).decode()
                        elif "attachment" in content_disposition:
                            filename = part.get_filename()
                            if filename:
                                attachments.append(filename)
                else:
                    body = email_msg.get_payload(decode=True).decode()

                # Convert date to a datetime object
                received_date = parsedate_to_datetime(date)

                emails_data.append(
                    {
                        "subject": subject,
                        "sender": sender,
                        "to": to,
                        "cc": cc,
                        "bcc": bcc,
                        "body": body,
                        "received_date": received_date,
                        "attachments": attachments,
                    }
                )
    return emails_data
