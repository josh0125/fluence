import imaplib
import email
from email.header import decode_header


def connect_to_email(username, password, imap_server):
    # Create IMAP4 connection with SSL
    imap = imaplib.IMAP4_SSL(imap_server)
    # Authenticate
    imap.login(username, password)
    return imap


def fetch_emails(imap, num_emails=10):
    # Select inbox
    status, messages = imap.select("INBOX")
    messages = int(messages[0])

    emails_data = []
    # Fetch latest emails
    for i in range(messages, messages - num_emails, -1):
        # Fetch email message by ID
        res, msg = imap.fetch(str(i), "(RFC822)")
        print("XXXXXX res: ", res)  # to double check what res is. delete later
        for response in msg:
            if isinstance(response, tuple):
                email_msg = email.message_from_bytes(response[1])
                subject, _ = decode_header(email_msg["Subject"])[0]
                sender, _ = decode_header(email_msg["From"])[0]

                # Get email body
                body = ""
                if email_msg.is_multipart():
                    for part in email_msg.walk():
                        if part.get_content_type() == "text/plain":
                            try:
                                body = part.get_payload(decode=True).decode()
                                break
                            except Exception as e:
                                print("XXXXXX Exception part/email_message.walk loop: ", e)
                            
                else:
                    body = email_msg.get_payload(decode=True).decode()

                emails_data.append(
                    {"subject": subject, "sender": sender, "body": body, "date": email_msg["Date"]}
                )
            else:
                print("XXXXXX response: ", response)

    return emails_data

